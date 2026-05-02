package com.portfolio.converter;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.StreamSupport;

@Converter(autoApply = false)
public class TechStackJsonConverter implements AttributeConverter<List<String>, String> {

    private static final ObjectMapper MAPPER = new ObjectMapper();
    private static final TypeReference<List<String>> LIST_OF_STRING = new TypeReference<>() {};
    private static final String[] NESTED_ARRAY_KEYS = {"tech", "stack", "tags", "tools", "skills"};
    private static final Pattern JSON_STRING_TOKEN = Pattern.compile("\"((?:[^\"\\\\]|\\\\.)*)\"");


    @Override
    public String convertToDatabaseColumn(List<String> attribute) {
        if (attribute == null) {
            return null;
        }
        if (attribute.isEmpty()) {
            return "[]";
        }
        try {
            return MAPPER.writeValueAsString(attribute);
        } catch (JsonProcessingException e) {
            return "[]";
        }
    }

    @Override
    public List<String> convertToEntityAttribute(String dbData) {
        return parseTechList(dbData);
    }

    static List<String> parseTechList(String dbData) {
        if (dbData == null || dbData.isBlank()) {
            return Collections.emptyList();
        }
        String trimmed = dbData.trim();

        // Handles double-encoded payloads such as "\"[\\n \\\"Dart\\\", ...]\"".
        if (trimmed.startsWith("\"") && trimmed.endsWith("\"")) {
            try {
                String unwrapped = MAPPER.readValue(trimmed, String.class);
                if (unwrapped != null && !unwrapped.isBlank() && !unwrapped.equals(trimmed)) {
                    return parseTechList(unwrapped);
                }
            } catch (JsonProcessingException ignored) {
                // fall through
            }
        }

        try {
            return MAPPER.readValue(trimmed, LIST_OF_STRING);
        } catch (JsonProcessingException ignored) {
            // fall through
        }

        try {
            JsonNode root = MAPPER.readTree(trimmed);
            List<String> fromNode = fromJsonNode(root);
            if (!fromNode.isEmpty()) {
                return fromNode;
            }
        } catch (JsonProcessingException ignored) {
            // fall through
        }

        // PostgreSQL array literal for text[] columns, e.g. {Java,"Spring Boot"}
        if (trimmed.startsWith("{") && trimmed.endsWith("}")) {
            String inner = trimmed.substring(1, trimmed.length() - 1).trim();
            if (inner.isEmpty()) {
                return Collections.emptyList();
            }
            return splitPostgresArrayElements(inner);
        }

        // Pasted/neon typo—invalid JSON arrays missing commas, e.g. [\n "A"\n "B"\n].
        List<String> recoveredBracket = recoverQuotedStringsBetweenBrackets(trimmed);
        if (!recoveredBracket.isEmpty()) {
            return recoveredBracket;
        }

        return splitCommaSeparated(trimmed);
    }

    /** Extract "..." literals between the first '[' and last ']' (best-effort, non-JSON). */
    static List<String> recoverQuotedStringsBetweenBrackets(String s) {
        if (s == null || s.isBlank()) {
            return Collections.emptyList();
        }
        int lb = s.indexOf('[');
        int rb = s.lastIndexOf(']');
        if (lb < 0 || rb <= lb) {
            return Collections.emptyList();
        }
        String inner = s.substring(lb + 1, rb);
        List<String> out = new ArrayList<>();
        Matcher m = JSON_STRING_TOKEN.matcher(inner);
        while (m.find()) {
            String v = jsonUnescapeQuotedContent(m.group(1)).trim();
            if (!v.isEmpty()) {
                out.add(v);
            }
        }
        return out.isEmpty() ? Collections.emptyList() : List.copyOf(out);
    }

    private static String jsonUnescapeQuotedContent(String escaped) {
        if (escaped == null || escaped.isEmpty()) {
            return "";
        }
        return escaped.replace("\\\"", "\"").replace("\\\\", "\\");
    }

    private static List<String> splitPostgresArrayElements(String inner) {
        List<String> out = new ArrayList<>();
        StringBuilder cur = new StringBuilder();
        boolean inQuotes = false;
        for (int i = 0; i < inner.length(); i++) {
            char c = inner.charAt(i);
            if (c == '"') {
                inQuotes = !inQuotes;
                continue;
            }
            if (c == ',' && !inQuotes) {
                String part = cur.toString().trim();
                if (!part.isEmpty()) {
                    out.add(part);
                }
                cur.setLength(0);
            } else {
                cur.append(c);
            }
        }
        String last = cur.toString().trim();
        if (!last.isEmpty()) {
            out.add(last);
        }
        return out.isEmpty() ? Collections.emptyList() : List.copyOf(out);
    }

    private static List<String> fromJsonNode(JsonNode root) {
        if (root == null || root.isNull()) {
            return Collections.emptyList();
        }
        if (root.isArray()) {
            List<String> flattened = new ArrayList<>();
            StreamSupport.stream(root.spliterator(), false).forEach(node -> {
                if (node.isTextual()) {
                    String text = node.asText().trim();
                    if (!text.isEmpty()) {
                        List<String> nested = parseTechList(text);
                        if (nested.size() > 1) {
                            flattened.addAll(nested);
                        } else {
                            flattened.add(text);
                        }
                    }
                } else {
                    String value = node.asText().trim();
                    if (!value.isEmpty()) {
                        flattened.add(value);
                    }
                }
            });
            return flattened;
        }
        if (root.isObject()) {
            for (String key : NESTED_ARRAY_KEYS) {
                if (root.has(key) && root.get(key).isArray()) {
                    return fromJsonNode(root.get(key));
                }
            }
            var fields = root.fields();
            while (fields.hasNext()) {
                var e = fields.next();
                JsonNode value = e.getValue();
                if (value.isArray()) {
                    List<String> extracted = fromJsonNode(value);
                    if (!extracted.isEmpty()) {
                        return extracted;
                    }
                }
            }
        }
        if (root.isTextual()) {
            return parseTechList(root.asText());
        }
        return Collections.emptyList();
    }

    /** Last resort: plain comma-separated text (not valid JSON array). */
    private static List<String> splitCommaSeparated(String trimmed) {
        if (trimmed.startsWith("{") || trimmed.startsWith("[")) {
            return Collections.emptyList();
        }
        List<String> parts = new ArrayList<>();
        for (String raw : trimmed.split(",")) {
            String s = raw.trim();
            if (!s.isEmpty()) {
                parts.add(s);
            }
        }
        return parts.isEmpty() ? Collections.emptyList() : List.copyOf(parts);
    }
}

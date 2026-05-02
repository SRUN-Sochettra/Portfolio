package com.portfolio.converter;

import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

class TechStackJsonConverterTest {

    @Test
    void parseJsonArray() {
        assertEquals(
                List.of("Java", "Spring Boot"),
                TechStackJsonConverter.parseTechList("[\"Java\", \"Spring Boot\"]"));
    }

    @Test
    void parseNestedObject() {
        String json = "{\"stack\": [\"React\", \"Next.js\"]}";
        assertEquals(List.of("React", "Next.js"), TechStackJsonConverter.parseTechList(json));
    }

    @Test
    void parseFirstArrayInObject() {
        String json = "{\"frameworks\": [\"A\", \"B\"]}";
        assertEquals(List.of("A", "B"), TechStackJsonConverter.parseTechList(json));
    }

    @Test
    void parsePostgresArrayLiteral() {
        assertEquals(
                List.of("Java", "Spring Boot"),
                TechStackJsonConverter.parseTechList("{Java,\"Spring Boot\"}"));
    }

    @Test
    void parseCommaSeparatedPlainText() {
        assertEquals(
                List.of("Java", "Spring Boot"),
                TechStackJsonConverter.parseTechList("Java, Spring Boot"));
    }

    @Test
    void parseDoubleEncodedJsonArrayString() {
        String encoded = "\"[\\n \\\"Dart\\\",\\n \\\"Flutter\\\",\\n \\\"Provider\\\"]\"";
        assertEquals(
                List.of("Dart", "Flutter", "Provider"),
                TechStackJsonConverter.parseTechList(encoded));
    }

    @Test
    void parseMalformedArrayMissingCommas() {
        String pasted = "[\n \"Dart\"\n \"Flutter\"\n \"Provider\"\n]";
        assertEquals(
                List.of("Dart", "Flutter", "Provider"),
                TechStackJsonConverter.parseTechList(pasted));
    }

    @Test
    void recoverQuotedStringsBetweenBrackets_handlesExtraPrefix() {
        String s = "x [ \"A\" \"B\" ] tail";
        assertEquals(List.of("A", "B"), TechStackJsonConverter.recoverQuotedStringsBetweenBrackets(s));
    }
}

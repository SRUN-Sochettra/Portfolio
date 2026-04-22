package com.portfolio.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.portfolio.model.ContactMessage;
import com.portfolio.model.Profile;
import com.portfolio.model.Project;
import com.portfolio.model.Skill;
import com.portfolio.service.ContactMessageService;
import com.portfolio.service.PortfolioService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(ApiController.class)
class ApiControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private PortfolioService portfolioService;

    @MockBean
    private ContactMessageService contactMessageService;

    // --- GET /api/profile ---

    @Test
    void getProfile_found_returns200() throws Exception {
        Profile profile = new Profile();
        profile.setId(1);
        profile.setName("Sochettra");
        profile.setTagline("Developer");
        when(portfolioService.getProfile()).thenReturn(Optional.of(profile));

        mockMvc.perform(get("/api/profile"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Sochettra"))
                .andExpect(jsonPath("$.tagline").value("Developer"));
    }

    @Test
    void getProfile_notFound_returns404() throws Exception {
        when(portfolioService.getProfile()).thenReturn(Optional.empty());

        mockMvc.perform(get("/api/profile"))
                .andExpect(status().isNotFound());
    }

    // --- GET /api/projects ---

    @Test
    void getProjects_returns200WithList() throws Exception {
        Project project = new Project();
        project.setId(1);
        project.setTitle("Portfolio");
        when(portfolioService.getAllProjects()).thenReturn(List.of(project));

        mockMvc.perform(get("/api/projects"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].title").value("Portfolio"));
    }

    // --- GET /api/skills ---

    @Test
    void getSkills_returns200WithList() throws Exception {
        Skill skill = new Skill();
        skill.setId(1);
        skill.setName("Java");
        when(portfolioService.getAllSkills()).thenReturn(List.of(skill));

        mockMvc.perform(get("/api/skills"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].name").value("Java"));
    }

    // --- POST /api/contact_messages (valid) ---

    @Test
    void createContactMessage_valid_returns201() throws Exception {
        ContactMessage input = new ContactMessage();
        input.setName("John Doe");
        input.setEmail("john@example.com");
        input.setMessage("Hello, this is a valid test message.");

        ContactMessage saved = new ContactMessage();
        saved.setId(1);
        saved.setName("John Doe");
        saved.setEmail("john@example.com");
        saved.setMessage("Hello, this is a valid test message.");

        when(contactMessageService.submitMessage(any(ContactMessage.class))).thenReturn(saved);

        mockMvc.perform(post("/api/contact_messages")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(input)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.name").value("John Doe"));
    }

    // --- POST /api/contact_messages (validation failures) ---

    @Test
    void createContactMessage_blankName_returns400() throws Exception {
        ContactMessage input = new ContactMessage();
        input.setName("");
        input.setEmail("john@example.com");
        input.setMessage("Hello, this is a valid test message.");

        mockMvc.perform(post("/api/contact_messages")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(input)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.errors.name").exists());
    }

    @Test
    void createContactMessage_invalidEmail_returns400() throws Exception {
        ContactMessage input = new ContactMessage();
        input.setName("John Doe");
        input.setEmail("not-an-email");
        input.setMessage("Hello, this is a valid test message.");

        mockMvc.perform(post("/api/contact_messages")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(input)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.errors.email").exists());
    }

    @Test
    void createContactMessage_shortMessage_returns400() throws Exception {
        ContactMessage input = new ContactMessage();
        input.setName("John Doe");
        input.setEmail("john@example.com");
        input.setMessage("Short");

        mockMvc.perform(post("/api/contact_messages")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(input)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.errors.message").exists());
    }
}

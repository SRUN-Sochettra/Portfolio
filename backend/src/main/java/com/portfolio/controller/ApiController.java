package com.portfolio.controller;

import com.portfolio.model.ContactMessage;
import com.portfolio.model.Profile;
import com.portfolio.model.Project;
import com.portfolio.model.Skill;
import com.portfolio.repository.ContactMessageRepository;
import com.portfolio.repository.ProfileRepository;
import com.portfolio.repository.ProjectRepository;
import com.portfolio.repository.SkillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.ZonedDateTime;
import java.util.List;

@RestController
@RequestMapping("/api")
public class ApiController {

    @Autowired
    private ProfileRepository profileRepository;

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private SkillRepository skillRepository;

    @Autowired
    private ContactMessageRepository contactMessageRepository;

    @GetMapping("/profile")
    public ResponseEntity<Profile> getProfile() {
        return profileRepository.findById(1)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/projects")
    public List<Project> getProjects() {
        return projectRepository.findAllByOrderBySortAscIdAsc();
    }

    @GetMapping("/skills")
    public List<Skill> getSkills() {
        return skillRepository.findAllByOrderBySortAscIdAsc();
    }

    @PostMapping("/contact_messages")
    public ResponseEntity<?> createContactMessage(@RequestBody ContactMessage message) {
        if (message.getName() == null || message.getName().trim().length() < 2) {
            return ResponseEntity.badRequest().body("{\"error\": \"Name is required.\"}");
        }
        if (message.getEmail() == null || !message.getEmail().contains("@")) {
            return ResponseEntity.badRequest().body("{\"error\": \"Valid email is required.\"}");
        }
        if (message.getMessage() == null || message.getMessage().trim().length() < 10) {
            return ResponseEntity.badRequest().body("{\"error\": \"Message is required (min 10 chars).\"}");
        }
        message.setCreatedAt(ZonedDateTime.now());
        ContactMessage saved = contactMessageRepository.save(message);
        return ResponseEntity.status(201).body(saved);
    }
}

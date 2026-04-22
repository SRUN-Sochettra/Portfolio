package com.portfolio.controller;

import com.portfolio.model.ContactMessage;
import com.portfolio.model.Profile;
import com.portfolio.model.Project;
import com.portfolio.model.Skill;
import com.portfolio.service.ContactMessageService;
import com.portfolio.service.PortfolioService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@Tag(name = "Portfolio API", description = "Endpoints for the portfolio website")
public class ApiController {

    private final PortfolioService portfolioService;
    private final ContactMessageService contactMessageService;

    public ApiController(PortfolioService portfolioService,
                         ContactMessageService contactMessageService) {
        this.portfolioService = portfolioService;
        this.contactMessageService = contactMessageService;
    }

    @GetMapping("/profile")
    @Operation(summary = "Get profile", description = "Returns the portfolio owner's profile information")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Profile found"),
            @ApiResponse(responseCode = "404", description = "Profile not found")
    })
    public ResponseEntity<Profile> getProfile() {
        return portfolioService.getProfile()
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/projects")
    @Operation(summary = "Get all projects", description = "Returns all portfolio projects sorted by display order")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Projects retrieved successfully")
    })
    public List<Project> getProjects() {
        return portfolioService.getAllProjects();
    }

    @GetMapping("/skills")
    @Operation(summary = "Get all skills", description = "Returns all portfolio skills sorted by display order")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Skills retrieved successfully")
    })
    public List<Skill> getSkills() {
        return portfolioService.getAllSkills();
    }

    @PostMapping("/contact_messages")
    @Operation(summary = "Submit a contact message", description = "Creates a new contact message from a website visitor")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Message created successfully"),
            @ApiResponse(responseCode = "400", description = "Validation failed")
    })
    public ResponseEntity<ContactMessage> createContactMessage(@Valid @RequestBody ContactMessage message) {
        ContactMessage saved = contactMessageService.submitMessage(message);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }
}

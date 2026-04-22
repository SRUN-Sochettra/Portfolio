package com.portfolio.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;
import java.time.ZonedDateTime;

@Entity
@Table(name = "portfolio_contact_message")
@Data
public class ContactMessage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    @NotBlank(message = "Name is required")
    @Size(min = 2, message = "Name must be at least 2 characters")
    @Column(columnDefinition = "TEXT")
    private String name;
    
    @NotBlank(message = "Email is required")
    @Email(message = "Must be a valid email address")
    @Column(columnDefinition = "TEXT")
    private String email;
    
    @NotBlank(message = "Message is required")
    @Size(min = 10, message = "Message must be at least 10 characters")
    @Column(columnDefinition = "TEXT")
    private String message;
    
    @Column(name = "created_at")
    private ZonedDateTime createdAt;
}
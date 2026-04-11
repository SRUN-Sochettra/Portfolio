package com.portfolio.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.ZonedDateTime;

@Entity
@Table(name = "portfolio_profile")
@Data
public class Profile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    @Column(columnDefinition = "TEXT")
    private String name;
    
    @Column(columnDefinition = "TEXT")
    private String tagline;
    
    @Column(columnDefinition = "TEXT")
    private String github;
    
    @Column(columnDefinition = "TEXT")
    private String about;
    
    @Column(name = "created_at")
    private ZonedDateTime createdAt;
}

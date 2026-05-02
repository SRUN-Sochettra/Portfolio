package com.portfolio.model;

import com.portfolio.converter.TechStackJsonConverter;
import jakarta.persistence.*;
import lombok.Data;

import java.time.ZonedDateTime;
import java.util.List;

@Entity
@Table(name = "portfolio_project")
@Data
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    @Column(columnDefinition = "TEXT")
    private String title;
    
    @Column(columnDefinition = "TEXT")
    private String subtitle;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    @Convert(converter = TechStackJsonConverter.class)
    @Column(name = "tech", columnDefinition = "jsonb")
    private List<String> tech;
    
    private Boolean featured;
    
    private Integer sort;
    
    @Column(name = "created_at")
    private ZonedDateTime createdAt;
}

package com.portfolio.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.ZonedDateTime;

@Entity
@Table(name = "portfolio_skill")
@Data
public class Skill {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    @Column(columnDefinition = "TEXT")
    private String category;
    
    @Column(columnDefinition = "TEXT")
    private String name;
    
    private Integer level;
    
    private Boolean highlight;
    
    @Column(columnDefinition = "TEXT")
    private String note;
    
    private Integer sort;
    
    @Column(name = "created_at")
    private ZonedDateTime createdAt;
}

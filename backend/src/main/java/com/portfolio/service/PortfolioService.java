package com.portfolio.service;

import com.portfolio.model.Profile;
import com.portfolio.model.Project;
import com.portfolio.model.Skill;
import com.portfolio.repository.ProfileRepository;
import com.portfolio.repository.ProjectRepository;
import com.portfolio.repository.SkillRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PortfolioService {

    private final ProfileRepository profileRepository;
    private final ProjectRepository projectRepository;
    private final SkillRepository skillRepository;

    public PortfolioService(ProfileRepository profileRepository,
                            ProjectRepository projectRepository,
                            SkillRepository skillRepository) {
        this.profileRepository = profileRepository;
        this.projectRepository = projectRepository;
        this.skillRepository = skillRepository;
    }

    public Optional<Profile> getProfile() {
        return profileRepository.findById(1);
    }

    public List<Project> getAllProjects() {
        return projectRepository.findAllByOrderBySortAscIdAsc();
    }

    public List<Skill> getAllSkills() {
        return skillRepository.findAllByOrderBySortAscIdAsc();
    }
}

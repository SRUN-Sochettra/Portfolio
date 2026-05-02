package com.portfolio.service;

import com.portfolio.model.Profile;
import com.portfolio.model.Project;
import com.portfolio.model.Skill;
import com.portfolio.repository.ProfileRepository;
import com.portfolio.repository.ProjectRepository;
import com.portfolio.repository.SkillRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class PortfolioService {

    /** Shown only when DB `tech` is empty (bad paste / wiped row). Prefer fixing data in Postgres. */
    private static final Map<Integer, List<String>> FALLBACK_PROJECT_TECH = Map.of(
            2, List.of("Dart", "Flutter", "Provider", "GoRouter", "Jikan API")
    );

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

    @Transactional(readOnly = true)
    public Optional<Profile> getProfile() {
        return profileRepository.findById(1);
    }

    @Transactional(readOnly = true)
    public List<Project> getAllProjects() {
        List<Project> projects = projectRepository.findAllByOrderBySortAscIdAsc();
        for (Project p : projects) {
            List<String> tech = p.getTech();
            if (tech != null && !tech.isEmpty()) {
                continue;
            }
            List<String> fallback = FALLBACK_PROJECT_TECH.get(p.getId());
            if (fallback != null) {
                p.setTech(new ArrayList<>(fallback));
            }
        }
        return projects;
    }

    @Transactional(readOnly = true)
    public List<Skill> getAllSkills() {
        return skillRepository.findAllByOrderBySortAscIdAsc();
    }
}

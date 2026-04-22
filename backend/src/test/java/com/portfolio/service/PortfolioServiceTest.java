package com.portfolio.service;

import com.portfolio.model.Profile;
import com.portfolio.model.Project;
import com.portfolio.model.Skill;
import com.portfolio.repository.ProfileRepository;
import com.portfolio.repository.ProjectRepository;
import com.portfolio.repository.SkillRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class PortfolioServiceTest {

    @Mock
    private ProfileRepository profileRepository;

    @Mock
    private ProjectRepository projectRepository;

    @Mock
    private SkillRepository skillRepository;

    @InjectMocks
    private PortfolioService portfolioService;

    @Test
    void getProfile_found_returnsProfile() {
        Profile profile = new Profile();
        profile.setId(1);
        profile.setName("Sochettra");
        when(profileRepository.findById(1)).thenReturn(Optional.of(profile));

        Optional<Profile> result = portfolioService.getProfile();

        assertThat(result).isPresent();
        assertThat(result.get().getName()).isEqualTo("Sochettra");
    }

    @Test
    void getProfile_notFound_returnsEmpty() {
        when(profileRepository.findById(1)).thenReturn(Optional.empty());

        Optional<Profile> result = portfolioService.getProfile();

        assertThat(result).isEmpty();
    }

    @Test
    void getAllProjects_returnsSortedList() {
        Project p1 = new Project();
        p1.setTitle("Project A");
        Project p2 = new Project();
        p2.setTitle("Project B");
        when(projectRepository.findAllByOrderBySortAscIdAsc()).thenReturn(List.of(p1, p2));

        List<Project> result = portfolioService.getAllProjects();

        assertThat(result).hasSize(2);
        assertThat(result.get(0).getTitle()).isEqualTo("Project A");
    }

    @Test
    void getAllSkills_returnsSortedList() {
        Skill s1 = new Skill();
        s1.setName("Java");
        when(skillRepository.findAllByOrderBySortAscIdAsc()).thenReturn(List.of(s1));

        List<Skill> result = portfolioService.getAllSkills();

        assertThat(result).hasSize(1);
        assertThat(result.get(0).getName()).isEqualTo("Java");
    }
}

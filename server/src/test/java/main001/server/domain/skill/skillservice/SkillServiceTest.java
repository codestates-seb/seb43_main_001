package main001.server.domain.skill.skillservice;

import main001.server.domain.skill.dto.SkillDto;
import main001.server.domain.skill.entity.Skill;
import main001.server.domain.skill.mapper.SkillMapper;
import main001.server.domain.skill.repository.SkillRepository;
import main001.server.domain.skill.service.SkillService;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;

import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@MockBean(JpaMetamodelMappingContext.class)
public class SkillServiceTest {

    @InjectMocks
    private SkillService service;

    @Mock
    private SkillRepository skillRepository;

    @Mock
    private SkillMapper mapper;

    private Mock mock;

    private final String skillName = "Java";

    private Skill skill() {
        return Skill.builder()
                .skillName(skillName)
                .build();
    }
    private Skill savedSkill() {
        return Skill.builder()
                .skillId(1L)
                .skillName(skillName)
                .build();
    }
    private SkillDto.Post post() {
        return SkillDto.Post.builder()
                .skillName(skillName)
                .build();
    }
    private SkillDto.Post post2() {
        return SkillDto.Post.builder()
                .skillName("JAVA")
                .build();
    }
    private SkillDto.Post post3() {
        return SkillDto.Post.builder()
                .skillName("ruby on   rails")
                .build();
    }


    private SkillDto.Response response() {
        return SkillDto.Response.builder()
                .skillId(1L)
                .skillName(skillName)
                .build();
    }

    @Test
    @DisplayName("새로운 스킬 저장")
    void createNewSkill() {
        // given
        doReturn(Optional.empty()).when(skillRepository).findBySkillName(skillName);
        doReturn(skill()).when(mapper).postToEntity(any(SkillDto.Post.class));
        doReturn(savedSkill()).when(skillRepository).save(any(Skill.class));
        doReturn(response()).when(mapper).entityToResponse(any(Skill.class));

        // when
        SkillDto.Response response = service.createSkill(post());

        // then

        assertThat(response.getSkillId()).isNotNull();
        assertThat(response.getSkillName()).isEqualToIgnoringCase("Java");

        //verify
        verify(skillRepository, times(1)).save(any(Skill.class));
        verify(mapper,times(1)).postToEntity(any(SkillDto.Post.class));

    }

    @Test
    @DisplayName("스킬 이름 파스칼 케이스로 변경")
    void modifyPascalCaseTest() {
        //given
        doReturn(Optional.empty()).when(skillRepository).findBySkillName("Java");
        doReturn(skill()).when(mapper).postToEntity(any(SkillDto.Post.class));
        doReturn(savedSkill()).when(skillRepository).save(any(Skill.class));
        doReturn(response()).when(mapper).entityToResponse(any(Skill.class));

        //when
        SkillDto.Response response = service.createSkill(post2());

        //then
        assertThat(response.getSkillName()).isEqualTo(skillName);
    }


    @Test
    @DisplayName("스킬 검색")
    void findSkills() {
        
    }


}
package main001.server.domain.skill.skillrepository;

import main001.server.domain.skill.entity.Skill;
import main001.server.domain.skill.repository.SkillRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.Optional;

import static org.assertj.core.api.Assertions.*;

@DataJpaTest
public class SkillRepositoryTest {
    @Autowired
    private SkillRepository skillRepository;



    @Test
    @DisplayName("임의의 스킬 태그 DB에 저장")
    void saveSkillTag() {
        //given
        Skill skill = new Skill();

        //when
        Skill savedSkill = skillRepository.save(skill);

        //then
        assertThat(savedSkill).isNotNull();
    }

    @Test
    @DisplayName("스킬 태그 아이디로 검색")
    void findSkillById() {
        //given
        Skill skill = new Skill();
        Skill save = skillRepository.save(skill);

        //when
        Long skillId = save.getSkillId();
        Optional<Skill> byId = skillRepository.findById(skillId);
        Skill skill1 = byId.orElseThrow(() -> new RuntimeException("에러 발생"));
        //then
        assertThat(byId).isNotEqualTo(Optional.empty());
        assertThat(skill1).isEqualTo(skill);
    }

    @Test
    @DisplayName("스킬 이름으로 검색")
    void findSkillByName() {
        // given
        Skill skill = Skill.builder()
                .skillName("Java")
                .build();
        Skill save = skillRepository.save(skill);

        //when
        String skillName = save.getSkillName();
        Optional<Skill> bySkillName = skillRepository.findBySkillName(skillName);
        Skill skill1 = bySkillName.orElseThrow();

        //then
        assertThat(bySkillName).isNotEqualTo(Optional.empty());
        assertThat(skill1).isEqualTo(skill);
    }

    @Test
    @DisplayName("스킬 아이디로 삭제")
    void deleteSkillById() {
        //given
        Skill skill = Skill.builder()
                .skillName("Java")
                .build();
        Skill save = skillRepository.save(skill);

        //when
        Long skillId = save.getSkillId();
        skillRepository.deleteById(skillId);
        Optional<Skill> byId = skillRepository.findById(skillId);

        //then
        assertThat(byId).isEqualTo(Optional.empty());
    }
}

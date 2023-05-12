package main001.server.domain.skill.skillrepository;

import main001.server.domain.skill.entity.Skill;
import main001.server.domain.skill.repository.SkillRepository;
import org.hibernate.validator.constraints.UniqueElements;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.data.domain.Sort;

import java.util.List;

import static org.assertj.core.api.Assertions.*;

@DataJpaTest
public class SkillRepositoryTest {

    @Autowired
    SkillRepository skillRepository;

    @Test
    void 스킬_리스트_조회() {
        // given
        Skill skill1 = new Skill("Java".toUpperCase());
        Skill skill2 = new Skill("Spring".toUpperCase());
        Skill skill3 = new Skill("Javascript".toUpperCase());
        Skill skill4 = new Skill("Spring Boot".toUpperCase());

        skillRepository.save(skill1);
        skillRepository.save(skill2);
        skillRepository.save(skill3);
        skillRepository.save(skill4);

        Sort sort = Sort.by("name").ascending();

        // when
        @UniqueElements()
        List<String> j = skillRepository.findSkillsByName("JAVA", sort);
        List<String> spring = skillRepository.findSkillsByName("SPRING", sort);

        // then
        assertThat(j.get(0)).isEqualTo("JAVA");
        assertThat(j.get(1)).isEqualTo("JAVASCRIPT");
        assertThat(spring.get(0)).isEqualTo("SPRING");
        assertThat(spring.get(1)).isEqualTo("SPRING BOOT");

    }
}

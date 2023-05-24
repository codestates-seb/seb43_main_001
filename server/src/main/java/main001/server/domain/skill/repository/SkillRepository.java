package main001.server.domain.skill.repository;

import main001.server.domain.skill.entity.Skill;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SkillRepository extends JpaRepository<Skill,Long> {

    Optional<Skill> findBySkillId(String skillId);
}

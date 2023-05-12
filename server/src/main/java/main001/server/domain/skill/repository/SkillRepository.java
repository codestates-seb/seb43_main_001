package main001.server.domain.skill.repository;

import main001.server.domain.skill.entity.Skill;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface SkillRepository extends JpaRepository<Skill,Long> {

    @Query("select s.name from Skill s where s.name like :name%")
    List<String> findSkillsByName(String name, Sort sort);

    Optional<Skill> findByName(String name);
}

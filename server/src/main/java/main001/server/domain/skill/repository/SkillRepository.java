package main001.server.domain.skill.repository;

import main001.server.domain.skill.entity.Skill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface SkillRepository extends JpaRepository<Skill,Long> {

    @Query("SELECT s.name FROM Skill s WHERE LOWER(s.name) LIKE LOWER(:name)||'%' ORDER BY s.name ASC")
    List<String> findSkillsByName(String name);

    Optional<Skill> findSkillByNameIgnoreCase(String name);
}

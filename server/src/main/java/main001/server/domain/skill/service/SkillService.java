package main001.server.domain.skill.service;

import lombok.RequiredArgsConstructor;
import main001.server.domain.skill.entity.Skill;
import main001.server.domain.skill.repository.SkillRepository;
import main001.server.exception.BusinessLogicException;
import main001.server.exception.ExceptionCode;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class SkillService {

    private final SkillRepository skillRepository;

    public Skill findById(String skillId) {
        Optional<Skill> bySkillId = skillRepository.findSkillBySkillId(skillId);

        return bySkillId.orElseThrow(
                () -> new BusinessLogicException(ExceptionCode.SKILL_NOT_FOUND)
        );
    }
}

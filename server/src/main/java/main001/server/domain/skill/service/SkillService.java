package main001.server.domain.skill.service;

import lombok.RequiredArgsConstructor;
import main001.server.domain.skill.entity.PortfolioSkill;
import main001.server.domain.skill.entity.Skill;
import main001.server.domain.skill.repository.SkillRepository;
import main001.server.exception.BusinessLogicException;
import main001.server.exception.ExceptionCode;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class SkillService {

    private final SkillRepository skillRepository;

    public Skill findById(String skillId) {
        Optional<Skill> bySkillId = skillRepository.findBySkillId(skillId);

        return bySkillId.orElseThrow(
                () -> new BusinessLogicException(ExceptionCode.SKILL_NOT_FOUND)
        );
    }

    public List<PortfolioSkill> createPortfolioSkillList(List<String> skills) {
        List<PortfolioSkill> result = new ArrayList<>(skills.size());

        for(String skill : skills) {
            Skill findSkill= skillRepository.findBySkillId(skill.replace(" ", "").toUpperCase())
                    .orElseThrow(() -> new BusinessLogicException(ExceptionCode.SKILL_NOT_FOUND));
            PortfolioSkill portfolioSkill = new PortfolioSkill();
            portfolioSkill.setSkill(findSkill);

            result.add(portfolioSkill);
        }

        return result;
    }

    public String findSkill(String skill) {
        return findById(
                skill.replace(" ","").toUpperCase())
                .getSkillId();
    }

    public List<String> findAllSkills() {
        List<Skill> skills = skillRepository.findAll();
        List<String> response = convertSkillToString(skills);
        return response;
    }

    private List<String> convertSkillToString(List<Skill> skills) {
        List<String> result = skills.stream()
                .map(skill -> skill.getName())
                .collect(Collectors.toList());

        return result;
    }
}

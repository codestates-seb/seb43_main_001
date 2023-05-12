package main001.server.domain.skill.service;

import lombok.RequiredArgsConstructor;
import main001.server.domain.skill.entity.Skill;
import main001.server.domain.skill.repository.SkillRepository;
import main001.server.domain.skill.response.SkillResponseList;
import main001.server.exception.BusinessLogicException;
import main001.server.exception.ExceptionCode;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class SkillService {

    private final SkillRepository skillRepository;

    public SkillResponseList findSkillsByName(String name) {
        Sort sort = Sort.by("name").ascending();

        name = name.toUpperCase();

        List<String> skillNames = skillRepository.findSkillsByName(name, sort);

        if(skillNames.size()==0) {
            throw new BusinessLogicException(ExceptionCode.SKILL_NOT_FOUND);
        }

        return new SkillResponseList(skillNames);
    }

    public Skill findByName(String name) {
        Optional<Skill> byName = skillRepository.findByName(name);

        return byName.orElseThrow(
                () -> new BusinessLogicException(ExceptionCode.SKILL_NOT_FOUND)
        );
    }
}

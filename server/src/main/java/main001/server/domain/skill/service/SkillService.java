package main001.server.domain.skill.service;

import lombok.RequiredArgsConstructor;
import main001.server.domain.skill.dto.SkillDto;
import main001.server.domain.skill.entity.Skill;
import main001.server.domain.skill.mapper.SkillMapper;
import main001.server.domain.skill.repository.SkillRepository;
import main001.server.domain.user.enums.Grade;
import main001.server.exception.BusinessLogicException;
import main001.server.exception.ExceptionCode;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SkillService {

    private final SkillRepository skillRepository;
    private final SkillMapper skillMapper;


    public SkillDto.Response createSkill(SkillDto.Post post) {
        Skill skill = skillMapper.postToEntity(post);
        Optional<Skill> bySkillName = skillRepository.findBySkillName(skill.getSkillName());
        if(bySkillName.isPresent()) {
            throw new BusinessLogicException(ExceptionCode.SKILL_EXISTS);
        }


        String newSkillName = modifyToPascalCase(skill.getSkillName());
        skill.setSkillName(newSkillName);

        Skill savedSkill = skillRepository.save(skill);
        return skillMapper.entityToResponse(savedSkill);
    }



    private String modifyToPascalCase(String str) {
        String[] arr = str.split(" ");
        StringBuffer sb = new StringBuffer();
        for(int i = 0; i<arr.length; i++) {
            String target = arr[i];
            if(target.equals("")) {
                continue;
            }
            sb.append(target.substring(0,1).toUpperCase());
            if(target.length()>1) {
                sb.append(target.substring(1));
            }
            arr[i] = sb.toString();
        }

        return String.join(" ", arr);
    }
}

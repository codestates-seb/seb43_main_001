package main001.server.domain.skill.mapper;

import main001.server.domain.skill.dto.SkillDto;
import main001.server.domain.skill.entity.Skill;
import org.springframework.stereotype.Component;

@Component
public class SkillMapper {

    public Skill postToEntity(SkillDto.Post post) {
        if(post == null) {
            return null;
        }

        return Skill.builder().skillName(post.getSkillName()).build();
    }

    public SkillDto.Response entityToResponse(Skill skill) {
        if(skill == null) {
            return null;
        }

        return SkillDto.Response.builder()
                .skillId(skill.getSkillId())
                .skillName(skill.getSkillName())
                .build();
    }
}

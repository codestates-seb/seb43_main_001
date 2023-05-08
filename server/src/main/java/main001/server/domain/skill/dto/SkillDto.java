package main001.server.domain.skill.dto;

import lombok.Builder;
import lombok.Getter;

public class SkillDto {

    @Builder
    @Getter
    public static class Post {

        private String skillName;
    }

    @Builder
    @Getter
    public static class Response {

        private Long skillId;
        private String skillName;
    }
}

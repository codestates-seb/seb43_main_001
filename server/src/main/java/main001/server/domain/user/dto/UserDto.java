package main001.server.domain.user.dto;

import lombok.*;
import main001.server.domain.user.enums.Grade;
import main001.server.domain.user.enums.JobStatus;
import main001.server.domain.user.enums.UserStatus;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import java.time.LocalDate;
import java.time.LocalDateTime;

public class UserDto {

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Post {
        @Email
        @NotBlank(message = "이메일을 입력해주세요.")
        private String email;
        @NotBlank(message = "이름을 입력해주세요.")
        private String name;
        private String profileImg;
        private String gitLink;
        private String blogLink;
//        private Skill skill;
        private JobStatus jobStatus;
        private String about;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Patch {
        private long userId;
        private String name;
        private String profileImg;
        private String gitLink;
        private String blogLink;
//        private Skill skill;
        private UserStatus userStatus;
        private JobStatus jobStatus;
        private String about;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class Response {
        private long userId;
        private String email;
        private String name;
        private String profileImg;
        private String gitLink;
        private String blogLink;
//        private Skill skill;
        private Grade grade;
        private UserStatus userStatus;
        private JobStatus jobStatus;
        private String about;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class UserPortfolioResponse {
        private long portfolioId;
        private String title;
        private String gitLink;
        private String distributionLink;
        private String description;
        private String content;
        private int views;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;
    }
}

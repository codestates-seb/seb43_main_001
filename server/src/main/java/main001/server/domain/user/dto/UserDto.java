package main001.server.domain.user.dto;

import lombok.*;
import main001.server.domain.user.enums.Grade;
import main001.server.domain.user.enums.JobStatus;
import main001.server.domain.user.enums.UserStatus;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;
import java.util.List;

public class UserDto {

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Post {
        @Email
        @NotBlank(message = "이메일을 입력해주세요.")
        private String email;
//        private String password;
        @NotBlank(message = "이름을 입력해주세요.")
        private String name;
        private String profileImg;
        private String gitLink;
        private String blogLink;
//        private List<String> skills;
        private JobStatus jobStatus;
        private String about;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Patch {
        private long userId;

        @NotBlank(message = "이름을 입력해주세요.")
        private String name;
        private String profileImg;
        private String gitLink;
        private String blogLink;
//        private List<String> skills;
        private JobStatus jobStatus;
        private String about;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class PatchEmail {
        private long userId;
        @Email(message = "올바른 이메일 양식이 아닙니다.")
        private String email;
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
        private UserStatus userStatus;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;
        private boolean isAuth;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class UserProfileResponse {
        private long userId;
        private String email;
        private String name;
        private String profileImg;
        private String gitLink;
        private String blogLink;
//        private List<String> skills;
        private Grade grade;
        private JobStatus jobStatus;
        private String about;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;
        private boolean isAuth;
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
        private boolean isAuth;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;
    }
}

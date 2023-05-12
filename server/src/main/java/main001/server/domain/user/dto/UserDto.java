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
        @NotBlank(message = "이름을 입력해주세요.")
        private String name;
        private String profileImg;
        private String gitLink;
        private String blogLink;
        private String skills;
        private JobStatus jobStatus;
        private String about;

        public Post(String email, String name, String profileImg, String gitLink, String blogLink, JobStatus jobStatus, String about) {
            this.email = email;
            this.name = name;
            this.profileImg = profileImg;
            this.gitLink = gitLink;
            this.blogLink = blogLink;
            this.jobStatus = jobStatus;
            this.about = about;
        }
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
//        private String skills;
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
        private List<String> skills;
        private Grade grade;
        private UserStatus userStatus;
        private JobStatus jobStatus;
        private String about;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;

        public Response(long userId, String email, String name, String profileImg, String gitLink, String blogLink, Grade grade, UserStatus userStatus, JobStatus jobStatus, String about, LocalDateTime createdAt, LocalDateTime updatedAt) {
            this.userId = userId;
            this.email = email;
            this.name = name;
            this.profileImg = profileImg;
            this.gitLink = gitLink;
            this.blogLink = blogLink;
            this.grade = grade;
            this.userStatus = userStatus;
            this.jobStatus = jobStatus;
            this.about = about;
            this.createdAt = createdAt;
            this.updatedAt = updatedAt;
        }
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class UserPortfolioResponse {
        private long id;
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

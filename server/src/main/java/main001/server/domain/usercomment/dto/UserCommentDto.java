package main001.server.domain.usercomment.dto;

import lombok.*;
import main001.server.domain.usercomment.entity.UserCommentStatus;
import main001.server.response.PageInfo;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import java.time.LocalDateTime;
import java.util.List;

public class UserCommentDto {

    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Post {

        @NotNull
        @Positive
        private Long userId;

        @NotNull
        @Positive
        private Long writerId;

        @NotBlank
        private String content;

        private UserCommentStatus userCommentStatus;
    }

    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Patch {
        private Long userCommentId;

        @NotBlank
        private String content;

        @NotNull
        @Positive
        private Long userId;

        @NotNull
        @Positive
        private Long writerId;
    }

    @Getter
    @AllArgsConstructor
    @Setter
    @Builder
    public static class Response {
        private Long userCommentId;
        private Long userId;
        private Long writerId;
        private String writerName;
        private String writerProfileImg;
        private String content;
        private UserCommentStatus status;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;
        private boolean isAuth;
        private boolean deletable;
    }

    @Getter
    @AllArgsConstructor
    public static class ResponseList{
        private List<Response> data;
        private PageInfo pageInfo;
    }
}

package main001.server.domain.usercomment.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import main001.server.response.PageInfo;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import java.time.LocalDateTime;

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
    public static class Response {
        private Long userCommentId;
        private Long userId;
        private Long writerId;
        private String writerName;
        private String writerProfileImg;
        private String content;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;
        private boolean isAuth;
    }
    @Getter
    @AllArgsConstructor
    public static class ResponseList<T>{
        private T data;
        private PageInfo pageInfo;
    }
}

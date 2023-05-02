package main001.server.domain.usercomment.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import java.time.LocalDateTime;

public class UserCommentDto {

    @Getter
    @AllArgsConstructor
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

    @AllArgsConstructor
    public static class Response {
        private Long userCommentId;
        private String content;
        private Long userId;
        private String userName;
        private Long writerId;
        private String writerName;
        private LocalDateTime createdTime;
        private LocalDateTime modifiedTime;
    }
    @AllArgsConstructor
    public static class ResponseList<T>{
        private T data;
        private int page;
        private int size;
        private int totalElements;
        private int totalPages;
    }
}

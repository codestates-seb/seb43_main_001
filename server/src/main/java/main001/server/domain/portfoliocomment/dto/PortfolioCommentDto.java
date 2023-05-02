package main001.server.domain.portfoliocomment.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import java.time.LocalDateTime;

public class PortfolioCommentDto {

    @Getter
    @AllArgsConstructor
    public static class Post {

        @NotNull
        @Positive
        private Long userId;

        @NotNull
        @Positive
        private Long portfolioId;

        @NotBlank
        private String content;
    }

    @Getter
    @AllArgsConstructor
    public static class Patch {

        @Setter
        private Long portfolioCommentId;

        @NotNull
        @Positive
        private Long userId;

        @NotNull
        @Positive
        private Long portfolioId;

        @NotBlank
        private String content;

    }

    @AllArgsConstructor
    public static class Response {
        private Long portfolioCommentId;
        private String content;
        private Long userId;
        private String userName;
        private Long portfolioId;
        private String portfolioTitle;
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

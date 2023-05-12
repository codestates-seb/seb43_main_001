package main001.server.domain.portfoliocomment.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import main001.server.response.PageInfo;

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

    @Getter
    @AllArgsConstructor
    public static class Response {
        private Long portfolioCommentId;
        private String content;
        private Long userId;
        private String userName;
        private String userProfileImg;
        private Long portfolioId;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;
    }

    @Getter
    @AllArgsConstructor
    public static class ResponseList<T>{
        private T data;
        private PageInfo pageInfo;
    }
}

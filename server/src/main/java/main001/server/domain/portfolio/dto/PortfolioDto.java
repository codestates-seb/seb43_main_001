package main001.server.domain.portfolio.dto;

import lombok.*;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;
import java.util.List;

public class PortfolioDto {
    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Post{
        private long userId;
        @NotBlank(message = "제목을 입력해주세요.")
        private String title;

        private String gitLink;

        private String distributionLink;
        @NotBlank(message = "소개글을 작성해주세요.")
        private String description;

        @NotBlank(message = "설명을 작성해주세요.")
        private String content;

    }

    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Patch {
        private long portfolioId;

        private long userId;

        @NotBlank(message = "제목을 입력해주세요.")
        private String title;

        private String gitLink;

        private String distributionLink;

        @NotBlank(message = "소개글을 작성해주세요.")
        private String description;

        @NotBlank(message = "설명을 작성해주세요.")
        private String content;

        List<String> delete;


        public void setPortfolioId(long portfolioId) {
            this.portfolioId = portfolioId;
        }


    }
    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class Response {
        private long portfolioId;
        private long userId;
        private String name;
        private String title;
        private String gitLink;
        private String distributionLink;
        private String description;
        private String content;
        private String imgUrl;
        private String fileUrl;
        private int views;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;
    }
}

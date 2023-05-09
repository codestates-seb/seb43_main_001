package main001.server.domain.portfolio.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import java.time.LocalDate;
import java.time.LocalDateTime;

public class PortfolioDto {
    @Getter
    @Setter
    @AllArgsConstructor
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

        public void setPortfolioId(long portfolioId) {
            this.portfolioId = portfolioId;
        }


    }
    @Getter
    @Setter
    @AllArgsConstructor
    public static class Response {
        private long portfolioId;
        private long userId;
        private String name;
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

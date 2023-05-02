package main001.server.domain.portfolio.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

public class PortfolioDto {
    @Getter
    public static class Post{
        @NotBlank(message = "제목을 입력해주세요.")
        private String title;

        private String gitLink;

        private String distributionLink;
        @NotBlank(message = "설명을 작성해주세요.")
        private String description;

        @NotBlank(message = "본문을 작성해주세요.")
        private String content;
    }

    @Getter
    public static class Patch {
        private Long id;

        @NotBlank(message = "제목을 입력해주세요.")
        private String title;

        private String gitLink;

        private String distributionLink;

        @NotBlank(message = "설명을 작성해주세요.")
        private String description;


        @NotBlank(message = "본문을 작성해주세요.")
        private String content;

        public void setId(long id) {
            this.id = id;
        }


    }
    @Getter
    @Setter
    public static class Response {
        private Long id;
        private String title;
        private String gitLink;
        private String distributionLink;
        private String description;
        private String content;
        private int views;
    }
}

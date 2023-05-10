package main001.server.domain.attachment.image.dto;

import lombok.*;
import main001.server.domain.attachment.image.entity.ImageAttachment;
import main001.server.domain.portfolio.entity.Portfolio;

import java.util.List;

public class ImageDto {
    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class Post {
        private String imgUrl;
        private Portfolio portfolio;
    }

    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class Response {
        private List<ImageAttachment> images;
    }
}

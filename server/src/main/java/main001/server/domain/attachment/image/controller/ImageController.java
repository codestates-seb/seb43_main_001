package main001.server.domain.attachment.image.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import main001.server.domain.attachment.image.entity.Thumbnail;
import main001.server.domain.attachment.image.service.ImageService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/images")
@Validated
@Slf4j
@RequiredArgsConstructor
public class ImageController {
    private final ImageService imageService;
    @PostMapping("/thumbnail-upload")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity uploadThumbnail(@RequestPart(value = "image", required = false) MultipartFile image) throws IOException {
        String imgUrl = imageService.uploadThumbnail(image);
        return ResponseEntity.ok(imgUrl);
    }

    @DeleteMapping("/thumbnail-delete")
    public ResponseEntity deleteThumbnail(@RequestParam String imgUrl) {
        imageService.deleteThumbnail(imgUrl);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/thumbnail/{thumbnail-id}")
    public ResponseEntity getThumbnail(@PathVariable("thumbnail-id") Long thumbanilId) {
        Thumbnail thumbnail = imageService.getThumbnail(thumbanilId);
        String imgUrl = thumbnail.getImgUrl();
        return ResponseEntity.ok(imgUrl);
    }

    @PostMapping("/img-upload")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity uploadImg(@RequestPart(value = "images", required = false) List<MultipartFile> images) throws IOException {
        List<String> imgUrl = imageService.uploadImage(images);
        return ResponseEntity.ok(imgUrl);
    }

    @DeleteMapping("/img-delete")
    public ResponseEntity deleteImg(@RequestParam String imgUrl) {
        imageService.deleteImage(imgUrl);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/img-list")
    public ResponseEntity<List<String>> getImageList() {
        List<String> imageUrlList = imageService.getImageUrlList();
        return ResponseEntity.ok(imageUrlList);
    }
}

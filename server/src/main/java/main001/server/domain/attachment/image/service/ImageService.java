package main001.server.domain.attachment.image.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import main001.server.amazon.s3.service.S3Service;
import main001.server.domain.attachment.image.entity.ImageAttachment;
import main001.server.domain.attachment.image.entity.Thumbnail;
import main001.server.domain.attachment.image.repository.ImageAttachmentRepository;
import main001.server.domain.attachment.image.repository.ThumbnailRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class ImageService {
    private final ThumbnailRepository thumbnailRepository;
    private final ImageAttachmentRepository imageAttachmentRepository;
    private final S3Service s3Service;
    private final String DEFAULT_IMAGE_URL = "https://main001-portfolio.s3.ap-northeast-2.amazonaws.com/default/default.png";
    public String uploadThumbnail(MultipartFile representativeImg) throws IOException {
        Thumbnail attachment;
        String imgUrl;
        if (representativeImg != null && !representativeImg.isEmpty()) {
            // 이미지가 첨부된 경우에 대한 처리
            imgUrl = s3Service.uploadFile(representativeImg, "images");
        } else {
            // 이미지가 첨부되지 않은 경우에 대한 처리
            imgUrl = DEFAULT_IMAGE_URL;
        }
        attachment = new Thumbnail(imgUrl);
        thumbnailRepository.save(attachment);
        return imgUrl;
    }

    public void deleteThumbnail(String imgUrl) {
        Thumbnail thumbnail = thumbnailRepository.findByImgUrl(imgUrl);
        thumbnailRepository.delete(thumbnail);
        s3Service.deleteFile("images",thumbnail.getImgUrl());
    }

    public Thumbnail getThumbnail(long id) {
        Optional<Thumbnail> thumbnail = thumbnailRepository.findById(id);
        Thumbnail findThumbnail = thumbnail.orElseThrow(
                () -> new RuntimeException());
        return findThumbnail;
    }

    public List<String> uploadImage(List<MultipartFile> images) throws IOException {
        List<String> ImgUrls = new ArrayList<>();
        for (MultipartFile image : images) {
            String ImgUrl = s3Service.uploadFile(image, "images");
            ImageAttachment imageAttachment = new ImageAttachment(ImgUrl);
            imageAttachmentRepository.save(imageAttachment);
            ImgUrls.add(ImgUrl);
        }
        return ImgUrls;
    }


    public void deleteImage(String imgUrl) {
        Optional<ImageAttachment> imageAttachmentOptional = imageAttachmentRepository.findByImgUrl(imgUrl);
        imageAttachmentOptional.ifPresent(imageAttachment -> {
            imageAttachmentRepository.delete(imageAttachment);
            s3Service.deleteFile("images",imageAttachment.getImgUrl());
        });
    }

    public List<String> getImageUrlList() {
        List<ImageAttachment> imageList = imageAttachmentRepository.findAll();
        List<String> imageUrlList = new ArrayList<>();

        for (ImageAttachment imageAttachment : imageList) {
            imageUrlList.add(imageAttachment.getImgUrl());
        }

        return imageUrlList;
    }

}

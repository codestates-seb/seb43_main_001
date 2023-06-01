package main001.server.domain.attachment.image.repository;

import main001.server.domain.attachment.image.entity.ImageAttachment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ImageAttachmentRepository extends JpaRepository<ImageAttachment, Long> {
    Optional<ImageAttachment> findByImgUrl(String imgUrl);
}

package main001.server.domain.attachment.image.repository;

import main001.server.domain.attachment.image.entity.ImageAttachment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImageAttachmentRepository extends JpaRepository<ImageAttachment, Long> {

}

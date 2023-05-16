package main001.server.domain.attachment.file.repository;

import main001.server.domain.attachment.file.entity.FileAttachment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FileAttachmentRepository extends JpaRepository<FileAttachment, Long> {
    FileAttachment findByFileUrl (String FileUrl);
}

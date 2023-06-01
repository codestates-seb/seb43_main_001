package main001.server.domain.attachment.image.repository;

import main001.server.domain.attachment.image.entity.RepresentativeAttachment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RepresentativeAttachmentRepository extends JpaRepository<RepresentativeAttachment, Long> {
    RepresentativeAttachment findByRepresentativeImgId (String representativeImageUrl);

    Optional<RepresentativeAttachment> findById(Long id);
}

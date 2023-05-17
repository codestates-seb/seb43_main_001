package main001.server.domain.attachment.image.repository;

import main001.server.domain.attachment.image.entity.RepresentativeAttachment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RepresentativeImageRepository extends JpaRepository<RepresentativeAttachment, Long> {
    RepresentativeAttachment findByRepresentativeImgId (String representativeImageUrl);
}

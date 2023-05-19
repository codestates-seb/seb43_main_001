package main001.server.domain.attachment.image.repository;

import main001.server.domain.attachment.image.entity.ProfileImgAttachment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProfileImgRepository extends JpaRepository<ProfileImgAttachment, Long> {
    Optional<ProfileImgAttachment> findByProfileImgUrl(String profileImgUrl);
}

package main001.server.domain.attachment.image.repository;

import main001.server.domain.attachment.image.entity.ProfileImgAttachment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface ProfileImgRepository extends JpaRepository<ProfileImgAttachment, Long> {
    Optional<ProfileImgAttachment> findByProfileImgUrl(String profileImgUrl);

    @Modifying
    @Query(value = "delete from ProfileImgAttachment p where p.user.userId = :userId")
    void deleteByUserId(Long userId);
}

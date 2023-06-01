package main001.server.domain.attachment.image.repository;

import main001.server.domain.attachment.image.entity.Thumbnail;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ThumbnailRepository extends JpaRepository<Thumbnail, Long> {
    Thumbnail findByImgUrl(String imgUrl);

    Optional<Thumbnail> findById(Long id);
}

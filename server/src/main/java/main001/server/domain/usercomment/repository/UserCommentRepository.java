package main001.server.domain.usercomment.repository;

import main001.server.domain.user.entity.User;
import main001.server.domain.usercomment.entity.UserComment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface UserCommentRepository extends JpaRepository<UserComment, Long> {
    Page<UserComment> findByUser(User user, Pageable pageable);
    Page<UserComment> findByWriter(User writer, Pageable pageable);
}

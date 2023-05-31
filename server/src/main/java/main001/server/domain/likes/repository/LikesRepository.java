package main001.server.domain.likes.repository;

import main001.server.domain.likes.entity.PortfolioLikes;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LikesRepository extends JpaRepository<PortfolioLikes, Long> {

    Optional<PortfolioLikes> findByUserUserIdAndPortfolioPortfolioId(Long userId, Long portfolioId);
}

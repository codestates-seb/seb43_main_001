package main001.server.domain.likes.repository;

import main001.server.domain.likes.entity.PortfolioLikes;
import main001.server.domain.portfolio.entity.Portfolio;
import main001.server.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LikesRepository extends JpaRepository<PortfolioLikes, Long> {

    Optional<PortfolioLikes> findByUserAndPortfolio(User user, Portfolio portfolio);
}

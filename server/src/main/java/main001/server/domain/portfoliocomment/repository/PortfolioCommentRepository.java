package main001.server.domain.portfoliocomment.repository;

import main001.server.domain.portfoliocomment.entity.PortfolioComment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface PortfolioCommentRepository extends JpaRepository<PortfolioComment, Long> {
    Page<PortfolioComment> findByUser(User user, Pageable pageable);
    Page<PortfolioComment> findByPortfolio(Portfolio portfolio, Pageable pageable);
}

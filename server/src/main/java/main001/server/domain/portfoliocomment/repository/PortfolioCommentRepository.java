package main001.server.domain.portfoliocomment.repository;

import main001.server.domain.portfolio.entity.Portfolio;
import main001.server.domain.portfoliocomment.entity.PortfolioComment;
import main001.server.domain.user.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


@Repository
public interface PortfolioCommentRepository extends JpaRepository<PortfolioComment, Long> {
    Page<PortfolioComment> findByUser(User user, Pageable pageable);
    Page<PortfolioComment> findByPortfolio(Portfolio portfolio, Pageable pageable);

    @Query("SELECT c " +
            "FROM PortfolioComment c " +
            "JOIN PortfolioCommentRelation cr ON c.portfolioCommentId = cr.descendant.portfolioCommentId " +
            "WHERE c.parentComment IS NULL AND c.portfolio = :portfolio "+
            "ORDER BY cr.depth ASC")
    Page<PortfolioComment> findAllComments(@Param("portfolio") Portfolio portfolio, Pageable pageable);
}

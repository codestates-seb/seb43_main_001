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

//    @Query("SELECT c " +
//            "FROM PortfolioComment c " +
//            "JOIN PortfolioCommentRelation cr ON c = cr.descendant " +
//            "WHERE c.portfolio = :portfolio AND cr.depth=0 "+
//            "ORDER BY c.depth ASC, cr.ancestor.portfolioCommentId ASC")

//    @Query("SELECT c " +
//        "FROM PortfolioComment c " +
//        "LEFT JOIN PortfolioCommentRelation cr ON c = cr.descendant " +
//        "WHERE c.portfolio = :portfolio AND cr.depth = 0 " +
//        "ORDER BY COALESCE(c.rootComment.portfolioCommentId, c.parentComment.portfolioCommentId, c.portfolioCommentId) ASC, COALESCE(cr.depth, 0) ASC ")

//    @Query("SELECT DISTINCT pc " +
//            "FROM PortfolioComment pc " +
//            "JOIN FETCH pc.childComments " +
//            "WHERE pc.portfolio = :portfolio " +
//            "ORDER BY pc.portfolioCommentId ASC")
//    Page<PortfolioComment> findAllComments(@Param("portfolio") Portfolio portfolio, Pageable pageable);
}

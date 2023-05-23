package main001.server.domain.portfoliocomment.repository;

import main001.server.domain.portfoliocomment.entity.PortfolioComment;
import main001.server.domain.portfoliocomment.entity.PortfolioCommentRelation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PortfolioCommentRelationRepository extends JpaRepository<PortfolioCommentRelation,Long> {
//    @Query("DELETE FROM PortfolioCommentRelation cr where cr.ancestor.portfolioCommentId = :portfolioCommentId")
//    void deleteCommentsWithAncestor(Long portfolioCommentId);

    void deleteByAncestor(PortfolioComment portfolioComment);

    @Query("SELECT cr.descendant " +
            "FROM PortfolioCommentRelation cr " +
            "JOIN PortfolioComment c ON cr.ancestor = c " +
            "WHERE cr.ancestor = :portfolioComment")
    List<PortfolioComment> findAllByAncestor(PortfolioComment portfolioComment);
}

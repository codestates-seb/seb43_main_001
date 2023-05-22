package main001.server.domain.portfoliocomment.repository;

import main001.server.domain.portfoliocomment.entity.PortfolioCommentRelation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PortfolioCommentRelationRepository extends JpaRepository<PortfolioCommentRelation,Long> {

}

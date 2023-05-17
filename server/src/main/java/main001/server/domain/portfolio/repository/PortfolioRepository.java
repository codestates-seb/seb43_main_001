package main001.server.domain.portfolio.repository;

import main001.server.domain.portfolio.entity.Portfolio;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PortfolioRepository extends JpaRepository<Portfolio, Long> {
    @Modifying
    @Query("update Portfolio p set p.views = p.views + 1 where p.portfolioId = :id")
    int updateView(Long id);

    @Query("SELECT DISTINCT p FROM Portfolio p JOIN p.skills ps JOIN ps.skill s WHERE s.name = :name")
    Page<Portfolio> findBySkillName(@Param("name") String name, Pageable pageable);
}

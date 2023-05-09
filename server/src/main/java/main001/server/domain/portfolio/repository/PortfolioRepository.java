package main001.server.domain.portfolio.repository;

import main001.server.domain.portfolio.entity.Portfolio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PortfolioRepository extends JpaRepository<Portfolio, Long> {
    @Modifying
    @Query("update Portfolio p set p.views = p.views + 1 where p.portfolioId = :id")
    int updateView(Long id);

}

package main001.server.domain.portfolio.repository;

import main001.server.domain.portfolio.entity.Portfolio;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PortfolioRepository extends JpaRepository<Portfolio, Long> {

    Page<Portfolio> findByUserUserId(Long userId, Pageable pageable);

    @Query("SELECT DISTINCT p FROM Portfolio p JOIN p.skills ps JOIN ps.skill s WHERE s.name = :name")
    Page<Portfolio> findBySkillName(@Param("name") String name, Pageable pageable);

    @Query("SELECT DISTINCT p FROM Portfolio p JOIN p.user u WHERE u.name LIKE :userName%")
    Page<Portfolio> findByUserName(@Param("userName") String name,Pageable pageable);

    @Query("SELECT DISTINCT p from Portfolio p where p.title like %:title%")
    Page<Portfolio> findByTitle(@Param("title") String title, Pageable pageable);

}

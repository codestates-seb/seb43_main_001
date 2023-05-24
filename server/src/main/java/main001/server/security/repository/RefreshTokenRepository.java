package main001.server.security.repository;

import main001.server.security.jwt.RefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
    @Query(value = "select r from RefreshToken r where r.user.userId = :userId")
    RefreshToken findByUserId(Long userId);

    @Modifying
    @Query(value = "delete from RefreshToken r where r.user.userId = :userId")
    void deleteByUserId(Long userId);
}

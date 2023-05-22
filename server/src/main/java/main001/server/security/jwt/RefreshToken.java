package main001.server.security.jwt;

import lombok.*;
import main001.server.audit.BaseTimeEntity;
import main001.server.domain.user.entity.User;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RefreshToken extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String userIp;
    private String refreshToken;
    private Date expiredDate;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_ID")
    private User user;

    public RefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }
}

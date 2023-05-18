package main001.server.domain.portfolio.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import main001.server.domain.user.entity.User;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
public class PortfolioLikes {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long likesId;

    @ManyToOne
    private User user;

    @ManyToOne
    private Portfolio portfolio;
}

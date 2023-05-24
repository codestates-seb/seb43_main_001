package main001.server.domain.likes.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import main001.server.domain.portfolio.entity.Portfolio;
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
    @JoinColumn(name="userId")
    private User user;

    @ManyToOne
    @JoinColumn(name = "portfolioId")
    private Portfolio portfolio;

    public void setUser(User user) {
        this.user = user;

        if(!user.getLikes().contains(this)) {
            user.getLikes().add(this);
        }
    }

    public void setPortfolio(Portfolio portfolio) {
        this.portfolio = portfolio;

        if(!portfolio.getPortfolioLikes().contains(this)) {
            portfolio.getPortfolioLikes().add(this);
        }
    }
}

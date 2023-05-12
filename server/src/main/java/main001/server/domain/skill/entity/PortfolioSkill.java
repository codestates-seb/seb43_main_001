package main001.server.domain.skill.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import main001.server.domain.portfolio.entity.Portfolio;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
public class PortfolioSkill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long portfolioSkillId;

    @ManyToOne
    @JoinColumn(name = "portfolio_id")
    private Portfolio portfolio;

    @ManyToOne
    @JoinColumn(name = "skill_id")
    private Skill skill;

    public PortfolioSkill(Portfolio portfolio, Skill skill) {
        this.portfolio = portfolio;
        this.skill = skill;
    }

    public void setSkill(Skill skill) {
        this.skill = skill;
    }
}

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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "portfolio_id")
    private Portfolio portfolio;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "skill_id")
    private Skill skill;

    public static PortfolioSkill createPortfolioSkill( Skill skill) {
        PortfolioSkill portfolioSkill = new PortfolioSkill();
        portfolioSkill.setSkill(skill);

        return portfolioSkill;
    }

    public void setPortfolio(Portfolio portfolio) {
        this.portfolio = portfolio;

        if(!portfolio.getSkills().contains(this)) {
            portfolio.addSkill(this);
        }
    }

    public void setSkill(Skill skill) {
        this.skill = skill;
    }
}

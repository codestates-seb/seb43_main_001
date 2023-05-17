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

    public void deletePortfolioSkill() {
        this.getSkill().getPortfolioSkills().remove(this);
        skill.decreaseCounting();
    }

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

        if(!skill.getPortfolioSkills().contains(this)) {
            skill.getPortfolioSkills().add(this);
        }
        skill.increaseCounting();
    }
}

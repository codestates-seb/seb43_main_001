package main001.server.domain.portfoliocomment.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import main001.server.audit.BaseTimeEntity;
import main001.server.domain.portfolio.entity.Portfolio;
import main001.server.domain.user.entity.User;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class PortfolioComment extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private Long portfolioCommentId;

    @NotBlank(message = "내용은 반드시 포함되어야 합니다.")
    private String content;

    @ManyToOne
    @JoinColumn(name = "userId")
    private User user;

    @ManyToOne
    @JoinColumn(name = "portfolioId")
    private Portfolio portfolio;

    @Enumerated(value = EnumType.STRING)
    @Column(name = "status")
    private PortfolioCommentStatus portfolioCommentStatus = PortfolioCommentStatus.COMMENT_REGISTERED;

    public void setUser(User user) {
        this.user = user;
        if(!this.getUser().getPortfolioComments().contains(this)) {
            this.getUser().getPortfolioComments().add(this);
        }
    }

    public void setPortfolio(Portfolio portfolio) {
        this.portfolio = portfolio;
        if(!this.getPortfolio().getAnswers().contains(this)) {
            this.getPortfolio().getAnswers().add(this);
        }
    }
}

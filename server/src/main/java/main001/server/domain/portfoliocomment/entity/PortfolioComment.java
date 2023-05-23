package main001.server.domain.portfoliocomment.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import main001.server.audit.BaseTimeEntity;
import main001.server.domain.portfolio.entity.Portfolio;
import main001.server.domain.user.entity.User;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.ArrayList;
import java.util.List;

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

    private int depth;

    @ManyToOne
    @JoinColumn(name = "rootId")
    private PortfolioComment rootComment;

    @ManyToOne
    @JoinColumn(name = "parentId")
    private PortfolioComment parentComment;

    @OneToMany(mappedBy = "parentComment",fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PortfolioComment> childComments = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "userId")
    private User user;

    @ManyToOne
    @JoinColumn(name = "portfolioId")
    private Portfolio portfolio;

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

    public void setParentComment(PortfolioComment parentComment) {
        this.parentComment = parentComment;

        if(parentComment != null && !parentComment.getChildComments().contains(this)) {
            parentComment.getChildComments().add(this);
        }
    }
}

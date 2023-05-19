package main001.server.domain.portfolio.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import main001.server.audit.BaseTimeEntity;
import main001.server.domain.attachment.image.entity.ImageAttachment;
import main001.server.domain.attachment.image.entity.RepresentativeAttachment;
import main001.server.domain.portfoliocomment.entity.PortfolioComment;
import main001.server.domain.skill.entity.PortfolioSkill;
import main001.server.domain.user.entity.User;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class Portfolio extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long portfolioId;

    @Column(length = 500, nullable = false)
    private String title;

    @Column(length = 500)
    private String gitLink;

    @Column(length = 500)
    private String distributionLink;

    @Column(length = 500, nullable = false)
    private String description; // 프로젝트 소개글

    @Lob
    @Column(length = Integer.MAX_VALUE)
    private String content; //프로젝트 설명

    @OneToOne(mappedBy = "portfolio", cascade = CascadeType.ALL)
    private RepresentativeAttachment representativeAttachment;

    @OneToMany(mappedBy = "portfolio", cascade = CascadeType.ALL)
    private List<ImageAttachment> imageAttachments = new ArrayList<>();


    @Column(columnDefinition = "integer default 0", nullable = false)
    private int views;

    @ManyToOne
    @JoinColumn(name = "USER_ID")
    private User user;

    @OneToMany(mappedBy = "portfolio", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PortfolioSkill> skills = new ArrayList<>();

    @OneToMany(mappedBy = "portfolio", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PortfolioComment> answers = new ArrayList<>();


    public void setUser(User user) {
        this.user = user;
        if (!user.getPortfolios().contains(this)) {
            user.getPortfolios().add(this);
        }
    }

    public void setPortfolioComment(PortfolioComment portfolioComment) {
        this.getAnswers().add(portfolioComment);
        if (portfolioComment.getPortfolio() != this) {
            portfolioComment.setPortfolio(this);
        }
    }

    public void addSkill(PortfolioSkill portfolioSkill) {
        skills.add(portfolioSkill);
        portfolioSkill.setPortfolio(this);
    }

    public void deleteSkill(PortfolioSkill portfolioSkill) {
        skills.remove(portfolioSkill);
        portfolioSkill.deletePortfolioSkill();
    }
}

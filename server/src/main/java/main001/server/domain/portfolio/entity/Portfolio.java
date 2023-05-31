package main001.server.domain.portfolio.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import main001.server.audit.BaseTimeEntity;
import main001.server.domain.attachment.image.entity.ImageAttachment;
import main001.server.domain.attachment.image.entity.Thumbnail;
import main001.server.domain.likes.entity.PortfolioLikes;
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

    @Column(length= 50, nullable = false)
    private String title;

    @Column(columnDefinition = "TINYTEXT")
    private String gitLink;

    @Column(columnDefinition = "TEXT")
    private String distributionLink;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String description; // 프로젝트 소개글

    @Column(columnDefinition = "LONGTEXT")
    private String content; //프로젝트 설명

    @Column(columnDefinition = "integer default 0", nullable = false)
    private int likesCount;

    @Column(columnDefinition = "integer default 0", nullable = false)
    private int viewCount;

    @OneToOne(mappedBy = "portfolio", cascade = CascadeType.ALL)
    private Thumbnail thumbnail;

    @OneToMany(mappedBy = "portfolio", cascade = CascadeType.ALL)
    private List<ImageAttachment> imageAttachments = new ArrayList<>();

    @OneToMany(mappedBy = "portfolio", fetch = FetchType.LAZY, orphanRemoval = true)
    private List<PortfolioLikes> portfolioLikes = new ArrayList<>();

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
    }

    public void clearSkills() {
        for(int i = skills.size()-1; i>=0; i--) {
            deleteSkill(skills.get(i));
        }
    }

    public void updateViewCount() {
        this.viewCount++;
    }
}

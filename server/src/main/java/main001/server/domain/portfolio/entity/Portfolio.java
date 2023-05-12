package main001.server.domain.portfolio.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import main001.server.audit.BaseTimeEntity;
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
    private Long id;

    @Column(length = 500, nullable = false)
    private String title;

    @Column
    private String gitLink;
    @Column
    private String distributionLink;

    @Column(nullable = false)
    private String description; // 프로젝트 소개글
    private String content; //프로젝트 설명
    @Column(columnDefinition = "integer default 0", nullable = false)
    private int views;

    @ManyToOne
    @JoinColumn(name = "USER_ID")
    private User user;

    @OneToMany(mappedBy = "portfolio", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PortfolioComment> answers = new ArrayList<>();

    @OneToMany(mappedBy = "portfolio", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PortfolioSkill> skills = new ArrayList<>();

    public void addSkill(PortfolioSkill skill) {
        skills.add(skill);
        skill.setPortfolio(this);
    }

    public void addComment(PortfolioComment comment) {
        answers.add(comment);
        comment.setPortfolio(this);
    }

    public Portfolio(Long id, String title, String gitLink, String distributionLink, String description, String content, int views, User user) {
        this.id = id;
        this.title = title;
        this.gitLink = gitLink;
        this.distributionLink = distributionLink;
        this.description = description;
        this.content = content;
        this.views = views;
        this.user = user;
    }
}

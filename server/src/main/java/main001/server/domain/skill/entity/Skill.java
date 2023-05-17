package main001.server.domain.skill.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import main001.server.audit.BaseTimeEntity;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "skills")
public class Skill extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long skillId;

    @Column(unique = true)
    @NotBlank
    @Setter
    private String name;

    @Column(nullable = false, columnDefinition = "integer default 0")
    private int counting;

    @OneToMany(mappedBy = "skill", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<UserSkill> userSkills = new ArrayList<>();

    @OneToMany(mappedBy = "skill", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PortfolioSkill> portfolioSkills = new ArrayList<>();

    public Skill(String name) {
        this.name = name;
    }

    public void increaseCounting() {
        this.counting++;
    }

    public void decreaseCounting() {
        this.counting--;
    }
}

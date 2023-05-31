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
    private String skillId;

    @Column(unique = true)
    @NotBlank
    @Setter
    private String name;

//    @OneToMany(mappedBy = "skill", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
//    private List<UserSkill> userSkills = new ArrayList<>();

    public Skill(String name) {
        this.name = name;
    }

}

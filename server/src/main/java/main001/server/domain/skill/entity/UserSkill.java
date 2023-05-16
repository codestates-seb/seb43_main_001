package main001.server.domain.skill.entity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import main001.server.domain.user.entity.User;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class UserSkill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userSkillId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "skill_id")
    private Skill skill;

    public static UserSkill createUserSkill(Skill skill) {
        UserSkill userSkill = new UserSkill();
        userSkill.setSkill(skill);

        return userSkill;
    }

    public void deleteUserSkill() {
        this.skill.decreaseCounting();
    }

    public void setUser(User user) {
        this.user = user;

        // 무한 루프에 빠지지 않도록 하는 조건문
        if(!user.getSkills().contains(this)) {
            user.getSkills().add(this);
        }
    }

    public void setSkill(Skill skill) {
        this.skill = skill;

        if(!skill.getUserSkills().contains(this)) {
            skill.getUserSkills().add(this);
        }
        skill.increaseCounting();
    }
}

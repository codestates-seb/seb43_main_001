package main001.server.domain.user.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import main001.server.domain.user.enums.Grade;
import main001.server.domain.user.enums.JobStatus;
import main001.server.domain.user.enums.UserStatus;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;
    @Column(length = 50, nullable = false, unique = true)
    private String email;

    @Column(length = 20, nullable = false, unique = true)
    private String name;

    @Column
    private String profileImg;

    @Column(length = 20, unique = true)
    private String gitLink;

    @Column(length = 20, unique = true)
    private String blogLink;

    @Enumerated(value = EnumType.STRING)
    @Column(length = 20, nullable = false)
    private Grade grade = Grade.NOVICE;

    @Enumerated(value = EnumType.STRING)
    @Column(length = 20, nullable = false)
    private UserStatus userStatus = UserStatus.USER_ACTIVE;

    @Enumerated(value = EnumType.STRING)
    private JobStatus jobStatus;

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>(); // ROLE_USER<DEFAULT>, ADMIN

    @Column(length = 500)
    private String about;

    @OneToMany(mappedBy = "user")
    private List<Skill> skills = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<Portfolio> portfolios = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<UserComment> userComments = new ArrayList<>();

    public User(String email) {
        this.email = email;
    }
}

package main001.server.domain.usercomment.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import main001.server.audit.BaseTimeEntity;
import main001.server.domain.user.entity.User;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class UserComment extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private Long userCommentId;

    @NotBlank(message = "내용은 반드시 포함되어야 합니다.")
    private String content;

    @ManyToOne
    @JoinColumn(name = "userId")
    private User user;

    @ManyToOne
    @JoinColumn(name = "writerId")
    private User writer;

    @Enumerated(value = EnumType.STRING)
    @Column(name = "status")
    private UserCommentStatus userCommentStatus = UserCommentStatus.COMMENT_REGISTERED;


    public void setUser(User user) {
        this.user = user;
        if(!this.user.getUserComments().contains(this)) {
            this.user.getUserComments().add(this);
        }
    }

    public void setWriter(User writer) {
        this.writer = writer;
        if(!this.writer.getUserComments().contains(this)) {
            this.writer.getUserComments().add(this);
        }
    }
}

package main001.server.domain.attachment.image.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import main001.server.audit.BaseTimeEntity;
import main001.server.domain.portfolio.entity.Portfolio;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class RepresentativeAttachment extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long representativeImgId;

    private String representativeImgUrl;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "PORTFOLIO_ID")
    private Portfolio portfolio;

    @Builder
    public RepresentativeAttachment(String representativeImgUrl) {
        this.representativeImgUrl = representativeImgUrl;
    }
}

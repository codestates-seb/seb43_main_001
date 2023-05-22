package main001.server.domain.portfoliocomment.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
public class PortfolioCommentRelation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long RelationId;

    @Setter
    @ManyToOne
    @JoinColumn(name = "ancestorId")
    private PortfolioComment ancestor;

    @Setter
    @ManyToOne
    @JoinColumn(name = "descendantId")
    private PortfolioComment descendant;

    @Setter
    private int depth;
}

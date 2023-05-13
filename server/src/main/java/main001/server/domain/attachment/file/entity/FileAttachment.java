package main001.server.domain.attachment.file.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import main001.server.domain.portfolio.entity.Portfolio;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class FileAttachment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long fileId;
    private String fileUrl;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "PORTFOLIO_ID")
    private Portfolio portfolio;

    @Builder
    public FileAttachment(String fileUrl) {
        this.fileUrl = fileUrl;
    }
}

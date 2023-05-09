package main001.server.domain.attachment;

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

    private String fileName;
    private String fileUrl;

    @ManyToOne(fetch = FetchType.LAZY)
    private Portfolio portfolio;
}

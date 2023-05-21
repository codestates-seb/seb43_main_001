package main001.server.domain.portfolio.mapper;

import main001.server.domain.attachment.image.entity.ImageAttachment;
import main001.server.domain.portfolio.dto.PortfolioDto;
import main001.server.domain.portfolio.entity.Portfolio;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface PortfolioMapper {
    @Mapping(source = "userId", target = "user.userId")
    @Mapping(target = "skills", ignore = true)
    Portfolio portfolioPostDtoToPortfolio(PortfolioDto.Post postDto);

    @Mapping(source = "userId", target = "user.userId")
    @Mapping(target = "skills", ignore = true)
    Portfolio portfolioPatchDtoToPortfolio(PortfolioDto.Patch patchDto);

    default PortfolioDto.Response portfolioToPortfolioResponseDto(Portfolio portfolio) {
        if ( portfolio == null ) {
            return null;
        }

        PortfolioDto.Response response = PortfolioDto.Response.builder()
                .portfolioId(portfolio.getPortfolioId())
                .userId(portfolio.getUser().getUserId())
                .name(portfolio.getUser().getName())
                .title(portfolio.getTitle())
                .gitLink(portfolio.getGitLink())
                .distributionLink(portfolio.getDistributionLink())
                .description(portfolio.getDescription())
                .content(portfolio.getContent())
                .representativeImgUrl(portfolio.getRepresentativeAttachment() == null ? null : portfolio.getRepresentativeAttachment().getRepresentativeImgUrl())
                .skills(portfolio.getSkills().stream()
                        .map(portfolioSkill -> portfolioSkill.getSkill().getName())
                        .collect(Collectors.toList()))
                .viewCount(portfolio.getViewCount())
                .createdAt(portfolio.getCreatedAt())
                .updatedAt(portfolio.getUpdatedAt())
                .isAuth(portfolio.getUser().isAuth())
                .build();

        return response;
    }

    List<PortfolioDto.Response> portfolioToPortfolioResponseDtos(List<Portfolio> portfolios);
}

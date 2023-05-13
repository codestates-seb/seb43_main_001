package main001.server.domain.portfolio.mapper;

import main001.server.domain.portfolio.dto.PortfolioDto;
import main001.server.domain.portfolio.entity.Portfolio;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface PortfolioMapper {
    @Mapping(source = "userId", target = "user.userId")
    Portfolio portfolioPostDtoToPortfolio(PortfolioDto.Post postDto);

    @Mapping(source = "userId", target = "user.userId")
    Portfolio portfolioPatchDtoToPortfolio(PortfolioDto.Patch patchDto);

    default PortfolioDto.Response portfolioToPortfolioResponseDto(Portfolio portfolio){
        return PortfolioDto.Response.builder()
                .portfolioId(portfolio.getPortfolioId())
                .userId(portfolio.getUser().getUserId())
                .name(portfolio.getUser().getName())
                .title(portfolio.getTitle())
                .gitLink(portfolio.getGitLink())
                .distributionLink(portfolio.getDistributionLink())
                .description(portfolio.getDescription())
                .content(portfolio.getContent())
                .imgUrl(portfolio.getImageAttachments().isEmpty() ? null : portfolio.getImageAttachments().get(0).getImgUrl())
                .fileUrl(portfolio.getFileAttachments().isEmpty() ? null : portfolio.getFileAttachments().get(0).getFileUrl())
                .views(portfolio.getViews())
                .createdAt(portfolio.getCreatedAt())
                .updatedAt(portfolio.getUpdatedAt())
                .build();
    }

    @Mapping(source = "user.userId", target = "userId")
    @Mapping(source = "user.name", target = "name")
    List<PortfolioDto.Response> portfolioToPortfolioResponseDtos(List<Portfolio> portfolios);
}

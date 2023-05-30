package main001.server.domain.portfolio.mapper;

import main001.server.domain.portfolio.dto.PortfolioDto;
import main001.server.domain.portfolio.entity.Portfolio;
import main001.server.domain.utils.CurrentUserIdFinder;
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

        Long currentUserId = CurrentUserIdFinder.getCurrentUserId();

        PortfolioDto.Response response = PortfolioDto.Response.builder()
                .portfolioId(portfolio.getPortfolioId())
                .userId(portfolio.getUser().getUserId())
                .name(portfolio.getUser().getName())
                .profileImg(portfolio.getUser().getProfileImg())
                .title(portfolio.getTitle())
                .gitLink(portfolio.getGitLink())
                .distributionLink(portfolio.getDistributionLink())
                .description(portfolio.getDescription())
                .content(portfolio.getContent())
                .skills(portfolio.getSkills().stream()
                        .map(portfolioSkill -> portfolioSkill.getSkill().getName())
                        .collect(Collectors.toList()))
                .viewCount(portfolio.getViewCount())
                .likesCount(portfolio.getLikesCount())
                .createdAt(portfolio.getCreatedAt())
                .updatedAt(portfolio.getUpdatedAt())
                .isAuth(portfolio.getUser().isAuth())
                .build();

        if (currentUserId != null && currentUserId.equals(portfolio.getUser().getUserId())) {
            response.setAuth(true);
        }

        return response;
    }

    default List<PortfolioDto.Response> portfolioToPortfolioResponseDtos(List<Portfolio> portfolios) {
        if ( portfolios == null ) {
            return null;
        }

        Long currentUserId = CurrentUserIdFinder.getCurrentUserId();

        List<PortfolioDto.Response> list = new ArrayList<>( portfolios.size() );
        portfolios.forEach(p -> {
            PortfolioDto.Response response = portfolioToPortfolioResponseDto(p);
            if(p.getUser().getUserId().equals(currentUserId)) {
                response.setAuth(true);
            }
            list.add(response);
        });

        return list;
    }
}

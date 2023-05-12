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

    @Mapping(source = "user.userId", target = "userId")
    @Mapping(source = "user.name", target = "name")
    PortfolioDto.Response portfolioToPortfolioResponseDto(Portfolio portfolio);

    @Mapping(source = "user.userId", target = "userId")
    @Mapping(source = "user.name", target = "name")
    List<PortfolioDto.Response> portfolioToPortfolioResponseDtos(List<Portfolio> portfolios);
}

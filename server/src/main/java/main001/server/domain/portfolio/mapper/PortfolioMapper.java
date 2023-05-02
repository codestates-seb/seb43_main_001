package main001.server.domain.portfolio.mapper;

import main001.server.domain.portfolio.dto.PortfolioDto;
import main001.server.domain.portfolio.entity.Portfolio;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface PortfolioMapper {
    Portfolio portfolioPostDtoToPortfolio(PortfolioDto.Post postDto);
    Portfolio portfolioPatchDtoToPortfolio(PortfolioDto.Patch patchDto);
    PortfolioDto.Response portfolioToPortfolioResponseDto(Portfolio portfolio);
    List<PortfolioDto.Response> portfolioToPortfolioResponseDtos(List<Portfolio> portfolios);
}

package main001.server.domain.portfolio.controller;

import lombok.extern.slf4j.Slf4j;
import main001.server.domain.portfolio.dto.PortfolioDto;
import main001.server.domain.portfolio.entity.Portfolio;
import main001.server.domain.portfolio.mapper.PortfolioMapper;
import main001.server.domain.portfolio.service.PortfolioService;
import main001.server.response.MultiResponseDto;
import main001.server.response.SingleResponseDto;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/portfolios")
@Validated
@Slf4j
public class PortfolioController {
    private final static String PORTFOLIO_DEFAULT_URL = "/portfolios";
    private final PortfolioService portfolioService;
    private final PortfolioMapper mapper;

    public PortfolioController(PortfolioService portfolioService, PortfolioMapper mapper) {
        this.portfolioService = portfolioService;
        this.mapper = mapper;
    }

    @PostMapping
    public ResponseEntity postPortfolio(@Valid @RequestBody PortfolioDto.Post postDto) {
        Portfolio portfolio = portfolioService.createPortfolio(mapper.portfolioPostDtoToPortfolio(postDto));

        URI location =
                UriComponentsBuilder
                        .newInstance()
                        .path(PORTFOLIO_DEFAULT_URL + "/{portfolio-id}")
                        .buildAndExpand(portfolio.getId())
                        .toUri();
        return ResponseEntity.created(location).build();
    }

    @PatchMapping("/{portfolio-id}")
    public ResponseEntity patchPortfolio(@PathVariable("portfolio-id") long portfolioId,
                                         @RequestBody PortfolioDto.Patch patchDto) {
        patchDto.setId(portfolioId);

        Portfolio response = portfolioService.updatePortfolio(mapper.portfolioPatchDtoToPortfolio(patchDto));
        return new ResponseEntity<>(new SingleResponseDto<>(mapper.portfolioToPortfolioResponseDto(response)), HttpStatus.OK);
    }

    @GetMapping("/{portfolio-id}")
    public ResponseEntity getPortfolio(@PathVariable("portfolio-id") long portfolioId,
                                        HttpServletRequest request,
                                        HttpServletResponse response) {
        portfolioService.updateView(portfolioId, request, response);
        Portfolio portfolio = portfolioService.findPortfolio(portfolioId);
        return new ResponseEntity<>(new SingleResponseDto<>(mapper.portfolioToPortfolioResponseDto(portfolio)), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getPortfolios(@Positive @RequestParam int page,
                                        @Positive @RequestParam int size) {
        Page<Portfolio> pagePortfolios = portfolioService.findPortfolios(page - 1, size);
        List<Portfolio> portfolios = pagePortfolios.getContent();
        return new ResponseEntity<>(new MultiResponseDto<>(mapper.portfolioToPortfolioResponseDtos(portfolios), pagePortfolios), HttpStatus.OK);
    }

    @DeleteMapping("/{portfolio-id}")
    public ResponseEntity deletePortfolio(@PathVariable("portfolio-id") long portfolioId) {
        portfolioService.deletePortfolio(portfolioId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}

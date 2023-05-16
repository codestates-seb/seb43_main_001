package main001.server.domain.portfolio.controller;

import lombok.extern.slf4j.Slf4j;
import main001.server.amazon.s3.service.S3Service;
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
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.io.IOException;
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
    private final S3Service s3Service;

    public PortfolioController(PortfolioService portfolioService, PortfolioMapper mapper, S3Service s3Service) {
        this.portfolioService = portfolioService;
        this.mapper = mapper;
        this.s3Service = s3Service;
    }

    @PostMapping
    public ResponseEntity postPortfolio(@Valid @RequestPart PortfolioDto.Post postDto,
                                        @RequestPart(value = "images", required = false) List<MultipartFile> images,
                                        @RequestPart(value = "files", required = false) List<MultipartFile> files) throws IOException {

        Portfolio portfolio = mapper.portfolioPostDtoToPortfolio(postDto);

        Portfolio response = portfolioService.createPortfolio(portfolio, images, files);


        portfolioService.addSkills(portfolio,postDto.getSkills());

        URI location =
                UriComponentsBuilder
                        .newInstance()
                        .path(PORTFOLIO_DEFAULT_URL + "/{portfolio-id}")
                        .buildAndExpand(response.getPortfolioId())
                        .toUri();
        return ResponseEntity.created(location).build();
    }

    @PatchMapping("/{portfolio-id}")
    public ResponseEntity patchPortfolio(@PathVariable("portfolio-id") long portfolioId,
                                         @RequestPart PortfolioDto.Patch patchDto,
                                         @RequestPart(value = "images", required = false) List<MultipartFile> images,
                                         @RequestPart(value = "files", required = false) List<MultipartFile> files) throws IOException{
        patchDto.setPortfolioId(portfolioId);
        Portfolio portfolio = mapper.portfolioPatchDtoToPortfolio(patchDto);

        List<String> deleteList = patchDto.getDelete();

        if (images != null) portfolioService.updateImage(portfolioId, images);
        if (files != null) portfolioService.updateFile(portfolioId, files);
        if (deleteList != null) {
            portfolioService.deleteImage(deleteList);
            portfolioService.deleteFile(deleteList);
        }
        Portfolio response = portfolioService.updatePortfolio(portfolio);

        portfolioService.addSkills(response, patchDto.getSkills());

        return new ResponseEntity<>(new SingleResponseDto<>(mapper.portfolioToPortfolioResponseDto(response)), HttpStatus.OK);
    }

    @GetMapping("/{portfolio-id}")
    public ResponseEntity getPortfolio(@PathVariable("portfolio-id") Long portfolioId,
                                        HttpServletRequest request,
                                        HttpServletResponse response) {
        portfolioService.updateView(portfolioId, request, response);
        Portfolio portfolio = portfolioService.findPortfolio(portfolioId);
        return new ResponseEntity<>(new SingleResponseDto<>(mapper.portfolioToPortfolioResponseDto(portfolio)), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getPortfolios(@Positive @RequestParam int page,
                                        @Positive @RequestParam int size,
                                        @RequestParam(value = "sort", defaultValue = "createdAt") String sort) {
        Page<Portfolio> pagePortfolios;
        if (sort.equals("views")) {
            pagePortfolios = portfolioService.findAllOrderByViewsDesc(page - 1, size);
        } else {
            pagePortfolios = portfolioService.findAllOrderByCreatedAtDesc(page - 1, size);
        }
        List<Portfolio> portfolios = pagePortfolios.getContent();
        return new ResponseEntity<>(new MultiResponseDto<>(mapper.portfolioToPortfolioResponseDtos(portfolios), pagePortfolios), HttpStatus.OK);
    }

    @DeleteMapping("/{portfolio-id}")
    public ResponseEntity deletePortfolio(@PathVariable("portfolio-id") long portfolioId) {
        portfolioService.deletePortfolio(portfolioId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}

package main001.server.domain.portfolio.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import main001.server.domain.attachment.image.entity.Thumbnail;
import main001.server.domain.likes.service.LikesService;
import main001.server.domain.portfolio.dto.PortfolioDto;
import main001.server.domain.portfolio.entity.Portfolio;
import main001.server.domain.portfolio.mapper.PortfolioMapper;
import main001.server.domain.portfolio.service.PortfolioService;
import main001.server.exception.BusinessLogicException;
import main001.server.exception.ExceptionCode;
import main001.server.response.MultiResponseDto;
import main001.server.response.SingleResponseDto;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.io.IOException;
import java.net.URI;
import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/portfolios")
@Validated
@Slf4j
@RequiredArgsConstructor
public class PortfolioController {
    private final static String PORTFOLIO_DEFAULT_URL = "/portfolios";
    private final PortfolioService portfolioService;
    private final PortfolioMapper mapper;
    private final LikesService likesService;

    @PostMapping
    public ResponseEntity postPortfolio(@Valid @RequestPart PortfolioDto.Post postDto,
                                        @RequestPart(value = "thumbnail", required = false) MultipartFile thumbnail) throws IOException {
        Portfolio portfolio = mapper.portfolioPostDtoToPortfolio(postDto);

        Portfolio response = portfolioService.createPortfolio(portfolio, postDto.getSkills(), thumbnail);

        URI location =
                UriComponentsBuilder
                        .newInstance()
                        .path(PORTFOLIO_DEFAULT_URL + "/{portfolio-id}")
                        .buildAndExpand(response.getPortfolioId())
                        .toUri();
        return ResponseEntity.created(location).build();
    }

    @PatchMapping("/{portfolio-id}/thumbnail-upload")
    public ResponseEntity uploadThumbnail(@PathVariable("portfolio-id") @Positive long portfolioId,
                                           @RequestPart(value = "thumbnail") MultipartFile thumbnail) throws IOException {
        String thumbnailUrl = portfolioService.updateThumbnail(thumbnail, portfolioId);

        return ResponseEntity.ok(thumbnailUrl);
    }

    @PatchMapping("/{portfolio-id}")
    public ResponseEntity patchPortfolio(@PathVariable("portfolio-id") long portfolioId,
                                         @RequestBody PortfolioDto.Patch patchDto) {
        patchDto.setPortfolioId(portfolioId);
        Portfolio portfolio = mapper.portfolioPatchDtoToPortfolio(patchDto);


        Portfolio response = portfolioService.updatePortfolio(portfolio, patchDto.getSkills());

        return new ResponseEntity<>(new SingleResponseDto<>(mapper.portfolioToPortfolioResponseDto(response)), HttpStatus.OK);
    }

    @GetMapping("/{portfolio-id}/views")
    public void increasePostViews(@PathVariable("portfolio-id") long portfolioId) {
        portfolioService.increaseViewCount(portfolioId);
    }

    @GetMapping("/{portfolio-id}")
    public ResponseEntity getPortfolio(@PathVariable("portfolio-id") Long portfolioId) {

        HttpServletRequest request = ((ServletRequestAttributes) Objects.requireNonNull(RequestContextHolder.getRequestAttributes())).getRequest();
        String token = request.getHeader("Authorization");

        Portfolio portfolio = portfolioService.findPortfolio(portfolioId);
        PortfolioDto.Response responseDto = mapper.portfolioToPortfolioResponseDto(portfolio);

        if(token==null) {
            responseDto.setLikes(false);
        }
        else {
            boolean likes = likesService.findExistLikes(token, portfolioId);
            responseDto.setLikes(likes);
        }

        return new ResponseEntity<>(new SingleResponseDto<>(responseDto), HttpStatus.OK);
    }

    @GetMapping("/users/{user-id}")
    public ResponseEntity getPortfoliosByUser(
            @PathVariable("user-id") Long userId,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "1") @Positive int page,
            @RequestParam(defaultValue = "15") @Positive int size) {
        Page<Portfolio> portfolios = portfolioService.getPortfoliosByUser(userId, sortBy, page - 1, size);

        List<Portfolio> content = portfolios.getContent();

        return new ResponseEntity(
                new MultiResponseDto<>(mapper.portfolioToPortfolioResponseDtos(content),portfolios), HttpStatus.OK);
    }

    @GetMapping("/search")
    public ResponseEntity searchPortfolios(
            @RequestParam(defaultValue = "") String value,
            @RequestParam(defaultValue = "userName") String category,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "1") @Positive int page,
            @RequestParam(defaultValue = "15") @Positive int size)  {

        Page<Portfolio> portfoliosPage =
                portfolioService.searchPortfolios(page - 1, size, category, sortBy, value);

        List<Portfolio> content = portfoliosPage.getContent();

        return new ResponseEntity<>(
                new MultiResponseDto<>(mapper.portfolioToPortfolioResponseDtos(content),portfoliosPage),HttpStatus.OK);
    }

    @DeleteMapping("/{portfolio-id}")
    public ResponseEntity deletePortfolio(@PathVariable("portfolio-id") long portfolioId) {
        portfolioService.deletePortfolio(portfolioId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}

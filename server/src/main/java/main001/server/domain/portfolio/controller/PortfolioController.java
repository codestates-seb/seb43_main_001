package main001.server.domain.portfolio.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import main001.server.amazon.s3.service.S3Service;
import main001.server.domain.attachment.image.entity.ImageAttachment;
import main001.server.domain.attachment.image.repository.ImageAttachmentRepository;
import main001.server.domain.likes.service.LikesService;
import main001.server.domain.portfolio.dto.PortfolioDto;
import main001.server.domain.portfolio.entity.Portfolio;
import main001.server.domain.portfolio.mapper.PortfolioMapper;
import main001.server.domain.portfolio.service.PortfolioService;
import main001.server.response.MultiResponseDto;
import main001.server.response.SingleResponseDto;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import java.io.IOException;
import java.net.URI;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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

    private final ImageAttachmentRepository imageAttachmentRepository;

    @PostMapping
    public ResponseEntity postPortfolio(@Valid @RequestPart PortfolioDto.Post postDto,
                                        @RequestPart(value = "representativeImg", required = false) MultipartFile representativeImg) throws IOException {
        Portfolio portfolio = mapper.portfolioPostDtoToPortfolio(postDto);

        Portfolio response = portfolioService.createPortfolio(portfolio, postDto.getSkills(), representativeImg);


        portfolioService.addSkills(portfolio,postDto.getSkills());

        URI location =
                UriComponentsBuilder
                        .newInstance()
                        .path(PORTFOLIO_DEFAULT_URL + "/{portfolio-id}")
                        .buildAndExpand(response.getPortfolioId())
                        .toUri();
        return ResponseEntity.created(location).build();
    }


    @PostMapping("/img-upload")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity uploadImg(@RequestPart(value = "images", required = false) List<MultipartFile> images) throws IOException {
        List<String> imgUrl = portfolioService.uploadImage(images);
        return ResponseEntity.ok(imgUrl);
    }



    @DeleteMapping("/img-delete/{imgId}")
    public ResponseEntity deleteImg(@PathVariable Long imgId) {
        portfolioService.deleteImage(imgId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/img-list")
    public ResponseEntity<List<String>> getImageList() {
        List<String> imageUrlList = portfolioService.getImageUrlList();
        return ResponseEntity.ok(imageUrlList);
    }

    @PatchMapping("/{portfolio-id}")
    public ResponseEntity patchPortfolio(@PathVariable("portfolio-id") long portfolioId,
                                         @RequestPart PortfolioDto.Patch patchDto,
                                         @RequestPart(value = "representativeImg", required = false) MultipartFile representativeImg) throws IOException {
        patchDto.setPortfolioId(portfolioId);
        Portfolio portfolio = mapper.portfolioPatchDtoToPortfolio(patchDto);


        Portfolio response = portfolioService.updatePortfolio(portfolio, portfolioId, patchDto.getSkills(), representativeImg);

        return new ResponseEntity<>(new SingleResponseDto<>(mapper.portfolioToPortfolioResponseDto(response)), HttpStatus.OK);
    }

    @PatchMapping("/{portfolio-id}/views")
    public void increasePostViews(@PathVariable("portfolio-id") long portfolioId) {
        portfolioService.increaseViewCount(portfolioId);
    }

    @GetMapping("/{portfolio-id}")
    public ResponseEntity getPortfolio(@PathVariable("portfolio-id") Long portfolioId) {

        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
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
            @RequestParam @NotNull String value,
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

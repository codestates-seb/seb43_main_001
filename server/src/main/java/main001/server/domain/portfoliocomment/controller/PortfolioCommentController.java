package main001.server.domain.portfoliocomment.controller;

import lombok.RequiredArgsConstructor;
import main001.server.domain.portfoliocomment.dto.PortfolioCommentDto;
import main001.server.domain.portfoliocomment.entity.PortfolioComment;
import main001.server.domain.portfoliocomment.service.PortfolioCommentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.List;

@RestController
@Validated
@RequiredArgsConstructor
@RequestMapping("/api/portfoliocomments")
public class PortfolioCommentController {

    private final PortfolioCommentService portfolioCommentService;

    @PostMapping
    public ResponseEntity postPortfolioComment(@RequestBody @Valid PortfolioCommentDto.Post postDto) {
        PortfolioCommentDto.Response response = portfolioCommentService.createPortfolioComment(postDto);

        URI location =
                UriComponentsBuilder
                        .newInstance()
                        .path("api/portfoliocomments/{portfolioComment-id}")
                        .buildAndExpand(response.getPortfolioCommentId())
                        .toUri();

        return ResponseEntity.created(location).build();
    }

    @PatchMapping("/{portfolioComment_id}")
    @ResponseStatus(HttpStatus.OK)
    public PortfolioCommentDto.Response patchPortfolioComment(@PathVariable("portfolioComment_id") @Positive Long portfolioCommentId,
                                                              @RequestBody @Valid PortfolioCommentDto.Patch patchDto) {
        patchDto.setPortfolioCommentId(portfolioCommentId);
        PortfolioCommentDto.Response response = portfolioCommentService.updatePortfolioComment(patchDto);
        return response;
    }

    @GetMapping("/users/{user_id}")
    @ResponseStatus(HttpStatus.OK)
    public PortfolioCommentDto.ResponseList getPortfolioCommentsByWriter(@PathVariable("user_id") @Positive Long userId,
                                                                         @RequestParam(defaultValue = "1") @Positive int page,
                                                                         @RequestParam(defaultValue = "15") @Positive int size) {
        return portfolioCommentService.findPortfolioCommentsByWriter(userId, page - 1, size);
    }

    @GetMapping("/portfolios/{portfolio_id}")
    @ResponseStatus(HttpStatus.OK)
    public PortfolioCommentDto.ResponseList getPortfolioCommentsByPortfolio(@PathVariable("portfolio_id") @Positive Long portfolioId,
                                                                            @RequestParam(defaultValue = "1") @Positive int page,
                                                                            @RequestParam(defaultValue = "15") @Positive int size) {
        return portfolioCommentService.findPortfolioCommentsByPortfolio(portfolioId, page - 1, size);
    }

    @DeleteMapping("/{portfolioComment_id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deletePortfolioComment(@PathVariable("portfolioComment_id") @Positive Long portfolioCommentId) {
        portfolioCommentService.deletePortfolioComment(portfolioCommentId);
    }
}

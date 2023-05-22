package main001.server.domain.portfoliocomment.controller;

import lombok.RequiredArgsConstructor;
import main001.server.domain.portfoliocomment.dto.PortfolioCommentDto;
import main001.server.domain.portfoliocomment.service.PortfolioCommentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;

@RestController
@Validated
@RequiredArgsConstructor
@RequestMapping("/api/portfoliocomments")
public class PortfolioCommentController {

    private final PortfolioCommentService portfolioCommentService;

    @PostMapping
    public ResponseEntity postUserComment(@RequestBody @Valid PortfolioCommentDto.Post postDto) {
        portfolioCommentService.createPortfolioComment(postDto);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PatchMapping("/{portfolioComment_id}")
    @ResponseStatus(HttpStatus.OK)
    public PortfolioCommentDto.Response patchUserComment(@PathVariable("portfolioComment_id") @Positive Long portfolioCommentId,
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
        return portfolioCommentService.findPortfolioCommentsByPortfolio(portfolioId, page-1, size);
    }

    @DeleteMapping("/{portfolioComment_id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteUserComment(@PathVariable("portfolioComment_id") @Positive Long portfolioCommentId) {
        portfolioCommentService.deletePortfolioComment(portfolioCommentId);
    }
}

package main001.server.domain.portfoliocomment.controller;

import lombok.RequiredArgsConstructor;
import main001.server.domain.portfoliocomment.dto.PortfolioCommentDto;
import main001.server.domain.portfoliocomment.service.PortfolioCommentService;
import org.springframework.http.HttpStatus;
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
    @ResponseStatus(HttpStatus.CREATED)
    public PortfolioCommentDto.Response postUserComment(@RequestBody @Valid PortfolioCommentDto.Post postDto) {
        PortfolioCommentDto.Response response = portfolioCommentService.createPortfolioComment(postDto);
        return response;
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
    public PortfolioCommentDto.ResponseList getUserCommentsByUser(@PathVariable("user_id") @Positive Long userId,
                                                            @RequestParam int page, @RequestParam int size) {
        return portfolioCommentService.findPortfolioCommentsByUser(userId, page - 1, size);
    }

    @GetMapping("portfolios/{portfolio_id}")
    @ResponseStatus(HttpStatus.OK)
    public PortfolioCommentDto.ResponseList getUserCommentsByWriter(@PathVariable("portfolio_id") @Positive Long portfolioId,
                                                              @RequestParam @Positive int page, @RequestParam @Positive int size) {
        return portfolioCommentService.findPortfolioCommentsByPortfolio(portfolioId, page-1, size);
    }

    @DeleteMapping("/{portfolioComment_id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteUserComment(@PathVariable("portfolioComment_id") @Positive Long portfolioCommentId) {
        portfolioCommentService.deletePortfolioComment(portfolioCommentId);
    }
}

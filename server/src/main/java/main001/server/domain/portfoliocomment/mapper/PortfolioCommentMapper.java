package main001.server.domain.portfoliocomment.mapper;

import main001.server.domain.portfolio.entity.Portfolio;
import main001.server.domain.portfoliocomment.dto.PortfolioCommentDto;
import main001.server.domain.portfoliocomment.entity.PortfolioComment;
import main001.server.domain.user.entity.User;
import org.springframework.stereotype.Component;

@Component
public class PortfolioCommentMapper {

    public PortfolioComment postToEntity(PortfolioCommentDto.Post postDto) {
        if(postDto==null) {
            return null;
        }

        PortfolioComment portfolioComment = new PortfolioComment();
        portfolioComment.setContent(postDto.getContent());

        User user = new User();
        user.setUserId(postDto.getUserId());
        portfolioComment.setUser(user);

        Portfolio portfolio = new Portfolio();
        portfolio.setPortfolioId(postDto.getPortfolioId());
        portfolioComment.setPortfolio(portfolio);

        return portfolioComment;
    }

    public PortfolioComment patchToEntity(PortfolioCommentDto.Patch patchDto) {
        if(patchDto==null) {
            return null;
        }

        PortfolioComment portfolioComment = new PortfolioComment();

        portfolioComment.setPortfolioCommentId(patchDto.getPortfolioCommentId());
        portfolioComment.setContent(patchDto.getContent());

        User user = new User();
        user.setUserId(patchDto.getUserId());
        portfolioComment.setUser(user);

        Portfolio portfolio = new Portfolio();
        portfolio.setPortfolioId(patchDto.getPortfolioId());
        portfolioComment.setPortfolio(portfolio);

        return portfolioComment;

    }

    public PortfolioCommentDto.Response entityToResponse(PortfolioComment portfolioComment) {
        PortfolioCommentDto.Response response = new PortfolioCommentDto.Response(
                portfolioComment.getPortfolioCommentId(),
                portfolioComment.getContent(),
                portfolioComment.getUser().getUserId(),
                portfolioComment.getUser().getName(),
                portfolioComment.getUser().getProfileImg(),
                portfolioComment.getPortfolio().getPortfolioId(),
                portfolioComment.getCreatedAt(),
                portfolioComment.getUpdatedAt()
        );
        return response;
    }
}

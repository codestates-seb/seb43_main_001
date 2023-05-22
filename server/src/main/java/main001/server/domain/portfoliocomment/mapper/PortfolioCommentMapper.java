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

        if(postDto.getParentCommentId()==null) {
            portfolioComment.setParentComment(null);
        }
        else {
            PortfolioComment parentComment = new PortfolioComment();
            parentComment.setPortfolioCommentId(postDto.getParentCommentId());
            portfolioComment.setParentComment(parentComment);
        }

        return portfolioComment;
    }

    public PortfolioComment patchToEntity(PortfolioCommentDto.Patch patchDto) {
        if(patchDto==null) {
            return null;
        }

        PortfolioComment portfolioComment = new PortfolioComment();

        portfolioComment.setPortfolioCommentId(patchDto.getPortfolioCommentId());
        portfolioComment.setContent(patchDto.getContent());

        return portfolioComment;

    }

    public PortfolioCommentDto.Response entityToResponse(PortfolioComment portfolioComment) {

        return PortfolioCommentDto.Response.builder()
                .portfolioCommentId(portfolioComment.getPortfolioCommentId())
                .userId(portfolioComment.getUser().getUserId())
                .userName(portfolioComment.getUser().getName())
                .userProfileImg(portfolioComment.getUser().getProfileImg())
                .portfolioId(portfolioComment.getPortfolio().getPortfolioId())
                .parentId(portfolioComment.getParentComment()==null ?
                        null:portfolioComment.getParentComment().getPortfolioCommentId())
                .createdAt(portfolioComment.getCreatedAt())
                .updatedAt(portfolioComment.getUpdatedAt())
                .auth(portfolioComment.getUser().isAuth())
                .build();

    }
}

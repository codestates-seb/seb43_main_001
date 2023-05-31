package main001.server.domain.portfoliocomment.mapper;

import main001.server.domain.portfolio.entity.Portfolio;
import main001.server.domain.portfoliocomment.dto.PortfolioCommentDto;
import main001.server.domain.portfoliocomment.entity.PortfolioComment;
import main001.server.domain.user.entity.User;
import main001.server.domain.utils.CurrentUserIdFinder;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;

@Component
public class PortfolioCommentMapper {

    public PortfolioComment postToEntity(PortfolioCommentDto.Post postDto) {
        if(postDto==null) {
            return null;
        }

        PortfolioComment portfolioComment = new PortfolioComment();
        portfolioComment.setContent(postDto.getContent());

//        portfolioComment.setDepth(postDto.getDepth());

        User user = new User();
        user.setUserId(postDto.getUserId());
        portfolioComment.setUser(user);

        Portfolio portfolio = new Portfolio();
        portfolio.setPortfolioId(postDto.getPortfolioId());
        portfolioComment.setPortfolio(portfolio);

//        if(postDto.getParentCommentId()==null) {
//            portfolioComment.setParentComment(null);
//        }
//        else {
//            PortfolioComment parentComment = new PortfolioComment();
//            parentComment.setPortfolioCommentId(postDto.getParentCommentId());
//            portfolioComment.setParentComment(parentComment);
//        }

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

        PortfolioCommentDto.Response response =  PortfolioCommentDto.Response.builder()
                .portfolioCommentId(portfolioComment.getPortfolioCommentId())
                .content(portfolioComment.getContent())
                .userId(portfolioComment.getUser().getUserId())
                .userName(portfolioComment.getUser().getName())
                .userProfileImg(portfolioComment.getUser().getProfileImg())
                .portfolioId(portfolioComment.getPortfolio().getPortfolioId())
//                .rootId(portfolioComment.getRootComment()==null ?
//                        null:portfolioComment.getRootComment().getPortfolioCommentId())
//                .parentId(portfolioComment.getParentComment()==null ?
//                        null:portfolioComment.getParentComment().getPortfolioCommentId())
//                .depth(portfolioComment.getDepth())
                .createdAt(portfolioComment.getCreatedAt())
                .updatedAt(portfolioComment.getUpdatedAt())
                .auth(portfolioComment.getUser().isAuth())
                .build();
        Long currentUserId = CurrentUserIdFinder.getCurrentUserId();

        if (currentUserId != null && currentUserId.equals(response.getUserId())) {
            response.setAuth(true);
        }

        return response;
    }
}

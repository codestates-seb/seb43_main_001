package main001.server.domain.portfoliocomment.service;

import lombok.RequiredArgsConstructor;
import main001.server.domain.portfolio.entity.Portfolio;
import main001.server.domain.portfolio.service.PortfolioService;
import main001.server.domain.portfoliocomment.dto.PortfolioCommentDto;
import main001.server.domain.portfoliocomment.entity.PortfolioComment;
import main001.server.domain.portfoliocomment.mapper.PortfolioCommentMapper;
import main001.server.domain.portfoliocomment.repository.PortfolioCommentRepository;
import main001.server.domain.user.entity.User;
import main001.server.domain.user.service.UserService;
import main001.server.domain.utils.CurrentUserIdFinder;
import main001.server.exception.BusinessLogicException;
import main001.server.exception.ExceptionCode;
import main001.server.response.PageInfo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class PortfolioCommentService {

    private final PortfolioCommentMapper portfolioCommentMapper;
    private final PortfolioCommentRepository portfolioCommentRepository;
    private final UserService userService;
    private final PortfolioService portfolioService;

    /**
     * 포트폴리오 댓글을 작성하는 메소드
     * @param postDto
     * @return
     */
    public PortfolioCommentDto.Response createPortfolioComment(PortfolioCommentDto.Post postDto) {
        PortfolioComment portfolioComment = portfolioCommentMapper.postToEntity(postDto);

//        if(postDto.getRootCommentId()==null) {
//            portfolioComment.setRootComment(null);
//        }
//        else {
//            PortfolioComment verifiedRootComment = findVerifiedPortfolioComment(postDto.getRootCommentId());
//            portfolioComment.setRootComment(verifiedRootComment);
//        }
//
//        if(postDto.getParentCommentId()==null) {
//            portfolioComment.setParentComment(null);
//        }
//        else {
//            PortfolioComment verifiedParentComment = findVerifiedPortfolioComment(postDto.getParentCommentId());
//            portfolioComment.setParentComment(verifiedParentComment);
//        }
        PortfolioComment savedComment = portfolioCommentRepository.save(setUserAndPortfolio(portfolioComment));

//        saveCommentRelations(portfolioComment, portfolioComment);

        return portfolioCommentMapper.entityToResponse(savedComment);
    }

//    private void saveCommentRelations(PortfolioComment ancestorComment, PortfolioComment descendantComment) {
//        Deque<PortfolioComment> stack = new ArrayDeque<>();
//        stack.push(ancestorComment);
//
//        while (!stack.isEmpty()) {
//            PortfolioComment currentComment = stack.pop();
//
//            PortfolioCommentRelation relation = new PortfolioCommentRelation();
//            relation.setAncestor(currentComment);
//            relation.setDescendant(descendantComment);
//            relation.setDepth(descendantComment.getDepth()-currentComment.getDepth()); // 부모 댓글의 깊이에 1을 더한 값으로 설정
//
//            relationRepository.save(relation);
//
//            if(currentComment.getParentComment()!=null) {
//                stack.push(currentComment.getParentComment());
//            }
//        }
//    }

    /**
     * 포트폴리오 댓글을 수정하는 메소드
     * @param patchDto
     * @return
     */
    public PortfolioCommentDto.Response updatePortfolioComment(PortfolioCommentDto.Patch patchDto) {
        PortfolioComment portfolioComment = findVerifiedPortfolioComment(patchDto.getPortfolioCommentId());
        Long currentUserId = CurrentUserIdFinder.getCurrentUserId();

        if(!portfolioComment.getUser().getUserId().equals(currentUserId)) {
            throw new BusinessLogicException(ExceptionCode.NO_PERMISSION_EDITING_POST);
        }

        PortfolioComment patch = portfolioCommentMapper.patchToEntity(patchDto);

        portfolioComment.setContent(patch.getContent());

        PortfolioComment savedComment = portfolioCommentRepository.save(portfolioComment);

        return portfolioCommentMapper.entityToResponse(savedComment);
    }

    /**
     * 작성된 포트폴리오 댓글 중 작성된 유저가 같은 댓글만 찾는 메소드
     * @param userId
     * @param page
     * @param size
     * @return
     */
    public PortfolioCommentDto.ResponseList findPortfolioCommentsByWriter(Long userId, int page, int size) {
        User user = userService.findUser(userId);

        Pageable pageable = PageRequest.of(page, size,Sort.by("createdAt").ascending());

        Page<PortfolioCommentDto.Response> portfoliosPage =
                portfolioCommentRepository.findByUser(user,pageable)
                        .map(portfolioCommentMapper::entityToResponse);

        List<PortfolioCommentDto.Response> content = portfoliosPage.getContent();

        return new PortfolioCommentDto.ResponseList(
                content,
                new PageInfo(
                        portfoliosPage.getTotalElements(),
                        portfoliosPage.getTotalPages()
                ));
    }

    public PortfolioCommentDto.ResponseList findPortfolioCommentsByPortfolio(Long portfolioId, int page, int size) {
        Portfolio portfolio = portfolioService.findPortfolio(portfolioId);

        Pageable pageable = PageRequest.of(page,size, Sort.by("createdAt").descending());

        Page<PortfolioCommentDto.Response> portfoliosPage =
                portfolioCommentRepository.findByPortfolio(portfolio,pageable)
                        .map(portfolioCommentMapper::entityToResponse);

        List<PortfolioCommentDto.Response> content = portfoliosPage.getContent();

        return new PortfolioCommentDto.ResponseList(
                content,
                new PageInfo(
                        portfoliosPage.getTotalElements(),
                        portfoliosPage.getTotalPages()
                ));
    }

    public void deletePortfolioComment(Long portfolioCommentId) {
        PortfolioComment portfolioComment = findVerifiedPortfolioComment(portfolioCommentId);

//        List<PortfolioComment> commentsToDelete = relationRepository.findAllByAncestor(portfolioComment);
//
//        for(PortfolioComment comment : commentsToDelete) {
//            relationRepository.deleteByAncestor(comment);
//        }
        portfolioCommentRepository.deleteById(portfolioCommentId);
    }

    private PortfolioComment findVerifiedPortfolioComment(Long portfolioCommentId) {
        Optional<PortfolioComment> optionalPortfolioComment = portfolioCommentRepository.findById(portfolioCommentId);
        return optionalPortfolioComment.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND));
    }

    private PortfolioComment setUserAndPortfolio(PortfolioComment portfolioComment) {
        User user = userService.findUser(portfolioComment.getUser().getUserId());
        Portfolio portfolio = portfolioService.findPortfolio(portfolioComment.getPortfolio().getPortfolioId());
        portfolioComment.setUser(user);
        portfolioComment.setPortfolio(portfolio);

        return portfolioComment;
    }
}

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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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
        PortfolioComment savedComment = portfolioCommentRepository.save(setUserAndPortfolio(portfolioComment));
        return portfolioCommentMapper.entityToResponse(savedComment);
    }

    /**
     * 포트폴리오 댓글을 수정하는 메소드
     * @param patchDto
     * @return
     */
    public PortfolioCommentDto.Response updatePortfolioComment(PortfolioCommentDto.Patch patchDto) {
        findVerifiedPortfolioComment(patchDto.getPortfolioCommentId());
        PortfolioComment portfolioComment = portfolioCommentMapper.patchToEntity(patchDto);
        PortfolioComment savedComment = portfolioCommentRepository.save(setUserAndPortfolio(portfolioComment));
        return portfolioCommentMapper.entityToResponse(savedComment);
    }

    /**
     * 작성된 포트폴리오 댓글 중 작성된 유저가 같은 댓글만 찾는 메소드
     * @param userId
     * @param page
     * @param size
     * @return
     */
    public PortfolioCommentDto.ResponseList findPortfolioCommentsByUser(Long userId, int page, int size) {
        User user = userService.findUser(userId);
        Pageable pageable = PageRequest.of(page, size);
        Page<PortfolioCommentDto.Response> portfoliosPage = portfolioCommentRepository.findByUser(user,pageable).map(portfolioCommentMapper::entityToResponse);
        List<PortfolioCommentDto.Response> content = portfoliosPage.getContent();
        return new PortfolioCommentDto.ResponseList(content,page,size, (int) portfoliosPage.getTotalElements(),portfoliosPage.getTotalPages());
    }

    /**
     * 작성된 포트폴리오 댓글 중 같은 포트폴리오에 작성된 댓글만 찾는 메소드
     * @param portfolioId
     * @param page
     * @param size
     * @return
     */
    public PortfolioCommentDto.ResponseList findPortfolioCommentsByPortfolio(Long portfolioId, int page, int size) {
        Portfolio portfolio = portfolioService.findPortfolio(portfolioId);
        Pageable pageable = PageRequest.of(page,size);
        Page<PortfolioCommentDto.Response> portfoliosPage = portfolioCommentRepository.findByPortfolio(portfolio,pageable).map(portfolioCommentMapper::entityToResponse);
        List<PortfolioCommentDto.Response> content = portfoliosPage.getContent();
        return new PortfolioCommentDto.ResponseList(content,page,size, (int) portfoliosPage.getTotalElements(),portfoliosPage.getTotalPages());
    }

    public void deletePortfolioComment(Long portfolioCommentId) {
        findVerifiedPortfolioComment(portfolioCommentId);
        portfolioCommentRepository.deleteById(portfolioCommentId);
    }

    private PortfolioComment findVerifiedPortfolioComment(Long portfolioCommentId) {
        Optional<PortfolioComment> optionalPortfolioComment = portfolioCommentRepository.findById(portfolioCommentId);
        return optionalPortfolioComment.orElseThrow(() -> new RuntimeException("조회된 댓글이 없습니다."));
    }

    private PortfolioComment setUserAndPortfolio(PortfolioComment portfolioComment) {
        User user = userService.findUser(portfolioComment.getUser().getUserId());
        Portfolio portfolio = portfolioService.findPortfolio(portfolioComment.getPortfolio().getId());
        portfolioComment.setUser(user);
        portfolioComment.setPortfolio(portfolio);

        return portfolioComment;
    }
}

package main001.server.domain.likes.service;

import lombok.RequiredArgsConstructor;
import main001.server.domain.likes.entity.PortfolioLikes;
import main001.server.domain.likes.repository.LikesRepository;
import main001.server.domain.portfolio.entity.Portfolio;
import main001.server.domain.portfolio.service.PortfolioService;
import main001.server.domain.user.entity.User;
import main001.server.domain.user.service.UserService;
import main001.server.exception.BusinessLogicException;
import main001.server.exception.ExceptionCode;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class LikesService {

    private final LikesRepository likesRepository;
    private final UserService userService;
    private final PortfolioService portfolioService;

    public boolean findExistLikes(String token, Long portfolioId) {
        Long userId = userService.findByToken(token);
        Optional<PortfolioLikes> optional = likesRepository.findByUserUserIdAndPortfolioPortfolioId(userId, portfolioId);

        return optional.isPresent();
    }

    public void like(String token, Long portfolioId) {
        if(findExistLikes(token, portfolioId)) {
            throw new BusinessLogicException(ExceptionCode.LIKES_EXIST);
        }
        Long userId = userService.findByToken(token);

        User user = findUser(userId);

        Portfolio portfolio = findPortfolio(portfolioId);

        PortfolioLikes newLikes = new PortfolioLikes();

        newLikes.setUser(user);
        newLikes.setPortfolio(portfolio);

        portfolioService.updateLikes(portfolioId, 1);
    }

    public void unlike(String token, Long portfolioId) {
        if(!findExistLikes(token, portfolioId)) {
            throw new BusinessLogicException(ExceptionCode.LIKES_NOT_EXIST);
        }

        Long userId = userService.findByToken(token);

        portfolioService.updateLikes(portfolioId, -1);

        PortfolioLikes portfolioLikes =
                likesRepository.findByUserUserIdAndPortfolioPortfolioId(userId, portfolioId).get();

        likesRepository.delete(portfolioLikes);
    }

    private Portfolio findPortfolio(Long portfolioId) {
        return portfolioService.findVerifiedPortfolio(portfolioId);
    }

    private User findUser(Long userId) {
        return userService.findVerifiedUser(userId);
    }
}

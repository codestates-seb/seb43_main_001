package main001.server.domain.portfolio.service;

import lombok.RequiredArgsConstructor;
import main001.server.domain.portfolio.entity.Portfolio;
import main001.server.domain.portfolio.repository.PortfolioRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class PortfolioService {
    private final PortfolioRepository portfolioRepository;

    private final static String VIEWCOOKIENAME = "alreadyViewCookie";
    public Portfolio createPortfolio(Portfolio portfolio) {
        return portfolioRepository.save(portfolio);
    }

    public Portfolio updatePortfolio(Portfolio portfolio) {
        Portfolio findPortfolio = findVerifiedPortfolio(portfolio.getId());
        Optional.ofNullable(portfolio.getTitle())
                .ifPresent(title -> findPortfolio.setTitle(title));
        Optional.ofNullable(portfolio.getDescription())
                .ifPresent(description -> findPortfolio.setDescription(description));
        Optional.ofNullable(portfolio.getGitLink())
                .ifPresent(gitLink -> findPortfolio.setGitLink(gitLink));
        Optional.ofNullable(portfolio.getContent())
                .ifPresent(content -> findPortfolio.setContent(content));

        return portfolioRepository.save(findPortfolio);
    }

    public Portfolio findPortfolio(long portfolioId) {
        return findVerifiedPortfolio(portfolioId);
    }

    public List<Portfolio> findPortfolios() {
        return (List<Portfolio>) portfolioRepository.findAll();
    }

    public Page<Portfolio> findAllOrderByViewsDesc(int page, int size, Sort.Direction direction) {
        return portfolioRepository.findAll(PageRequest.of(page, size, Sort.by("views").descending()));
    }

    public Page<Portfolio> findAllOrderByCreatedAtDesc(int page, int size, Sort.Direction direction) {
        return portfolioRepository.findAll(PageRequest.of(page, size, Sort.by("createdTime").descending()));
    }

    public void deletePortfolio(long portfolioId) {
        Portfolio portfolio = findVerifiedPortfolio(portfolioId);
        portfolioRepository.delete(portfolio);
    }

    public Portfolio findVerifiedPortfolio(long portfolioId) {
        Optional<Portfolio> optionalPortfolio = portfolioRepository.findById(portfolioId);
        Portfolio findPortfolio = optionalPortfolio.orElseThrow(EntityNotFoundException::new);
        return findPortfolio;
    }

    public int updateView(long portfolioId, HttpServletRequest request, HttpServletResponse response) {

        Cookie[] cookies = request.getCookies();
        boolean checkCookie = false;
        int result = 0;
        if(cookies != null){
            for (Cookie cookie : cookies)
            {
                // 이미 조회를 한 경우 체크
                if (cookie.getName().equals(VIEWCOOKIENAME+portfolioId)) checkCookie = true;

            }
            if(!checkCookie){
                Cookie newCookie = createCookieForForNotOverlap(portfolioId);
                response.addCookie(newCookie);
                result = portfolioRepository.updateView(portfolioId);
            }
        } else {
            Cookie newCookie = createCookieForForNotOverlap(portfolioId);
            response.addCookie(newCookie);
            result = portfolioRepository.updateView(portfolioId);
        }
        return result;
    }

    /*
     * 조회수 중복 방지를 위한 쿠키 생성 메소드
     * @param cookie
     * @return
     * */
    private Cookie createCookieForForNotOverlap(Long postId) {
        Cookie cookie = new Cookie(VIEWCOOKIENAME+postId, String.valueOf(postId));
        cookie.setComment("조회수 중복 증가 방지 쿠키");	// 쿠키 용도 설명 기재
        cookie.setMaxAge(getRemainSecondForTommorow()); 	// 하루를 준다.
        cookie.setHttpOnly(true);				// 서버에서만 조작 가능
        return cookie;
    }

    // 다음 날 정각까지 남은 시간(초)
    private int getRemainSecondForTommorow() {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime tommorow = LocalDateTime.now().plusDays(1L).truncatedTo(ChronoUnit.DAYS);
        return (int) now.until(tommorow, ChronoUnit.SECONDS);
    }
}

package main001.server.domain.portfolio.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import main001.server.amazon.s3.service.S3Service;
import main001.server.domain.attachment.image.entity.ImageAttachment;
import main001.server.domain.attachment.image.entity.RepresentativeAttachment;
import main001.server.domain.attachment.image.repository.ImageAttachmentRepository;
import main001.server.domain.attachment.image.repository.RepresentativeImageRepository;
import main001.server.domain.portfolio.entity.Portfolio;
import main001.server.domain.portfolio.repository.PortfolioRepository;
import main001.server.domain.skill.entity.PortfolioSkill;
import main001.server.domain.skill.service.SkillService;
import main001.server.domain.user.entity.User;
import main001.server.domain.user.repository.UserRepository;
import main001.server.exception.BusinessLogicException;
import main001.server.exception.ExceptionCode;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.LocalDateTime;

import java.time.temporal.ChronoUnit;
import java.util.*;
import java.util.List;


@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class PortfolioService {
    private final PortfolioRepository portfolioRepository;
    private final UserRepository userRepository;
    private final S3Service s3Service;
    private final RepresentativeImageRepository representativeImageRepository;
    private final ImageAttachmentRepository imageAttachmentRepository;
    private final SkillService skillService;
    private final static String VIEWCOOKIENAME = "alreadyViewCookie";

    public Portfolio createPortfolio(Portfolio portfolio, List<String> skills) throws IOException{
        User user = portfolio.getUser();
        if (user == null) {
            throw new IllegalArgumentException("User cannot be null");
        }

        Long userId = user.getUserId();
        if (userId == null) {
            throw new IllegalArgumentException("User ID cannot be null");
        }
        Optional<User> verifiedUser = userRepository.findById(user.getUserId());
        if (!verifiedUser.isPresent()) {
            throw new BusinessLogicException(ExceptionCode.NO_PERMISSION_CREATING_POST);
        }
        portfolio.setUser(verifiedUser.get());


        Portfolio saved = portfolioRepository.save(portfolio);

        addSkills(saved, skills);

        return saved;
    }

    public Portfolio updatePortfolio(Portfolio portfolio, List<String> skills) {
        Portfolio findPortfolio = findVerifiedPortfolio(portfolio.getPortfolioId());
        User user = portfolio.getUser();
        Optional<User> verifiedUser = userRepository.findById(user.getUserId());
        if (!verifiedUser.isPresent() || !findPortfolio.getUser().getUserId().equals(user.getUserId())) {
            throw new BusinessLogicException(ExceptionCode.NO_PERMISSION_EDITING_POST);
        }
        Optional.ofNullable(portfolio.getTitle())
                .ifPresent(title -> findPortfolio.setTitle(title));
        Optional.ofNullable(portfolio.getDescription())
                .ifPresent(description -> findPortfolio.setDescription(description));
        Optional.ofNullable(portfolio.getGitLink())
                .ifPresent(gitLink -> findPortfolio.setGitLink(gitLink));
        Optional.ofNullable(portfolio.getContent())
                .ifPresent(content -> findPortfolio.setContent(content));

        Portfolio saved = portfolioRepository.save(findPortfolio);
        addSkills(saved, skills);

        return saved;
    }

    public Portfolio findPortfolio(long portfolioId) {
        return findVerifiedPortfolio(portfolioId);
    }

    public List<Portfolio> findPortfolios() {
        return (List<Portfolio>) portfolioRepository.findAll();
    }

//    public Page<Portfolio> findAllOrderByViewsDesc(int page, int size, Sort.Direction direction) {
//        return portfolioRepository.findAll(PageRequest.of(page, size, direction, "views"));
//    }
//
//    public Page<Portfolio> findAllOrderByCreatedAtDesc(int page, int size, Sort.Direction direction) {
//        return portfolioRepository.findAll(PageRequest.of(page, size, direction, "createdAt"));
//    }


    public Page<Portfolio> findAllOrderByViewsDesc(int page, int size) {
        return portfolioRepository.findAll(PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "views")));
    }

    public Page<Portfolio> findAllOrderByCreatedAtDesc(int page, int size) {
        return portfolioRepository.findAll(PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt")));
    }
    public void deletePortfolio(long portfolioId) {
        Portfolio portfolio = findVerifiedPortfolio(portfolioId);
        User user = portfolio.getUser();
        Optional<User> verifiedUser = userRepository.findById(user.getUserId());
        if (!verifiedUser.isPresent() || !portfolio.getUser().getUserId().equals(user.getUserId())) {
            throw new BusinessLogicException(ExceptionCode.NO_PERMISSION_DELETING_POST);
        }
        portfolioRepository.delete(portfolio);
    }

    public Portfolio findVerifiedPortfolio(long portfolioId) {
        Optional<Portfolio> optionalPortfolio = portfolioRepository.findById(portfolioId);
        Portfolio findPortfolio = optionalPortfolio.orElseThrow(
                () -> new BusinessLogicException(ExceptionCode.PORTFOLIO_NOT_FOUND));
        return findPortfolio;
    }

    public String uploadRepresentativeImage(Long portfolioId, MultipartFile image) throws IOException {
        Portfolio findPortfolio = findVerifiedPortfolio(portfolioId);

        String imgUrl = s3Service.uploadFile(image, "images");
        RepresentativeAttachment representativeAttachment = new RepresentativeAttachment(imgUrl);
        representativeAttachment.setPortfolio(findPortfolio);

        findPortfolio.setRepresentativeAttachment(representativeAttachment);
        representativeImageRepository.save(representativeAttachment);

        return imgUrl;
    }

    public List<String> uploadImage(Long portfolioId, List<MultipartFile> images) throws IOException {
        Portfolio findPortfolio = findVerifiedPortfolio(portfolioId);

        List<String> ImgUrls = new ArrayList<>();
        for (MultipartFile image : images) {
            String ImgUrl = s3Service.uploadFile(image, "images");
            ImageAttachment imageAttachment = new ImageAttachment(ImgUrl);
            imageAttachment.setPortfolio(findPortfolio);
            findPortfolio.getImageAttachments().add(imageAttachment);
            imageAttachmentRepository.save(imageAttachment);
            ImgUrls.add(ImgUrl);
        }

        return ImgUrls;
    }

    @Transactional
    public int countView(Long portfolioId, HttpServletRequest request, HttpServletResponse response) {

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
    private Cookie createCookieForForNotOverlap(Long portfolioId) {
        Cookie cookie = new Cookie(VIEWCOOKIENAME+portfolioId, String.valueOf(portfolioId));
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

    public Page<Portfolio> getPortfoliosByUser(Long userId, String sortBy, int page, int size) {
        PageRequest pageable = getPageRequest(page, size, sortBy);

        Page<Portfolio> response = portfolioRepository.findByUserUserId(userId, pageable);

        if(response.getTotalElements()==0) {
            throw new BusinessLogicException(ExceptionCode.PORTFOLIO_NOT_SEARCHED);
        }
        return response;
    }

    public Page<Portfolio> searchPortfolios(int page, int size, String category, String sortBy, String value) {
        PageRequest pageable = getPageRequest(page, size, sortBy);

        Page<Portfolio> response;

        if(category.equals("userName")) {
            response = portfolioRepository.findByUserName(value, pageable);
        } else if (category.equals("title")) {
            response = portfolioRepository.findByTitle(value, pageable);
        } else {
            throw new BusinessLogicException(ExceptionCode.SEARCH_CONDITION_MISMATCH);
        }

        if(response.getTotalElements()==0) {
            throw new BusinessLogicException(ExceptionCode.PORTFOLIO_NOT_SEARCHED);
        }
        return response;
    }

    public void addSkills(Portfolio portfolio, List<String> skills) {
        for(int i = portfolio.getSkills().size()-1; i>=0; i--) {
            portfolio.deleteSkill(portfolio.getSkills().get(i));
        }

        if(skills==null) {
            throw new BusinessLogicException(ExceptionCode.SKILL_NOT_EXIST);
        }

        skills.stream()
                .map(name -> {
                    return PortfolioSkill.createPortfolioSkill(
                            skillService.findByName(name.toUpperCase()));
                })
                .forEach(portfolio::addSkill);
    }

    /**
     * 검색 조건 페이지화 메소드
     */
    private PageRequest getPageRequest(int page, int size, String sortBy) {
        PageRequest pageable;
        if(sortBy.equals("createdAt")) {
            pageable = PageRequest.of(page, size,Sort.by("createdAt").descending());
        } else if (sortBy.equals("views")) {
            pageable = PageRequest.of(page, size,Sort.by("views").descending());
        } else if (sortBy.equals("likes")) {
            pageable = PageRequest.of(page, size,Sort.by("likes").descending());
        } else {
            throw new BusinessLogicException(ExceptionCode.SEARCH_CONDITION_MISMATCH);
        }
        return pageable;
    }

    public void updateLikes(Long portfolioId, int number) {
        Portfolio verifiedPortfolio = findVerifiedPortfolio(portfolioId);

        verifiedPortfolio.setCountLikes(verifiedPortfolio.getCountLikes()+number);

        portfolioRepository.save(verifiedPortfolio);
    }

}

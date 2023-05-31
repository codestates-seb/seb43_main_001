package main001.server.domain.portfolio.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import main001.server.amazon.s3.service.S3Service;
import main001.server.domain.attachment.image.entity.ImageAttachment;
import main001.server.domain.attachment.image.entity.Thumbnail;
import main001.server.domain.attachment.image.repository.ImageAttachmentRepository;
import main001.server.domain.attachment.image.repository.ThumbnailRepository;
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

import java.io.IOException;

import java.util.*;
import java.util.List;


@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class PortfolioService {
    private final PortfolioRepository portfolioRepository;
    private final UserRepository userRepository;
    private final SkillService skillService;
    private final S3Service s3Service;
    private final ThumbnailRepository thumbnailRepository;
    private final String DEFAULT_IMAGE_URL = "https://main001-portfolio.s3.ap-northeast-2.amazonaws.com/default/default.png";

    public Portfolio createPortfolio(Portfolio portfolio, List<String> skills, MultipartFile image) throws IOException{
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

        Thumbnail thumbnail = uploadThumbnail(portfolio, image);
        thumbnailRepository.save(thumbnail);

        Portfolio saved = portfolioRepository.save(portfolio);

        addSkills(saved, skills);

        return saved;
    }

    private Thumbnail uploadThumbnail(Portfolio portfolio, MultipartFile image) throws IOException {
        Thumbnail thumbnail;
        if (image != null && !image.isEmpty()) {
            // 이미지가 첨부된 경우에 대한 처리
            String imgUrl = s3Service.uploadFile(image, "images");
            thumbnail = new Thumbnail(imgUrl);
        } else {
            // 이미지가 첨부되지 않은 경우에 대한 처리
            String defaultImageUrl = DEFAULT_IMAGE_URL;
            thumbnail = new Thumbnail(defaultImageUrl);
        }

        thumbnail.setPortfolio(portfolio);
        portfolio.setThumbnail(thumbnail);
        return thumbnail;
    }

    public String updateThumbnail(MultipartFile image, Long portfolioId) throws IOException {
        Portfolio findPortfolio = findVerifiedPortfolio(portfolioId);
        Thumbnail currentThumbnail = findPortfolio.getThumbnail();

        if (!DEFAULT_IMAGE_URL.equals(currentThumbnail)) {
            s3Service.deleteFile("images", currentThumbnail.getImgUrl());
            thumbnailRepository.delete(currentThumbnail);
        }

        Thumbnail thumbnail = uploadThumbnail(findPortfolio,image);
        thumbnailRepository.save(thumbnail);

        return thumbnail.getImgUrl();
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


//    public Page<Portfolio> findAllOrderByViewsDesc(int page, int size) {
//        return portfolioRepository.findAll(PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "viewCount")));
//    }
//
//    public Page<Portfolio> findAllOrderByCreatedAtDesc(int page, int size) {
//        return portfolioRepository.findAll(PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt")));
//    }
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

    @Transactional
    public void increaseViewCount(Long portfolioId) {
        Portfolio portfolio = findVerifiedPortfolio(portfolioId);
        portfolio.updateViewCount();
        portfolioRepository.save(portfolio);
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

        if(value.equals("")) {
            return portfolioRepository.findAll(pageable);
        }

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
                            skillService.findById(name.replace(" ","").toUpperCase()));
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
            pageable = PageRequest.of(page, size,Sort.by("viewCount").descending());
        } else if (sortBy.equals("likes")) {
            pageable = PageRequest.of(page, size,Sort.by("likesCount").descending());
        } else {
            throw new BusinessLogicException(ExceptionCode.SEARCH_CONDITION_MISMATCH);
        }
        return pageable;
    }

    public void updateLikes(Long portfolioId, int number) {
        Portfolio verifiedPortfolio = findVerifiedPortfolio(portfolioId);

        verifiedPortfolio.setLikesCount(verifiedPortfolio.getLikesCount()+number);

        portfolioRepository.save(verifiedPortfolio);
    }

}

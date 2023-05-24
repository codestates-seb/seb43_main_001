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
    private final S3Service s3Service;
    private final RepresentativeImageRepository representativeImageRepository;
    private final ImageAttachmentRepository imageAttachmentRepository;
    private final SkillService skillService;

    private final String DEFAULT_IMAGE_URL = "https://main001-portfolio.s3.ap-northeast-2.amazonaws.com/default/default.png";
    private final static String VIEWCOOKIENAME = "alreadyViewCookie";

    public Portfolio createPortfolio(Portfolio portfolio, List<String> skills, MultipartFile representativeImg) throws IOException{
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

        List<PortfolioSkill> portfolioSkillList = skillService.createPortfolioSkillList(skills);
        for(PortfolioSkill ps : portfolioSkillList) {
            portfolio.addSkill(ps);
        }

        RepresentativeAttachment attachment = uploadThumbnail(portfolio, representativeImg);
        representativeImageRepository.save(attachment);

        return portfolioRepository.save(portfolio);
    }

    private RepresentativeAttachment uploadThumbnail(Portfolio portfolio, MultipartFile representativeImg) throws IOException {
        RepresentativeAttachment attachment;
        if (representativeImg != null && !representativeImg.isEmpty()) {
            // 이미지가 첨부된 경우에 대한 처리
            String representativeImgUrl = s3Service.uploadFile(representativeImg, "images");
            attachment = new RepresentativeAttachment(representativeImgUrl);
        } else {
            // 이미지가 첨부되지 않은 경우에 대한 처리
            String defaultImageUrl = DEFAULT_IMAGE_URL;
            attachment = new RepresentativeAttachment(defaultImageUrl);
        }
        attachment.setPortfolio(portfolio);
        portfolio.setRepresentativeAttachment(attachment);
        return attachment;
    }

    public Portfolio updatePortfolio(Portfolio portfolio, Long portfolioId,  List<String> skills, MultipartFile representativeImg) throws IOException{
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


        if (representativeImg != null && representativeImg.getSize() > 0) {
            updateRepresentativeImage(portfolioId, representativeImg);
        } else {
            updateRepresentativeImage(portfolioId, null);
        }

        findPortfolio.clearSkills();

        List<PortfolioSkill> portfolioSkillList = skillService.createPortfolioSkillList(skills);
        for(PortfolioSkill ps : portfolioSkillList) {
            findPortfolio.addSkill(ps);
        }

        return portfolioRepository.save(findPortfolio);
    }

    public Portfolio findPortfolio(long portfolioId) {
        return findVerifiedPortfolio(portfolioId);
    }

    public List<Portfolio> findPortfolios() {
        return (List<Portfolio>) portfolioRepository.findAll();
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


    public void updateRepresentativeImage(Long portfolioId, MultipartFile representativeImg) throws IOException {
        Portfolio portfolio = findPortfolio(portfolioId);
        RepresentativeAttachment currentImageAttachment = portfolio.getRepresentativeAttachment();

        // 현재 첨부된 대표 이미지 파일을 삭제
        if (currentImageAttachment != null) {
            // s3에서 이미지 파일 삭제
            s3Service.deleteFile(currentImageAttachment.getRepresentativeImgUrl());
            // 포트폴리오에서 이미지 첨부 파일 삭제
            portfolio.setRepresentativeAttachment(null);
            representativeImageRepository.delete(currentImageAttachment);
        }

        representativeImageRepository.save(uploadThumbnail(portfolio, representativeImg));

    }


    public List<String> uploadImage(List<MultipartFile> images) throws IOException {
        List<String> ImgUrls = new ArrayList<>();
        for (MultipartFile image : images) {
            String ImgUrl = s3Service.uploadFile(image, "images");
            ImageAttachment imageAttachment = new ImageAttachment(ImgUrl);
            imageAttachmentRepository.save(imageAttachment);
            ImgUrls.add(ImgUrl);
        }
        return ImgUrls;
    }

    public void deleteImage(Long imgId) {
        Optional<ImageAttachment> imageAttachmentOptional = imageAttachmentRepository.findById(imgId);
        imageAttachmentOptional.ifPresent(imageAttachment -> {
            imageAttachmentRepository.delete(imageAttachment);
            s3Service.deleteFile(imageAttachment.getImgUrl());
        });
    }

    public List<String> getImageUrlList() {
        List<ImageAttachment> imageList = imageAttachmentRepository.findAll();
        List<String> imageUrlList = new ArrayList<>();

        for (ImageAttachment imageAttachment : imageList) {
            imageUrlList.add(imageAttachment.getImgUrl());
        }

        return imageUrlList;
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
        } else if (category.equals("skill")) {
            response = portfolioRepository.findBySkillName(value,pageable);
        } else {
            throw new BusinessLogicException(ExceptionCode.SEARCH_CONDITION_MISMATCH);
        }

        if(response.getTotalElements()==0) {
            throw new BusinessLogicException(ExceptionCode.PORTFOLIO_NOT_SEARCHED);
        }
        return response;
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

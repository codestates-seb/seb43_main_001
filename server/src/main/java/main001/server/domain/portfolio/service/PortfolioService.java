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

        if(representativeImg != null) {
            String representativeImgUrl = s3Service.uploadFile(representativeImg, "images");
            RepresentativeAttachment representativeAttachment = new RepresentativeAttachment(representativeImgUrl);
            representativeAttachment.setPortfolio(portfolio);

            portfolio.setRepresentativeAttachment(representativeAttachment);

            representativeImageRepository.save(representativeAttachment);
        }

        Portfolio saved = portfolioRepository.save(portfolio);

        addSkills(saved, skills);

        return saved;
    }

    public Portfolio updatePortfolio(Portfolio portfolio,Long portfolioId,  List<String> skills, MultipartFile representativeImg) throws IOException{
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
        }  else {
            updateRepresentativeImage(portfolioId, null);
        }

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
        return portfolioRepository.findAll(PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "viewCount")));
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

        // 새로운 대표 이미지 파일 첨부
        if (representativeImg != null && representativeImg.getSize() > 0) {
            String imgUrl = s3Service.uploadFile(representativeImg, "images");
            RepresentativeAttachment newImageAttachment = new RepresentativeAttachment(imgUrl);
            newImageAttachment.setPortfolio(portfolio);

            portfolio.setRepresentativeAttachment(newImageAttachment);
            representativeImageRepository.save(newImageAttachment);
        }
    }
//
//    @Transactional
//    public void updateImage(Long portfolioId, List<MultipartFile> images) throws IOException {
//        Portfolio portfolio = findPortfolio(portfolioId);
//        List<ImageAttachment> currentImageAttachments = portfolio.getImageAttachments();
//
//        // 기존 이미지 파일 첨부를 삭제
//        if (!CollectionUtils.isNullOrEmpty(currentImageAttachments)) {
//            Iterator<ImageAttachment> iterator = currentImageAttachments.iterator();
//            while (iterator.hasNext()) {
//                ImageAttachment imageAttachment = iterator.next();
//                // s3에서 이미지 파일 삭제
//                s3Service.deleteFile(imageAttachment.getImgUrl());
//                // 포트폴리오에서 이미지 첨부 파일 삭제
//                iterator.remove();
//                imageAttachmentRepository.delete(imageAttachment);
//            }
//        }
//
//
//        // 새로운 이미지 파일을 첨부
//        if (!CollectionUtils.isNullOrEmpty(images)) {
//            for (MultipartFile image : images) {
//                String imgUrl = s3Service.uploadFile(image, "images");
//                ImageAttachment newImageAttachment = new ImageAttachment(imgUrl);
//                newImageAttachment.setPortfolio(portfolio);
//
//                portfolio.getImageAttachments().add(newImageAttachment);
//                imageAttachmentRepository.save(newImageAttachment);
//            }
//        }
//    }


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
            pageable = PageRequest.of(page, size,Sort.by("countLikes").descending());
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

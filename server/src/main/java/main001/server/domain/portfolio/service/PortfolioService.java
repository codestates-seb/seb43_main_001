package main001.server.domain.portfolio.service;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.kms.model.NotFoundException;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.GetObjectRequest;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.services.s3.model.S3ObjectInputStream;
import com.amazonaws.util.CollectionUtils;
import com.amazonaws.util.IOUtils;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import main001.server.amazon.s3.service.S3Service;
import main001.server.domain.attachment.file.entity.FileAttachment;
import main001.server.domain.attachment.file.repository.FileAttachmentRepository;
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
import main001.server.domain.user.service.UserService;
import main001.server.exception.BusinessLogicException;
import main001.server.exception.ExceptionCode;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.EntityNotFoundException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.awt.*;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;

import java.time.temporal.ChronoUnit;
import java.util.*;
import java.util.Arrays;
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
    private final FileAttachmentRepository fileAttachmentRepository;
    private final UserService userService;
    private final SkillService skillService;
    private final static String VIEWCOOKIENAME = "alreadyViewCookie";
    public Portfolio createPortfolio(Portfolio portfolio, MultipartFile representativeImg,List<MultipartFile> images, List<MultipartFile> files) throws IOException{
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



        if (!CollectionUtils.isNullOrEmpty(images)) {
            for (MultipartFile image : images) {
                String imgUrl = s3Service.uploadFile(image, "images");
                ImageAttachment imageAttachment = new ImageAttachment(imgUrl);
                imageAttachment.setPortfolio(portfolio);

                portfolio.getImageAttachments().add(imageAttachment);
                imageAttachmentRepository.save(imageAttachment);

            }
        }

        if (!CollectionUtils.isNullOrEmpty(files)) {
            for (MultipartFile file : files) {
                String fileUrl = s3Service.uploadFile(file, "files");
                FileAttachment fileAttachment = new FileAttachment(fileUrl);
                fileAttachment.setPortfolio(portfolio);

                portfolio.getFileAttachments().add(fileAttachment);
                fileAttachmentRepository.save(fileAttachment);
            }
        }

        return portfolioRepository.save(portfolio);
    }

    public Portfolio updatePortfolio(Portfolio portfolio, Long portfolioId,MultipartFile representativeImg, List<MultipartFile> images, List<MultipartFile> files) throws IOException{
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

        if (representativeImg != null && !representativeImg.isEmpty()) {
            updateRepresentativeImage(portfolioId, representativeImg);
        }

        if (images != null && !images.isEmpty()) {
            updateImage(portfolioId, images);
        }

        if (files != null && !files.isEmpty()) {
            updateFile(portfolioId, files);
        }

        return portfolioRepository.save(findPortfolio);
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
        Portfolio findPortfolio = optionalPortfolio.orElseThrow(EntityNotFoundException::new);
        return findPortfolio;
    }


    public void updateRepresentativeImage(Long portfolioId, MultipartFile representativeImg) throws IOException {
        Portfolio portfolio = findPortfolio(portfolioId);
        RepresentativeAttachment currentImageAttachment = portfolio.getRepresentativeAttachment();

        // 현재 첨부된 대표 이미지 파일을 삭제
        if (currentImageAttachment != null) {
            // Delete existing image from S3
            s3Service.deleteFile(currentImageAttachment.getRepresentativeImgUrl());
            // Remove the existing representative image attachment from the portfolio
            portfolio.setRepresentativeAttachment(null);
            representativeImageRepository.delete(currentImageAttachment);
        }

        // 새로운 대표 이미지 파일 첨부
        if (representativeImg != null) {
            String imgUrl = s3Service.uploadFile(representativeImg, "images");
            RepresentativeAttachment newImageAttachment = new RepresentativeAttachment(imgUrl);
            newImageAttachment.setPortfolio(portfolio);

            portfolio.setRepresentativeAttachment(newImageAttachment);
            representativeImageRepository.save(newImageAttachment);
        }
    }

    @Transactional
    public void updateImage(Long portfolioId, List<MultipartFile> images) throws IOException {
        Portfolio portfolio = findPortfolio(portfolioId);
        List<ImageAttachment> currentImageAttachments = portfolio.getImageAttachments();

        // 기존 이미지 파일 첨부를 삭제
        if (!CollectionUtils.isNullOrEmpty(currentImageAttachments)) {
            Iterator<ImageAttachment> iterator = currentImageAttachments.iterator();
            while (iterator.hasNext()) {
                ImageAttachment imageAttachment = iterator.next();
                // s3에서 이미지 파일 삭제
                s3Service.deleteFile(imageAttachment.getImgUrl());
                // 포트폴리오에서 이미지 첨부 파일 삭제
                iterator.remove();
                imageAttachmentRepository.delete(imageAttachment);
            }
        }

        // 새로운 이미지 파일을 첨부
        if (!CollectionUtils.isNullOrEmpty(images)) {
            for (MultipartFile image : images) {
                String imgUrl = s3Service.uploadFile(image, "images");
                ImageAttachment newImageAttachment = new ImageAttachment(imgUrl);
                newImageAttachment.setPortfolio(portfolio);

                portfolio.getImageAttachments().add(newImageAttachment);
                imageAttachmentRepository.save(newImageAttachment);
            }
        }
    }


    public void updateFile(Long portfolioId, List<MultipartFile> files) throws IOException {
        Portfolio portfolio = findPortfolio(portfolioId);
        List<FileAttachment> currentFileAttachments = portfolio.getFileAttachments();

        // 기존 첨부 파일을 삭제
        if (!CollectionUtils.isNullOrEmpty(currentFileAttachments)) {
            Iterator<FileAttachment> iterator = currentFileAttachments.iterator();
            while (iterator.hasNext()) {
                FileAttachment fileAttachment = iterator.next();
                // s3에서 파일 삭제
                s3Service.deleteFile(fileAttachment.getFileUrl());
                // 포트폴리오에서 첨부 파일 삭제
                iterator.remove();
                fileAttachmentRepository.delete(fileAttachment);
            }
        }

        // 새로운 첨부 파일을 첨부
        if (!CollectionUtils.isNullOrEmpty(files)) {
            for (MultipartFile file : files) {
                String fileUrl = s3Service.uploadFile(file, "files");
                FileAttachment newFileAttachment = new FileAttachment(fileUrl);
                newFileAttachment.setPortfolio(portfolio);

                portfolio.getFileAttachments().add(newFileAttachment);
                fileAttachmentRepository.save(newFileAttachment);
            }
        }
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

    public void addSkills(Portfolio portfolio, String skills) {
        portfolio.getSkills().forEach(PortfolioSkill::deletePortfolioSkill);

        portfolio.getSkills().clear();

        Arrays.asList(skills.split(","))
                .stream()
                .map(name -> {
                    return PortfolioSkill.createPortfolioSkill(
                            skillService.findByName(name.toUpperCase()));
                })
                .forEach(portfolio::addSkill);
    }


}

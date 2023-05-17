package main001.server.domain.portfolio.service;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.GetObjectRequest;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.services.s3.model.S3ObjectInputStream;
import com.amazonaws.util.CollectionUtils;
import com.amazonaws.util.IOUtils;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import main001.server.amazon.s3.service.S3Service;
import main001.server.domain.attachment.file.entity.FileAttachment;
import main001.server.domain.attachment.file.repository.FileAttachmentRepository;
import main001.server.domain.attachment.image.entity.ImageAttachment;
import main001.server.domain.attachment.image.repository.ImageAttachmentRepository;
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
import java.lang.reflect.Type;
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
    private final Gson gson;
    private final S3Service s3Service;

    private final ImageAttachmentRepository imageAttachmentRepository;
    private final FileAttachmentRepository fileAttachmentRepository;
    private final UserService userService;
    private final SkillService skillService;
    private final static String VIEWCOOKIENAME = "alreadyViewCookie";

    public Portfolio createPortfolio(Portfolio portfolio, List<String> skills, List<MultipartFile> images, List<MultipartFile> files) throws IOException{
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

        addSkills(portfolio, skills);

        return portfolioRepository.save(portfolio);
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

        addSkills(portfolio, skills);

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

    public void updateImage(Long portfolioId, List<MultipartFile> images) throws IOException{
        Portfolio portfolio = findPortfolio(portfolioId);
        List<ImageAttachment> currentImageAttachments = portfolio.getImageAttachments();
        currentImageAttachments.clear();
        imageAttachmentRepository.deleteAll(currentImageAttachments);

        if (!CollectionUtils.isNullOrEmpty(images)) {
            for (MultipartFile image : images) {
                String imgUrl = s3Service.uploadFile(image, "images");
                ImageAttachment imageAttachment = new ImageAttachment(imgUrl);
                imageAttachment.setPortfolio(portfolio);

                portfolio.getImageAttachments().add(imageAttachment);
                imageAttachmentRepository.save(imageAttachment);

            }
        }
    }

    public void updateFile(Long portfolioId, List<MultipartFile> files) throws IOException{
        Portfolio portfolio = findPortfolio(portfolioId);

        // 기존 파일 첨부 리스트 삭제
        List<FileAttachment> currentFileAttachments = portfolio.getFileAttachments();
        currentFileAttachments.clear();
        fileAttachmentRepository.deleteAll(currentFileAttachments);

        if (!CollectionUtils.isNullOrEmpty(files)) {
            for (MultipartFile file : files) {
                String fileUrl = s3Service.uploadFile(file, "files");
                FileAttachment fileAttachment = new FileAttachment(fileUrl);
                fileAttachment.setPortfolio(portfolio);

                portfolio.getFileAttachments().add(fileAttachment);
                fileAttachmentRepository.save(fileAttachment);
            }
        }
    }

    public void deleteImage(List<String> urlList) {
        for (String url : urlList) {
            String originalFileName = url.split("amazonaws.com/")[1];
            s3Service.removeS3File(originalFileName);
            imageAttachmentRepository.delete(imageAttachmentRepository.findByImgUrl(url));
        }
    }

    public void deleteFile(List<String> urlList) {
        for (String url : urlList) {
            String originalFileName = url.split("amazonaws.com/")[1];
            s3Service.removeS3File(originalFileName);
            fileAttachmentRepository.delete(fileAttachmentRepository.findByFileUrl(url));
        }
    }

    @Transactional
    public int updateView(Long portfolioId, HttpServletRequest request, HttpServletResponse response) {

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

    public void addSkills(Portfolio portfolio, List<String> skills) {
        portfolio.getSkills().forEach(PortfolioSkill::deletePortfolioSkill);

        portfolio.getSkills().clear();

        skills.stream()
                .map(name -> {
                    return PortfolioSkill.createPortfolioSkill(
                            skillService.findByName(name));
                })
                .forEach(portfolio::addSkill);
    }


}

package main001.server.domain.user.service;

import lombok.RequiredArgsConstructor;
import main001.server.amazon.s3.service.S3Service;
import main001.server.domain.attachment.image.entity.ProfileImgAttachment;
import main001.server.domain.attachment.image.repository.ProfileImgRepository;
import main001.server.domain.skill.service.SkillService;
import main001.server.domain.user.entity.User;
import main001.server.domain.user.repository.UserRepository;
import main001.server.exception.BusinessLogicException;
import main001.server.exception.ExceptionCode;
import main001.server.security.jwt.JwtTokenizer;
import main001.server.security.service.SecurityService;
import main001.server.security.service.SecurityServiceImpl;
import main001.server.security.utils.CustomAuthorityUtils;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class UserService {
    private final JwtTokenizer jwtTokenizer;
    private final UserRepository userRepository;
//    private final PasswordEncoder passwordEncoder; // Security 적용 후 사용
//
    private final CustomAuthorityUtils authorityUtils;

    private final ProfileImgRepository profileImgRepository;

    private final S3Service s3Service;

    private final SecurityService securityService;

    public User createUser(User user) {
        verifyExistEmail(user.getEmail());

//        /**
//         * 암호화된 비밀번호 설정
//         */
//        String encryptedPassword = passwordEncoder.encode(user.getPassword());
//        user.setPassword(encryptedPassword);
//

        /**
         * 초기 권한 부여 설정
         */
        List<String> roles = authorityUtils.createRoles(user.getEmail());
        user.setRoles(roles);

        User savedUser = userRepository.save(user);
        return savedUser;
    }

    public User findUser(long userId) {
        return findVerifiedUser(userId);
    }

    public Page<User> findUsers(int page, int size) {
        return userRepository.findAll(PageRequest.of(page, size,
                Sort.by("userId").descending()));
    }

    /**
     * 유저 정보 수정 기능 : 수정 가능한 정보 등 논의 필요
     */
    @Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.SERIALIZABLE)
    public User updateUser(User user) {
        User findUser = findVerifiedUser(user.getUserId());

        Optional.ofNullable(user.getName()).ifPresent(name -> findUser.setName(name));
        Optional.ofNullable(user.getProfileImg()).ifPresent(profileImg -> findUser.setProfileImg(profileImg));
        Optional.ofNullable(user.getGitLink()).ifPresent(gitLink -> findUser.setGitLink(gitLink));
        Optional.ofNullable(user.getBlogLink()).ifPresent(blogLink -> findUser.setBlogLink(blogLink));
        Optional.ofNullable(user.getJobStatus()).ifPresent(jobStatus -> findUser.setJobStatus(jobStatus));
        Optional.ofNullable(user.getAbout()).ifPresent(about -> findUser.setAbout(about));

        User saved = userRepository.save(findUser);

//        addSkills(saved, skills);

        return saved;
    }

    /**
     * 유저 탈퇴 기능 : 구현관련 논의 필요
     */
    public void deleteUser(long userId) {
        User findUser = findVerifiedUser(userId);

        securityService.deleteRefreshToken(userId);

        userRepository.delete(findUser);
    }

    /**
     * User관련 검증 기능
     */
    private void verifyExistEmail(String email) {
        Optional<User> user = userRepository.findByEmail(email);
        if(user.isPresent())
            throw new BusinessLogicException(ExceptionCode.USER_EXISTS);
    }

    public User findVerifiedUser(long userId) {
        Optional<User> optionalUser = userRepository.findById(userId);
        User findUser = optionalUser.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.USER_NOT_FOUND));
        return findUser;
    }

    /**
     * OAuth2.0 로그인시 기존 회원여부 확인시 사용
     */
    public boolean isExistOAuth2User(String oauthId) {
        Optional<User> optionalUser = userRepository.findByOauthId(oauthId);
        return optionalUser.isPresent();
    }

    public User findExistOAuth2User(String oauthId) {
        Optional<User> optionalUser = userRepository.findByOauthId(oauthId);
        User findUser = optionalUser.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.USER_NOT_FOUND));
        return findUser;
    }

    /**
     * User 조회 기능
     */
    public Long getUserId(String email) {
        Optional<User> optionalUser = userRepository.findByEmail(email);
        User findUser = optionalUser.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.USER_NOT_FOUND));

        return findUser.getUserId();
    }

    /**
     * AddEmail 기능
     */
    @Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.SERIALIZABLE)
    public User updateEmail(User user) {
        User findUser = findVerifiedUser(user.getUserId());

        Optional.ofNullable(user.getName()).ifPresent(name -> findUser.setName(name));

        return userRepository.save(findUser);
    }

    /**
     * ProfileImg 업로드 기능
     */
    public String uploadProfileImg(MultipartFile profileImg, Long userId) throws IOException {
        User findUser = findVerifiedUser(userId);

        String profileImgUrl = s3Service.uploadFile(profileImg, "images");
        ProfileImgAttachment profileImgAttachment = new ProfileImgAttachment(profileImgUrl);
        profileImgAttachment.setUser(findUser);

        findUser.setProfileImgAttachment(profileImgAttachment);

        profileImgRepository.save(profileImgAttachment);

        return profileImgUrl;

    }

    public Long findByToken(String token) {
        return jwtTokenizer.getUserId(token);
    }
//    public void addSkills(User user,List<String> skills) {
//        for(int i = user.getSkills().size()-1; i>=0; i--) {
//            user.deleteSkill(user.getSkills().get(i));
//        }
//
//        if(skills==null) {
//            throw new BusinessLogicException(ExceptionCode.SKILL_NOT_EXIST);
//        }
//
//        skills.stream()
//                .map(name -> {
//                    UserSkill userSkill = UserSkill.createUserSkill(
//                            skillService.findByName(name)
//                    );
//                    return userSkill;
//                })
//                .forEach(user::addSkill);
//    }
}
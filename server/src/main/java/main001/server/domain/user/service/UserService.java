package main001.server.domain.user.service;

import lombok.RequiredArgsConstructor;
import main001.server.domain.user.entity.User;
import main001.server.domain.user.repository.UserRepository;
import main001.server.exception.BusinessLogicException;
import main001.server.exception.ExceptionCode;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class UserService {

    private final UserRepository userRepository;

//    private final PasswordEncoder passwordEncoder; // Security 적용 후 사용
//
//    private final CustomAuthorityUtils authorityUtils;  // Security 적용 후 사용

    public User createUser(User user) {
        verifyExistEmail(user.getEmail());

//        /**
//         * 암호화된 비밀번호 설정
//         */
//        String encryptedPassword = passwordEncoder.encode(user.getPassword());
//        user.setPassword(encryptedPassword);
//
//        /**
//         * 초기 권한 부여 설정
//         */
//        List<String> roles = authorityUtils.createRoles(user.getEmail());

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
        Optional.ofNullable(user.getGrade()).ifPresent(grade -> findUser.setGrade(grade));
        Optional.ofNullable(user.getUserStatus()).ifPresent(userStatus -> findUser.setUserStatus(userStatus));
        Optional.ofNullable(user.getJobStatus()).ifPresent(jobStatus -> findUser.setJobStatus(jobStatus));
        Optional.ofNullable(user.getRoles()).ifPresent(roles -> findUser.setRoles(roles));
        Optional.ofNullable(user.getAbout()).ifPresent(about -> findUser.setAbout(about));

        return userRepository.save(findUser);
    }

    /**
     * 유저 탈퇴 기능 : 구현관련 논의 필요
     */
    public void deleteUser(long userId) {
        User findUser = findVerifiedUser(userId);

        userRepository.delete(findUser);
    }

    private void verifyExistEmail(String email) {
        Optional<User> user = userRepository.findByEmail(email);
        if(user.isPresent())
            throw new BusinessLogicException(ExceptionCode.USER_EXISTS);
    }

    private User findVerifiedUser(long userId) {
        Optional<User> otionalUser = userRepository.findById(userId);
        User findUser = otionalUser.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.USER_NOT_FOUND));
        return findUser;
    }
}

package main001.server.domain.usercomment.service;

import lombok.RequiredArgsConstructor;
import main001.server.domain.user.entity.User;
import main001.server.domain.user.service.UserService;
import main001.server.domain.usercomment.dto.UserCommentDto;
import main001.server.domain.usercomment.entity.UserComment;
import main001.server.domain.usercomment.mapper.UserCommentMapper;
import main001.server.domain.usercomment.repository.UserCommentRepository;
import main001.server.response.PageInfo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class UserCommentService {

    private final UserCommentMapper userCommentMapper;
    private final UserCommentRepository userCommentRepository;
    private final UserService userService;

    /**
     * 유저댓글을 작성하는 메소드
     *
     * @param postDto
     * @return
     */
    public UserCommentDto.Response createUserComment(UserCommentDto.Post postDto) {
        UserComment userComment = userCommentMapper.postToEntity(postDto);

        UserComment savedComment = userCommentRepository.save(setUserAndWriter(userComment));

        return userCommentMapper.entityToResponse(savedComment);
    }

    public UserCommentDto.Response updateUserComment(UserCommentDto.Patch patchDto) {
        findVerifiedUserComment(patchDto.getUserCommentId());

        UserComment userComment = userCommentMapper.patchToEntity(patchDto);

        UserComment savedComment = userCommentRepository.save(setUserAndWriter(userComment));

        return userCommentMapper.entityToResponse(savedComment);
    }

    public UserCommentDto.ResponseList findUserCommentsByUser(Long userId, int page, int size) {
        User user = userService.findUser(userId);

        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());

        Page<UserCommentDto.Response> usersPage = userCommentRepository
                .findByUser(user,pageable)
                .map(userCommentMapper::entityToResponse);

        List<UserCommentDto.Response> content = usersPage.getContent();

        return new UserCommentDto.ResponseList(
                content,
                new PageInfo(
                        usersPage.getTotalElements(),
                        usersPage.getTotalPages()
                )
        );
    }

    public UserCommentDto.ResponseList findUserCommentsByWriter(Long writerId, int page, int size) {
        User writer = userService.findUser(writerId);

        Pageable pageable = PageRequest.of(page,size);

        Page<UserCommentDto.Response> writersPage = userCommentRepository
                .findByWriter(writer,pageable)
                .map(userCommentMapper::entityToResponse);

        List<UserCommentDto.Response> content = writersPage.getContent();

        return new UserCommentDto.ResponseList(
                content,
                new PageInfo(
                        writersPage.getTotalElements(),
                        writersPage.getTotalPages())
        );
    }

    public void deleteUserComment(Long userCommentId) {
        findVerifiedUserComment(userCommentId);
        userCommentRepository.deleteById(userCommentId);
    }


    public UserComment findVerifiedUserComment(Long userCommentId) {
        Optional<UserComment> optionalUserComment = userCommentRepository.findById(userCommentId);

        return optionalUserComment.orElseThrow(
                () -> new RuntimeException("조회된 댓글이 없습니다.")
        );
    }

    private UserComment setUserAndWriter(UserComment userComment) {
        User user = userService.findUser(userComment.getUser().getUserId());

        User writer = userService.findUser(userComment.getWriter().getUserId());

        userComment.setUser(user);

        userComment.setWriter(writer);

        return userComment;
    }
}

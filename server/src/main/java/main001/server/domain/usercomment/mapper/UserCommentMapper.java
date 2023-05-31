package main001.server.domain.usercomment.mapper;

import main001.server.domain.user.entity.User;
import main001.server.domain.usercomment.dto.UserCommentDto;
import main001.server.domain.usercomment.entity.UserComment;
import main001.server.domain.utils.CurrentUserIdFinder;
import org.springframework.stereotype.Component;

@Component
public class UserCommentMapper {

    public UserComment postToEntity(UserCommentDto.Post postDto) {
        if(postDto==null) {
            return null;
        }

        UserComment userComment = new UserComment();
        userComment.setContent(postDto.getContent());

        User user = new User();
        user.setUserId(postDto.getUserId());
        userComment.setUser(user);

        User writer = new User();
        writer.setUserId(postDto.getWriterId());
        userComment.setWriter(writer);

        userComment.setUserCommentStatus(postDto.getUserCommentStatus());

        return userComment;
    }

    public UserComment patchToEntity(UserCommentDto.Patch patchDto) {
        if(patchDto==null) {
            return null;
        }

        UserComment userComment = new UserComment();

        userComment.setUserCommentId(patchDto.getUserCommentId());
        userComment.setContent(patchDto.getContent());

        User user = new User();
        user.setUserId(patchDto.getUserId());
        userComment.setUser(user);

        User writer = new User();
        writer.setUserId(patchDto.getWriterId());
        userComment.setWriter(writer);

        return userComment;

    }

    public UserCommentDto.Response entityToResponse(UserComment userComment) {
        UserCommentDto.Response response = UserCommentDto.Response.builder()
                .userCommentId(userComment.getUserCommentId())
                .userId(userComment.getUser().getUserId())
                .writerId(userComment.getWriter().getUserId())
                .writerName(userComment.getWriter().getName())
                .writerProfileImg(userComment.getWriter().getProfileImg())
                .content(userComment.getContent())
                .status(userComment.getUserCommentStatus())
                .createdAt(userComment.getCreatedAt())
                .updatedAt(userComment.getUpdatedAt())
                .isAuth(userComment.getUser().isAuth())
                .build();

        Long currentUserId = CurrentUserIdFinder.getCurrentUserId();

        if (currentUserId != null && currentUserId.equals(response.getWriterId())) {
            response.setAuth(true);
        }
        if(currentUserId != null &&
                (currentUserId.equals(response.getUserId()) || currentUserId.equals(response.getWriterId()))) {
            response.setDeletable(true);
        } else {
            response.setDeletable(false);
        }

        return response;
    }
}

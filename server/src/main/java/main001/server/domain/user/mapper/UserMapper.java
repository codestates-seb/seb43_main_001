package main001.server.domain.user.mapper;

import main001.server.domain.user.dto.UserDto;
import main001.server.domain.user.entity.User;
import main001.server.domain.utils.CurrentUserIdFinder;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.WARN)
public interface UserMapper {

//    @Mapping(target = "skills", ignore = true)
    User userPostToUser(UserDto.Post requestBody);

//    @Mapping(target = "skills", ignore = true)
    User userPatchToUser(UserDto.Patch requestBody);

    User userPatchEmailToUser(UserDto.PatchEmail requestBody);

    default UserDto.Response userToUserResponse(User user, HttpServletRequest request) {

        if (user == null) {
            return null;
        }
        Long currentUserId = CurrentUserIdFinder.getCurrentUserId(request);

        UserDto.Response response = UserDto.Response.builder()
                .userId(user.getUserId())
                .email(user.getEmail())
                .name(user.getName())
                .userStatus(user.getUserStatus())
                .isAuth(user.isAuth())
                .createdAt(user.getCreatedAt())
                .updatedAt(user.getUpdatedAt())
                .build();
        if (currentUserId != null && currentUserId.equals(user.getUserId())) {
            response.setAuth(true);
        }

        return response;
    }

    default UserDto.UserProfileResponse userToUserProfileResponse(User user, HttpServletRequest request) {
        if(user  == null) {
            return null;
        }

        Long currentUserId = CurrentUserIdFinder.getCurrentUserId(request);

        UserDto.UserProfileResponse response = UserDto.UserProfileResponse.builder()
                .userId(user.getUserId())
                .email(user.getEmail())
                .name(user.getName())
                .profileImg(user.getProfileImg())
                .gitLink( user.getGitLink())
                .blogLink( user.getBlogLink())
                .grade( user.getGrade())
                .jobStatus( user.getJobStatus())
                .about( user.getAbout())
                .createdAt(user.getCreatedAt())
                .updatedAt(user.getUpdatedAt())
                .isAuth(user.isAuth())
                .build();
        if (currentUserId != null && currentUserId.equals(user.getUserId())) {
            response.setAuth(true);
        }

        return response;

    }

    default List<UserDto.Response> usersToUserResponses(List<User> users, HttpServletRequest request) {
        Long currentUserId = CurrentUserIdFinder.getCurrentUserId(request);
        if ( users == null ) {
            return null;
        }

        List<UserDto.Response> list = new ArrayList<>( users.size() );
        users.forEach(u -> {
            UserDto.Response response = userToUserResponse(u, request);
            if (u.getUserId().equals(currentUserId)) {
                response.setAuth(true);
            }
            list.add(response);
        });

        return list;
    }
}

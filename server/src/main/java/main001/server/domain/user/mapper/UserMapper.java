package main001.server.domain.user.mapper;

import main001.server.domain.portfolio.entity.Portfolio;
import main001.server.domain.user.dto.UserDto;
import main001.server.domain.user.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.WARN)
public interface UserMapper {

    User userPostToUser(UserDto.Post requestBody);

    User userPatchToUser(UserDto.Patch requestBody);

    User userPatchEmailToUser(UserDto.PatchEmail requestBody);

    default UserDto.Response userToUserResponse(User user) {
        if (user == null) {
            return null;
        }
        return UserDto.Response.builder()
                .userId(user.getUserId())
                .email(user.getEmail())
                .name(user.getName())
                .userStatus(user.getUserStatus())
                .isAuth(user.isAuth())
                .createdAt(user.getCreatedAt())
                .updatedAt(user.getUpdatedAt())
                .build();
    }

    default UserDto.UserProfileResponse userToUserProfileResponse(User user) {
        if(user  == null) {
            return null;
        }
        return UserDto.UserProfileResponse.builder()
                .userId(user.getUserId())
                .email(user.getEmail())
                .name(user.getName())
                .profileImg(user.getProfileImg())
                .gitLink( user.getGitLink())
                .blogLink( user.getBlogLink())
                .grade( user.getGrade())
                .jobStatus( user.getJobStatus())
                .about( user.getAbout())
                .isAuth(user.isAuth())
                .createdAt(user.getCreatedAt())
                .updatedAt(user.getUpdatedAt())
                .build();

    }

    List<UserDto.Response> usersToUserResponses(List<User> users);

    List<UserDto.UserPortfolioResponse> userPortfolioToUserResponses(List<Portfolio> userPortfolios);
}

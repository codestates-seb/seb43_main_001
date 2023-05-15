package main001.server.domain.user.mapper;

import main001.server.domain.portfolio.entity.Portfolio;
import main001.server.domain.user.dto.UserDto;
import main001.server.domain.user.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.WARN)
public interface UserMapper {

    @Mapping(target = "skills", ignore = true)
    User userPostToUser(UserDto.Post requestBody);

    @Mapping(target = "skills", ignore = true)
    User userPatchToUser(UserDto.Patch requestBody);

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
                .skills(user.getSkills().stream()
                        .map(userSkill -> userSkill.getSkill().getName())
                        .collect(Collectors.toList()))
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

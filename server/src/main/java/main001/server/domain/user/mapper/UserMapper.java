package main001.server.domain.user.mapper;

import main001.server.domain.portfolio.entity.Portfolio;
import main001.server.domain.skill.entity.UserSkill;
import main001.server.domain.user.dto.UserDto;
import main001.server.domain.user.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.WARN)
public interface UserMapper {

    @Mapping(target = "skills", ignore = true)
    User userPostToUser(UserDto.Post requestBody);
    @Mapping(target = "skills", ignore = true)
    User userPatchToUser(UserDto.Patch requestBody);
    default UserDto.Response userToUserResponse(User user) {
        if ( user == null ) {
            return null;
        }

        UserDto.Response.ResponseBuilder response = UserDto.Response.builder();

        if ( user.getUserId() != null ) {
            response.userId( user.getUserId() );
        }
        response.email( user.getEmail() );
        response.name( user.getName() );
        response.profileImg( user.getProfileImg() );
        response.gitLink( user.getGitLink() );
        response.blogLink( user.getBlogLink() );
        List<UserSkill> list = user.getSkills();
        if ( list != null ) {
            List<String> result = new ArrayList<>(list.size());
            list.stream().map(userSkill -> userSkill.getSkill().getName()).forEach(result::add);
            response.skills(result);
        }
        response.grade( user.getGrade() );
        response.userStatus( user.getUserStatus() );
        response.jobStatus( user.getJobStatus() );
        response.about( user.getAbout() );
        response.createdAt( user.getCreatedAt() );
        response.updatedAt( user.getUpdatedAt() );

        return response.build();
    };
    List<UserDto.Response> usersToUserResponses(List<User> users);
    List<UserDto.UserPortfolioResponse> userPortfolioToUserResponses(List<Portfolio> userPortfolios);
}

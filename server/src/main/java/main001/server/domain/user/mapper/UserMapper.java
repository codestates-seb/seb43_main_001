package main001.server.domain.user.mapper;

import main001.server.domain.user.dto.UserDto;
import main001.server.domain.user.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.WARN)
public interface UserMapper {

    User userPostToUser(UserDto.Post requestBody);
    User userPatchToUser(UserDto.Patch requestBody);
    UserDto.Response userToUserResponse(User user);
    List<UserDto.Response> usersToUserResponses(List<User> users);
}

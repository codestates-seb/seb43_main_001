package main001.server.domain.user.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import main001.server.domain.portfolio.entity.Portfolio;
import main001.server.response.MultiResponseDto;
import main001.server.response.SingleResponseDto;
import main001.server.domain.user.dto.UserDto;
import main001.server.domain.user.entity.User;
import main001.server.domain.user.mapper.UserMapper;
import main001.server.domain.user.service.UserService;
import main001.server.domain.user.utils.UriCreator;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/users")
@Validated
@Slf4j
public class UserController {

    private final static String USER_DEFAULT_URL = "/users";
    private final UserService userService;
    private final UserMapper mapper;

    @PostMapping("/signup")
    public ResponseEntity join(@Valid @RequestBody UserDto.Post requestBody) {
        User user = mapper.userPostToUser(requestBody);

        User createdUser = userService.createUser(user);

        userService.addSkills(createdUser, requestBody.getSkills());

        URI location = UriCreator.createUri(USER_DEFAULT_URL, createdUser.getUserId());

        return ResponseEntity.created(location).build();
    }

    @GetMapping("/login") // 로그인 폼을 요청하는 메서드
    public String loginForm() {
        return "login";
    }

    // Todo : Login 관련 기능 구현

    @GetMapping("/{user-id}")
    public ResponseEntity getUser(@PathVariable("user-id") @Positive long userId) {
        User user = userService.findUser(userId);
        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.userToUserResponse(user)), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getUsers(@Positive @RequestParam(value = "page",defaultValue = "1") int page,
                                   @Positive @RequestParam(value = "size",defaultValue = "15") int size) {
        Page<User> pageUsers = userService.findUsers(page - 1, size);
        List<User> users = pageUsers.getContent();
        return new ResponseEntity<>(
                new MultiResponseDto<>(mapper.usersToUserResponses(users), pageUsers), HttpStatus.OK
        );
    }

    @GetMapping("/{user-id}/profile")
    public ResponseEntity getUserProfile(@PathVariable("user-id") @Positive long userId) {
        User user = userService.findUser(userId);
        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.userToUserProfileResponse(user)), HttpStatus.OK
        );
    }
    @GetMapping("/{user-id}/portfolio")
    public ResponseEntity getUserPortfolios(@PathVariable("user-id") @Positive long userId,
                                            @Positive @RequestParam(value = "page", defaultValue = "1") int page,
                                            @Positive @RequestParam(value = "size", defaultValue = "15") int size,
                                            @RequestParam(value = "order", defaultValue = "desc") String order,
                                            @RequestParam(value = "sort", defaultValue = "createdAt") String sort) {
        Sort.Direction direction = order.equals("asc") ? Sort.Direction.ASC : Sort.Direction.DESC;
                Page<Portfolio> pageUserPortfolios = userService.findPortfolioByUser(userId, page - 1, size, direction, sort);

        List<Portfolio> userPortfolios = pageUserPortfolios.getContent();
        return new ResponseEntity<>(
                new MultiResponseDto<>(mapper.userPortfolioToUserResponses(userPortfolios), pageUserPortfolios), HttpStatus.OK
        );
    }

    @PatchMapping("/{user-id}")
    public ResponseEntity patchUser(
            @PathVariable("user-id") @Positive long userId,
            @Valid @RequestBody UserDto.Patch requestBody) {
        requestBody.setUserId(userId);

        User user = userService.updateUser(mapper.userPatchToUser(requestBody));

        userService.addSkills(user, requestBody.getSkills());

        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.userToUserProfileResponse(user)), HttpStatus.OK);
    }

    @DeleteMapping("/{user-id}")
    public ResponseEntity deleteUser(
            @PathVariable("user-id") @Positive long userId) {
        userService.deleteUser(userId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}

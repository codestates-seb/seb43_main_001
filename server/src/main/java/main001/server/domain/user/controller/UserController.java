package main001.server.domain.user.controller;

import com.nimbusds.oauth2.sdk.ErrorResponse;
import io.jsonwebtoken.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import io.swagger.v3.oas.annotations.headers.Header;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import main001.server.domain.utils.AuthValidator;
import main001.server.domain.utils.CurrentUserIdFinder;
import main001.server.domain.utils.OAuth2UserValidator;
import main001.server.exception.BusinessLogicException;
import main001.server.exception.ExceptionCode;
import main001.server.response.MultiResponseDto;
import main001.server.response.SingleResponseDto;
import main001.server.domain.user.dto.UserDto;
import main001.server.domain.user.entity.User;
import main001.server.domain.user.mapper.UserMapper;
import main001.server.domain.user.service.UserService;
import main001.server.domain.user.utils.UriCreator;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.criteria.CriteriaBuilder;
import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.io.IOException;
import java.net.URI;
import java.util.*;

import static org.aspectj.runtime.internal.Conversions.intValue;

@RestController
@RequiredArgsConstructor
@RequestMapping("/users")
@Validated
@Slf4j
public class UserController {

    private final static String USER_DEFAULT_URL = "/users";
    private final UserService userService;
    private final UserMapper mapper;

    @Getter
    @Value("${jwt.secret-key}")
    private String secretKey;

    @Operation(
            summary = "회원 정보를 입력하고 회원 가입",
            responses = {
                    @ApiResponse(
                            responseCode = "201",
                            description = "성공적으로 회원가입",
                            headers = {
                                    @Header(
                                    name = "location",
                                    description = "해당 유저에 접근할 수 있는 URI")},
                            content = @Content(mediaType = "application/json")),
                    @ApiResponse(
                            responseCode = "409",
                            description = "이미 존재하는 이메일입니다")}
    )
    @PostMapping("/signup")
    public ResponseEntity join(@Valid @RequestBody UserDto.Post requestBody) {
        User user = mapper.userPostToUser(requestBody);

        User createdUser = userService.createUser(user);

        URI location = UriCreator.createUri(USER_DEFAULT_URL, createdUser.getUserId());

        return ResponseEntity.created(location).build();
    }

    @Operation(
            summary = "user-id로 회원 기본 정보 조회",
            parameters = {
                    @Parameter(
                            name = "유저 id",
                            description = "유저의 고유한 식별 번호",
                            in = ParameterIn.PATH,
                            required = true)
            },
            responses = {
                    @ApiResponse(
                            responseCode = "200",
                            description = "정상적으로 유저의 기본 정보 조회",
                            content = {
                                    @Content(
                                            mediaType = "application/json",
                                            schema = @Schema(implementation = UserDto.Response.class))
                            }),
                    @ApiResponse(
                            responseCode = "404",
                            description = "회원 정보를 찾을 수 없습니다."),
            }
    )
    @GetMapping("/{user-id}")
    public ResponseEntity<UserDto.Response> getUser(@PathVariable("user-id") @Positive long userId, HttpServletRequest request) {

        User findUser = userService.findUser(userId);
        if (CurrentUserIdFinder.getCurrentUserId(request) == userId) {
            findUser.setAuth(true);
        }

        UserDto.Response response = mapper.userToUserResponse(findUser);
        response.setAuth(findUser.isAuth());

        return new ResponseEntity(new SingleResponseDto<>(response), HttpStatus.OK);
    }

    @Operation(hidden = true)
    @GetMapping
    public ResponseEntity getUsers(@Positive @RequestParam(value = "page",defaultValue = "1") int page,
                                   @Positive @RequestParam(value = "size",defaultValue = "15") int size,
                                   HttpServletRequest request) {
        Page<User> pageUsers = userService.findUsers(page - 1, size);
        List<User> users = pageUsers.getContent();

        List<UserDto.Response> responses = new ArrayList<>(users.size());
        users.forEach(u -> {
            if (u.getUserId().equals(CurrentUserIdFinder.getCurrentUserId(request))) {
                u.setAuth(true);
            }
                UserDto.Response response = mapper.userToUserResponse(u);
                response.setAuth(u.isAuth());
                responses.add(response);
        });

        return new ResponseEntity<>(
                new MultiResponseDto<>(mapper.usersToUserResponses(users), pageUsers), HttpStatus.OK
        );
    }

    @Operation(
            summary = "유저 상세 정보",
            parameters = {
                    @Parameter(
                            name = "유저 id",
                            description = "유저의 고유한 식별 번호",
                            in = ParameterIn.PATH,
                            required = true)
            },
            responses = {
                    @ApiResponse(
                            responseCode = "200",
                            description = "정상적으로 유저의 기본 정보 조회",
                            content = {
                                    @Content(
                                            mediaType = "application/json",
                                            schema = @Schema(implementation = UserDto.Response.class))
                            }),
                    @ApiResponse(
                            responseCode = "404",
                            description = "회원 정보를 찾을 수 없습니다."),
            }
    )
    @GetMapping("/{user-id}/profile")
    public ResponseEntity getUserProfile(@PathVariable("user-id") @Positive long userId, HttpServletRequest request) {

        User findUser = userService.findUser(userId);

        if (CurrentUserIdFinder.getCurrentUserId(request) == userId) {
            findUser.setAuth(true);
        }

        UserDto.UserProfileResponse response = mapper.userToUserProfileResponse(findUser);

        response.setAuth(findUser.isAuth());

        return new ResponseEntity<>(
                new SingleResponseDto<>(response), HttpStatus.OK
        );
    }

    @Operation(
            summary = "유저 상세 정보",
            parameters = {
                    @Parameter(
                            name = "유저 id",
                            description = "유저의 고유한 식별 번호",
                            in = ParameterIn.PATH,
                            required = true)
            },
            responses = {
                    @ApiResponse(
                            responseCode = "200",
                            description = "정상적으로 유저의 기본 정보 수정",
                            content = {
                                    @Content(
                                            mediaType = "application/json",
                                            schema = @Schema(implementation = UserDto.UserProfileResponse.class))
                            }),
                    @ApiResponse(
                            responseCode = "404",
                            description = "user-id가 잘못됐을 경우 : 회원 정보를 찾을 수 없습니다.")
            }
    )
    @PatchMapping("/{user-id}")
    public ResponseEntity patchUser(
            @PathVariable("user-id") @Positive long userId,
            @Valid @RequestBody UserDto.Patch requestBody) {
        requestBody.setUserId(userId);

        User user = userService.updateUser(mapper.userPatchToUser(requestBody));

        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.userToUserProfileResponse(user)), HttpStatus.OK);
    }

    @PostMapping("/{user-id}/profile-img-upload")
    public ResponseEntity uploadProfileImg(@PathVariable("user-id") @Positive long userId,
                                           @RequestPart(value = "profileImg")MultipartFile profileImg) throws IOException {
        String profileImgUrl = userService.uploadProfileImg(profileImg, userId);

        return ResponseEntity.ok(profileImgUrl);
    }

    @Operation(
            summary = "회원 탈퇴",
            description = "회원 정보가 db에서 삭제되며, 회원이 활동한 모든 내용은 즉시 삭제",
            parameters = @Parameter(
                            name = "user-id",
                            description = "유저 고유 식별 번호",
                            required = true,
                            in = ParameterIn.PATH
                    ),
            responses = {
                    @ApiResponse(
                            responseCode = "204",
                            description = "유저 탈퇴 성공"
                    ),
                    @ApiResponse(
                            responseCode = "404",
                            description = "회원 정보를 찾을 수 없습니다.")
            }
    )
    @DeleteMapping("/{user-id}")
    public ResponseEntity deleteUser(
            @PathVariable("user-id") @Positive long userId) {
        userService.deleteUser(userId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}

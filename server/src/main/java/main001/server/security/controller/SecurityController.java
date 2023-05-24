package main001.server.security.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import main001.server.domain.user.dto.UserDto;
import main001.server.domain.user.entity.User;
import main001.server.domain.user.mapper.UserMapper;
import main001.server.domain.user.service.UserService;
import main001.server.domain.utils.CurrentUserIdFinder;
import main001.server.exception.BusinessLogicException;
import main001.server.exception.ExceptionCode;
import main001.server.response.SingleResponseDto;
import main001.server.security.service.SecurityServiceImpl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import javax.validation.constraints.Positive;

@RestController
@RequiredArgsConstructor
@RequestMapping("/")
@Validated
@Slf4j
public class SecurityController {

    private final SecurityServiceImpl securityService;
    private final UserService userService;
    private final UserMapper mapper;

    @PatchMapping("/addemail")
    public ResponseEntity addEmail(@Positive @RequestParam(value = "userId") Long userId,
                                   @Valid @RequestBody UserDto.PatchEmail requestBody) {
        requestBody.setUserId(userId);
        User user = userService.updateEmail(mapper.userPatchEmailToUser(requestBody));

        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.userToUserProfileResponse(user)), HttpStatus.OK);
    }

    @PostMapping("/auth/refresh")
    @ResponseStatus(HttpStatus.OK)
    public void reissueToken(HttpServletRequest request, HttpServletResponse response) {

        Long userId = securityService.verifyToken(request);

        if (userId == null) {
            throw new BusinessLogicException(ExceptionCode.USER_NOT_FOUND);
        }

        String reissuedAccessToken = securityService.reissueAccessToken(userId);
        String reissuedRefreshToken = securityService.reissueRefreshToken(userId);

        response.setHeader("Authorization", reissuedAccessToken);
        response.setHeader("Refresh", reissuedRefreshToken);
    }
}

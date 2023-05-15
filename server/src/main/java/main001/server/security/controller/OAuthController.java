package main001.server.security.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import main001.server.domain.user.dto.UserDto;
import main001.server.domain.user.entity.User;
import main001.server.domain.user.mapper.UserMapper;
import main001.server.domain.user.service.UserService;
import main001.server.response.SingleResponseDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;

@RestController
@RequiredArgsConstructor
@RequestMapping("/")
@Validated
@Slf4j
public class OAuthController {

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
}

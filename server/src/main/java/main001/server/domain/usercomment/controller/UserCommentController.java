package main001.server.domain.usercomment.controller;

import lombok.RequiredArgsConstructor;
import main001.server.domain.usercomment.dto.UserCommentDto;
import main001.server.domain.usercomment.service.UserCommentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;

@RestController
@Validated
@RequiredArgsConstructor
@RequestMapping("/api/usercomments")
public class UserCommentController {

    private final UserCommentService userCommentService;

    @PostMapping
    public ResponseEntity postUserComment(@RequestBody @Valid UserCommentDto.Post postDto) {
        userCommentService.createUserComment(postDto);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PatchMapping("/{userComment_id}")
    @ResponseStatus(HttpStatus.OK)
    public UserCommentDto.Response patchUserComment(@PathVariable("userComment_id") @Positive Long userCommentId,
                                                    @RequestBody @Valid UserCommentDto.Patch patchDto) {
        UserCommentDto.Response response = userCommentService.updateUserComment(patchDto);
        return response;
    }

    @GetMapping("/users/{user_id}")
    @ResponseStatus(HttpStatus.OK)
    public UserCommentDto.ResponseList getUserComments(@PathVariable("user_id") @Positive Long userId,
            @RequestParam int page, @RequestParam int size) {
        return userCommentService.findUserCommentsByUser(userId, page - 1, size);
    }

    @GetMapping("writers/{writers_id}")
    @ResponseStatus(HttpStatus.OK)
    public UserCommentDto.ResponseList getWriterComments(@PathVariable("writers_id") @Positive Long writerId,
                                                         @RequestParam @Positive int page, @RequestParam @Positive int size) {
        return userCommentService.findUserCommentsByWriter(writerId, page-1, size);
    }

    @DeleteMapping("/{userComment_id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteUserComment(@PathVariable("userComment_id") @Positive Long userCommentId) {
        userCommentService.deleteUserComment(userCommentId);
    }
}

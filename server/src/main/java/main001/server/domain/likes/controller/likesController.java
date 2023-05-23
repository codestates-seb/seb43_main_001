package main001.server.domain.likes.controller;

import lombok.RequiredArgsConstructor;
import main001.server.domain.likes.service.LikesService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/portfolios/likes")
@RequiredArgsConstructor
public class likesController {

    private final LikesService likesService;

    @PostMapping("/{portfolio-id}")
    public ResponseEntity<Void> like(
            @RequestHeader(value = "Authorization") String token,
            @PathVariable("portfolio-id") Long portfolioId) {

        likesService.like(token,portfolioId);

        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @DeleteMapping("/{portfolio-id}")
    public ResponseEntity<Void> unlike(
            @RequestHeader(value = "Authorization") String token,
            @PathVariable("portfolio-id") Long portfolioId) {

        likesService.unlike(token,portfolioId);

        return ResponseEntity.status(HttpStatus.OK).build();
    }
}

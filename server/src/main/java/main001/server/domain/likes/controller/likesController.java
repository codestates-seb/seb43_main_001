package main001.server.domain.likes.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import lombok.RequiredArgsConstructor;
import main001.server.domain.likes.service.LikesService;
import main001.server.exception.ExceptionCode;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import java.util.Objects;

@RestController
@RequestMapping("/portfolios/likes")
@RequiredArgsConstructor
public class likesController {

    private final LikesService likesService;

    @PostMapping("/{portfolio-id}")
    public ResponseEntity<Void> like(
            @PathVariable("portfolio-id") Long portfolioId) {

        HttpServletRequest request = ((ServletRequestAttributes) Objects.requireNonNull(RequestContextHolder.getRequestAttributes())).getRequest();
        String token = request.getHeader("Authorization");

        likesService.like(token,portfolioId);

        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @DeleteMapping("/{portfolio-id}")
    public ResponseEntity<Void> unlike(
            @PathVariable("portfolio-id") Long portfolioId) {

        HttpServletRequest request = ((ServletRequestAttributes) Objects.requireNonNull(RequestContextHolder.getRequestAttributes())).getRequest();
        String token = request.getHeader("Authorization");

        likesService.unlike(token,portfolioId);

        return ResponseEntity.status(HttpStatus.OK).build();
    }
}

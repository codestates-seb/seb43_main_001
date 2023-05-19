package main001.server.domain.likes.controller;

import lombok.RequiredArgsConstructor;
import main001.server.domain.likes.service.LikesService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Positive;

@RestController
@RequestMapping("/portfolios/likes")
@RequiredArgsConstructor
public class likesController {

    private final LikesService likesService;

//    @PostMapping("{portfolio-id}")
//    public ResponseEntity<Void> like(@PathVariable Long portfolioId

}

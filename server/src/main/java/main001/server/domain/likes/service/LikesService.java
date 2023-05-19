package main001.server.domain.likes.service;

import lombok.RequiredArgsConstructor;
import main001.server.domain.likes.entity.PortfolioLikes;
import main001.server.domain.likes.repository.LikesRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class LikesService {
//
//    private final LikesRepository likesRepository;
//
//    public boolean isLikes(Long userId, Long portfolioId) {
//        Optional<PortfolioLikes> optionalPortfolioLikes =
////                likesRepository.findBy(userId, portfolioId);
//
////        if(optionalPortfolioLikes.isPresent())  {
//            return true;
//        }
//
////        else return false;
//    }
}

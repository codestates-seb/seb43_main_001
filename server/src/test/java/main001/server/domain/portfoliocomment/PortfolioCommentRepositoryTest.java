package main001.server.domain.portfoliocomment;


import main001.server.domain.portfolio.entity.Portfolio;
import main001.server.domain.portfolio.repository.PortfolioRepository;
import main001.server.domain.portfoliocomment.entity.PortfolioComment;
import main001.server.domain.portfoliocomment.repository.PortfolioCommentRepository;
import main001.server.domain.user.entity.User;
import main001.server.domain.user.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.*;

@DataJpaTest
public class PortfolioCommentRepositoryTest {

    @Autowired
    private PortfolioCommentRepository portfolioCommentRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PortfolioRepository portfolioRepository;

    private User user1 = new User();
    private User user2 = new User();
    private Portfolio portfolio1 =  new Portfolio();
    private Portfolio portfolio2 = new Portfolio();

    @BeforeEach
    void saveUserAndPortFolio() {
        user1.setEmail("test1@gmail.com");
        user1.setName("테스트회원1");
        user1.setGitLink("github.com");
        user1.setBlogLink("blog.com");
        userRepository.save(user1);

        user2.setEmail("test2@gmail.com");
        user2.setName("테스트회원2");
        user2.setGitLink("github2.com");
        user2.setBlogLink("blog2.com");
        userRepository.save(user2);


        portfolio1.setTitle("제목");
        portfolio1.setDescription("짧은 설명");
        portfolioRepository.save(portfolio1);

        portfolio2.setTitle("제목2");
        portfolio2.setDescription("짧은 설명2");
        portfolioRepository.save(portfolio2);
    }


    @Test
    @DisplayName("repository가 null이 아님")
    void repositoryIsNotNull() {
        assertThat(portfolioCommentRepository).isNotNull();
    }

    @Test
    @DisplayName("repository에 댓글 저장하기")
    void saveCommentTest() {
        // given
        PortfolioComment portfolioComment = new PortfolioComment();
        portfolioComment.setContent("1번 댓글");
        portfolioComment.setUser(user1);
        portfolioComment.setPortfolio(portfolio1);

        // when
        PortfolioComment savedComment = portfolioCommentRepository.save(portfolioComment);

        // then
        assertThat(savedComment.getPortfolioCommentId()).isNotNull();
        assertThat(savedComment.getContent()).isEqualTo("1번 댓글");
        assertThat(savedComment.getUser()).isEqualTo(user1);
        assertThat(savedComment.getPortfolio()).isEqualTo(portfolio1);

    }

    @Test
    @DisplayName("유저의 아이디로 작성한 포트폴리오 댓글 모두 찾기")
    void findCommentsByUser() {
        // given

        PortfolioComment portfolioComment1 = new PortfolioComment();
        portfolioComment1.setContent("1번 댓글");
        portfolioComment1.setUser(user1);
        portfolioComment1.setPortfolio(portfolio1);
        portfolioCommentRepository.save(portfolioComment1);

        PortfolioComment portfolioComment2 = new PortfolioComment();
        portfolioComment2.setContent("2번 댓글");
        portfolioComment2.setUser(user1);
        portfolioComment2.setPortfolio(portfolio2);
        portfolioCommentRepository.save(portfolioComment2);

        Pageable pageable = PageRequest.of(0,3);
        // when
        Page<PortfolioComment> byUser = portfolioCommentRepository.findByUser(user1, pageable);
        List<PortfolioComment> contents = byUser.getContent();

        // then
        assertThat(byUser.getTotalElements()).isEqualTo(2);
        assertThat(byUser.getTotalPages()).isEqualTo(1);
        assertThat(contents.size()).isEqualTo(2);
        assertThat(contents.get(0)).isEqualTo(portfolioComment1);
        assertThat(contents.get(1)).isEqualTo(portfolioComment2);
        assertThat(contents.get(0).getUser()).isEqualTo(user1);
        assertThat(contents.get(1).getUser()).isEqualTo(user1);
    }

    @Test
    @DisplayName("하나의 포트폴리오에 작성된 모든 댓글을 유저 id를 기준으로 내림차순 정렬 후 조회")
    void findCommentsByPortfolio() {
        // given
        PortfolioComment portfolioComment1 = new PortfolioComment();
        portfolioComment1.setContent("1번 댓글");
        portfolioComment1.setUser(user1);
        portfolioComment1.setPortfolio(portfolio1);
        portfolioCommentRepository.save(portfolioComment1);

        PortfolioComment portfolioComment2 = new PortfolioComment();
        portfolioComment2.setContent("2번 댓글");
        portfolioComment2.setUser(user2);
        portfolioComment2.setPortfolio(portfolio1);
        portfolioCommentRepository.save(portfolioComment2);

        // when
        Pageable pageable1 = PageRequest.of(0,2, Sort.by(Sort.Direction.DESC,"user.userId"));
        Page<PortfolioComment> byPortfolio = portfolioCommentRepository.findByPortfolio(portfolio1, pageable1);
        List<PortfolioComment> contents = byPortfolio.getContent();

        // then
        assertThat(byPortfolio.getTotalElements()).isEqualTo(2);
        assertThat(byPortfolio.getTotalPages()).isEqualTo(1);
        assertThat(contents.size()).isEqualTo(2);
        assertThat(contents.get(0)).isEqualTo(portfolioComment2);
        assertThat(contents.get(0).getUser()).isEqualTo(user2);
        assertThat(contents.get(0).getPortfolio()).isEqualTo(portfolio1);
        assertThat(contents.get(1)).isEqualTo(portfolioComment1);
        assertThat(contents.get(1).getUser()).isEqualTo(user1);
        assertThat(contents.get(1).getPortfolio()).isEqualTo(portfolio1);
    }

    @Test
    @DisplayName("댓글 삭제 테스트")
    void deleteCommentTest() {
        // given
        PortfolioComment portfolioComment1 = new PortfolioComment();
        portfolioComment1.setContent("1번 댓글");
        portfolioComment1.setUser(user1);
        portfolioComment1.setPortfolio(portfolio1);
        portfolioCommentRepository.save(portfolioComment1);

        // when
        portfolioCommentRepository.deleteById(1L);
        Optional<PortfolioComment> optionalPortfolioComment = portfolioCommentRepository.findById(1L);
        // then

        assertThat(optionalPortfolioComment).isEqualTo(Optional.empty());
    }
}

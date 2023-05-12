//package main001.server.domain.portfoliocomment;
//
//import com.google.gson.Gson;
//import main001.server.domain.portfolio.entity.Portfolio;
//import main001.server.domain.portfolio.service.PortfolioService;
//import main001.server.domain.portfoliocomment.controller.PortfolioCommentController;
//import main001.server.domain.portfoliocomment.dto.PortfolioCommentDto;
//import main001.server.domain.portfoliocomment.entity.PortfolioComment;
//import main001.server.domain.portfoliocomment.service.PortfolioCommentService;
//import main001.server.domain.user.entity.User;
//import main001.server.domain.user.service.UserService;
//import main001.server.response.PageInfo;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.DisplayName;
//import org.junit.jupiter.api.Test;
//import org.mockito.Mockito;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
//import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
//import org.springframework.boot.test.mock.mockito.MockBean;
//import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
//import org.springframework.http.MediaType;
//import org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders;
//import org.springframework.restdocs.payload.JsonFieldType;
//import org.springframework.test.web.servlet.MockMvc;
//import org.springframework.test.web.servlet.ResultActions;
//
//import java.time.LocalDateTime;
//import java.util.ArrayList;
//import java.util.List;
//
//import static org.mockito.Mockito.doNothing;
//import static org.mockito.Mockito.when;
//import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
//import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.patch;
//import static org.springframework.restdocs.operation.preprocess.Preprocessors.*;
//import static org.springframework.restdocs.payload.PayloadDocumentation.*;
//import static org.springframework.restdocs.request.RequestDocumentation.*;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
//
//@WebMvcTest(PortfolioCommentController.class)
//@AutoConfigureRestDocs
//@MockBean(JpaMetamodelMappingContext.class)
//public class PortfolioCommentControllerTest {
//
//    @Autowired
//    MockMvc mockMvc;
//
//    @Autowired
//    Gson gson;
//
//    @MockBean
//    PortfolioCommentService portfolioCommentService;
//
//    private User user1 = new User();
//    private User user2 = new User();
//    private Portfolio portfolio1 =  new Portfolio();
//    private Portfolio portfolio2 = new Portfolio();
//
//    @BeforeEach
//    void createUserAndPortFolio() {
//        user1.setUserId(1L);
//        user1.setEmail("test1@gmail.com");
//        user1.setName("테스트회원1");
//        user1.setGitLink("github.com");
//        user1.setBlogLink("blog.com");
//
//        user2.setUserId(2L);
//        user2.setEmail("test2@gmail.com");
//        user2.setName("테스트회원2");
//        user2.setGitLink("github2.com");
//        user2.setBlogLink("blog2.com");
//
//        portfolio1.setId(1L);
//        portfolio1.setTitle("제목");
//        portfolio1.setDescription("짧은 설명");
//
//        portfolio2.setId(2L);
//        portfolio2.setTitle("제목2");
//        portfolio2.setDescription("짧은 설명2");
//    }
//
//    PortfolioCommentDto.Response response = new PortfolioCommentDto.Response(1L,
//            1L,
//            1L,
//            "1번 댓글",
//            LocalDateTime.now(),
//            LocalDateTime.now());
//
//    PortfolioCommentDto.Response response2 = new PortfolioCommentDto.Response(2L,
//            2L,
//            1L,
//            "테스트회원2",
//            LocalDateTime.now(),
//            LocalDateTime.now());
//
//    PortfolioCommentDto.Response response3 = new PortfolioCommentDto.Response(3L,
//            1L,
//            2L,
//            "1번 댓글",
//            LocalDateTime.now(),
//            LocalDateTime.now());
//
//    @Test
//    @DisplayName("포트폴리오 댓글 post 테스트")
//    void postPortfolioCommentTest() throws Exception {
//        // given
//        PortfolioCommentDto.Post post = new PortfolioCommentDto.Post(1L, 1L, "1번 댓글");
//        String json = gson.toJson(post);
//
//        // when
//        when(portfolioCommentService.createPortfolioComment(Mockito.any(PortfolioCommentDto.Post.class)))
//                .thenReturn(response);
//
//        ResultActions actions = mockMvc.perform(RestDocumentationRequestBuilders.post("/api/portfoliocomments")
//                .accept(MediaType.APPLICATION_JSON)
//                .contentType(MediaType.APPLICATION_JSON)
//                .content(json));
//
//        // then
//        actions.andExpect(status().isCreated())
//                .andExpect(jsonPath("$.portfolioCommentId").value(response.getPortfolioCommentId()))
//                .andExpect(jsonPath("$.content").value(response.getContent()))
//                .andExpect(jsonPath("$.userId").value(response.getUserId()))
//                .andExpect(jsonPath("$.portfolioId").value(response.getPortfolioId()))
//                .andDo(document("PortfolioCommentPostAPI",
//                        preprocessRequest(prettyPrint()),
//                        preprocessResponse(prettyPrint()),
//                        requestFields(
//                            List.of(fieldWithPath("userId").description("회원 식별자"),
//                                    fieldWithPath("portfolioId").description("포트폴리오 식별자"),
//                                    fieldWithPath("content").description("댓글 내용"))
//                        ),
//                        responseFields(
//                                List.of(
//                                        fieldWithPath("portfolioCommentId").type(JsonFieldType.NUMBER).description("댓글 식별자"),
//                                        fieldWithPath("userId").type(JsonFieldType.NUMBER).description("회원 식별자"),
//                                        fieldWithPath("portfolioId").type(JsonFieldType.NUMBER).description("포트폴리오 식별자"),
//                                        fieldWithPath("content").type(JsonFieldType.STRING).description("댓글 식별자"),
//                                        fieldWithPath("createdAt").type(JsonFieldType.STRING).description("댓글 생성 일시"),
//                                        fieldWithPath("updatedAt").type(JsonFieldType.STRING).description("댓글 수정 일시")
//                                )
//                        )));
//    }
//
//    @Test
//    @DisplayName("포트폴리오 댓글 patch 테스트")
//    void patchPortfolioCommentTest() throws Exception {
//        // given
//        PortfolioCommentDto.Patch patch = new PortfolioCommentDto.Patch(1L, 1L, 1L, "1번 수정 댓글");
//        String json = gson.toJson(patch);
//
//        // when
//        when(portfolioCommentService.updatePortfolioComment(Mockito.any(PortfolioCommentDto.Patch.class))).thenReturn(response);
//
//        ResultActions actions = mockMvc.perform(patch("/api/portfoliocomments/{portfoliocomment_id}", 1L)
//                .accept(MediaType.APPLICATION_JSON)
//                .contentType(MediaType.APPLICATION_JSON)
//                .content(json));
//
//        // then
//        actions.andExpect(status().isOk())
//                .andExpect(jsonPath("$.portfolioCommentId").value(response.getPortfolioCommentId()))
//                .andExpect(jsonPath("$.content").value(response.getContent()))
//                .andExpect(jsonPath("$.userId").value(response.getUserId()))
//                .andExpect(jsonPath("$.portfolioId").value(response.getPortfolioId()))
//                .andDo(document("PortfolioCommentPatchAPI",
//                        preprocessRequest(prettyPrint()),
//                        preprocessResponse(prettyPrint()),
//                        pathParameters(
//                                parameterWithName("portfoliocomment_id").description("포트폴리오 댓글 식별자")
//                        ),
//                        requestFields(
//                                List.of(
//                                        fieldWithPath("portfolioCommentId").description("댓글 식별자").ignored(),
//                                        fieldWithPath("userId").description("회원 식별자"),
//                                        fieldWithPath("portfolioId").description("포트폴리오 식별자"),
//                                        fieldWithPath("content").description("댓글 내용"))
//                        ),
//                        responseFields(
//                                List.of(
//                                        fieldWithPath("portfolioCommentId").type(JsonFieldType.NUMBER).description("댓글 식별자"),
//                                        fieldWithPath("userId").type(JsonFieldType.NUMBER).description("회원 식별자"),
//                                        fieldWithPath("portfolioId").type(JsonFieldType.NUMBER).description("포트폴리오 식별자"),
//                                        fieldWithPath("content").type(JsonFieldType.STRING).description("댓글 식별자"),
//                                        fieldWithPath("createdAt").type(JsonFieldType.STRING).description("댓글 생성 일시"),
//                                        fieldWithPath("updatedAt").type(JsonFieldType.STRING).description("댓글 수정 일시")
//                                )
//                        )));
//    }
//
//    @Test
//    @DisplayName("포트폴리오 댓글 delete 테스트")
//    void deletePortfolioCommentTest() throws Exception {
//        //when
//        doNothing().when(portfolioCommentService).deletePortfolioComment(1L);
//
//        ResultActions actions = mockMvc.perform(RestDocumentationRequestBuilders.delete("/api/portfoliocomments/{portfoliocomment_id}", 1L)
//                .accept(MediaType.APPLICATION_JSON));
//        //then
//        actions.andExpect(status().isNoContent())
//                .andDo(document("PortfolioCommentDeleteAPI",
//                        preprocessRequest(prettyPrint()),
//                        pathParameters(
//                                parameterWithName("portfoliocomment_id").description("댓글 식별자")
//                        )));
//    }
//
//    @Test
//    @DisplayName("포트폴리오 댓글 포트폴리오 ID로 조회")
//    void findPortfolioCommentsByPortfolioId() throws Exception {
//        //given
//        List<PortfolioCommentDto.Response> list = new ArrayList<>();
//        list.add(response);
//        list.add(response2);
//
//        PortfolioCommentDto.ResponseList<List<PortfolioCommentDto.Response>> responseList
//                = new PortfolioCommentDto.ResponseList<>(
//                        list,
//                new PageInfo(2,1)
//        );
//
//        //when
//        when(portfolioCommentService.findPortfolioCommentsByPortfolio(Mockito.anyLong(),Mockito.anyInt(),Mockito.anyInt()))
//                .thenReturn(responseList);
//
//        ResultActions actions =
//                mockMvc.perform(RestDocumentationRequestBuilders.get("/api/portfoliocomments/portfolios/{portfolio_id}", 1L)
//                        .param("page","1")
//                        .param("size","2")
//                        .accept(MediaType.APPLICATION_JSON));
//
//        // then
//        actions.andExpect(status().isOk())
//                .andExpect(jsonPath("$.data.[0].portfolioCommentId").value(responseList.getData().get(0).getPortfolioCommentId()))
//                .andExpect(jsonPath("$.data.[0].userId").value(responseList.getData().get(0).getUserId()))
//                .andExpect(jsonPath("$.data.[0].portfolioId").value(responseList.getData().get(0).getPortfolioId()))
//                .andExpect(jsonPath("$.data.[0].content").value(responseList.getData().get(0).getContent()))
//                .andExpect(jsonPath("$.data.[1].portfolioCommentId").value(responseList.getData().get(1).getPortfolioCommentId()))
//                .andExpect(jsonPath("$.data.[1].userId").value(responseList.getData().get(1).getUserId()))
//                .andExpect(jsonPath("$.data.[1].portfolioId").value(responseList.getData().get(1).getPortfolioId()))
//                .andExpect(jsonPath("$.data.[1].content").value(responseList.getData().get(1).getContent()))
//                .andDo(document("PortfolioCommentGetByPortfolioAPI",
//                        preprocessRequest(prettyPrint()),
//                        preprocessResponse(prettyPrint()),
//                        pathParameters(
//                                parameterWithName("portfolio_id").description("포트폴리오 식별자")
//                        ),
//                        requestParameters(
//                                List.of(
//                                        parameterWithName("page").description("현재 페이지"),
//                                        parameterWithName("size").description("페이지 사이즈")
//                                )
//                        ),
//                        responseFields(
//                                List.of(
//                                        fieldWithPath("data").type(JsonFieldType.ARRAY).description("결과 데이터"),
//                                        fieldWithPath("data.[].portfolioCommentId").type(JsonFieldType.NUMBER).description("댓글 식별자"),
//                                        fieldWithPath("data.[].userId").type(JsonFieldType.NUMBER).description("회원 식별자"),
//                                        fieldWithPath("data.[].portfolioId").type(JsonFieldType.NUMBER).description("포트폴리오 식별자"),
//                                        fieldWithPath("data.[].content").type(JsonFieldType.STRING).description("댓글 내용"),
//                                        fieldWithPath("data.[].createdAt").type(JsonFieldType.STRING).description("댓글 생성 시각"),
//                                        fieldWithPath("data.[].updatedAt").type(JsonFieldType.STRING).description("댓글 수정 시각"),
//                                        fieldWithPath("pageInfo.totalElements").type(JsonFieldType.NUMBER).description("전체 댓글 갯수"),
//                                        fieldWithPath("pageInfo.totalPages").type(JsonFieldType.NUMBER).description("전체 페이지 갯수")
//                                )
//                        )));
//    }
//
//    @Test
//    @DisplayName("포트폴리오 댓글 유저 ID로 조회")
//    void findPortfolioCommentsByUserId() throws Exception {
//        //given
//        List<PortfolioCommentDto.Response> list = new ArrayList<>();
//        list.add(response);
//        list.add(response3);
//
//        PortfolioCommentDto.ResponseList<List<PortfolioCommentDto.Response>> responseList
//                = new PortfolioCommentDto.ResponseList<>(
//                        list,
//                new PageInfo(2,1));
//
//        //when
//        when(portfolioCommentService.findPortfolioCommentsByUser(Mockito.anyLong(),Mockito.anyInt(),Mockito.anyInt()))
//                .thenReturn(responseList);
//
//        ResultActions actions =
//                mockMvc.perform(RestDocumentationRequestBuilders.get("/api/portfoliocomments/users/{user_id}", 1L)
//                        .param("page","1")
//                        .param("size","3")
//                        .accept(MediaType.APPLICATION_JSON));
//
//        // then
//        actions.andExpect(status().isOk())
//                .andExpect(jsonPath("$.data.[0].portfolioCommentId").value(responseList.getData().get(0).getPortfolioCommentId()))
//                .andExpect(jsonPath("$.data.[0].userId").value(responseList.getData().get(0).getUserId()))
//                .andExpect(jsonPath("$.data.[0].portfolioId").value(responseList.getData().get(0).getPortfolioId()))
//                .andExpect(jsonPath("$.data.[0].content").value(responseList.getData().get(0).getContent()))
//                .andExpect(jsonPath("$.data.[1].portfolioCommentId").value(responseList.getData().get(1).getPortfolioCommentId()))
//                .andExpect(jsonPath("$.data.[1].userId").value(responseList.getData().get(1).getUserId()))
//                .andExpect(jsonPath("$.data.[1].portfolioId").value(responseList.getData().get(1).getPortfolioId()))
//                .andExpect(jsonPath("$.data.[1].content").value(responseList.getData().get(1).getContent()))
//                .andDo(document("PortfolioCommentGetByUserAPI",
//                        preprocessRequest(prettyPrint()),
//                        preprocessResponse(prettyPrint()),
//                        pathParameters(
//                                parameterWithName("user_id").description("포트폴리오 식별자")
//                        ),
//                        requestParameters(
//                                List.of(
//                                        parameterWithName("page").description("현재 페이지"),
//                                        parameterWithName("size").description("페이지 사이즈")
//                                )
//                        ),
//                        responseFields(
//                                List.of(
//                                        fieldWithPath("data").type(JsonFieldType.ARRAY).description("결과 데이터"),
//                                        fieldWithPath("data.[].portfolioCommentId").type(JsonFieldType.NUMBER).description("댓글 식별자"),
//                                        fieldWithPath("data.[].content").type(JsonFieldType.STRING).description("댓글 내용"),
//                                        fieldWithPath("data.[].userId").type(JsonFieldType.NUMBER).description("회원 식별자"),
//                                        fieldWithPath("data.[].portfolioId").type(JsonFieldType.NUMBER).description("포트폴리오 식별자"),
//                                        fieldWithPath("data.[].createdAt").type(JsonFieldType.STRING).description("댓글 생성 시각"),
//                                        fieldWithPath("data.[].updatedAt").type(JsonFieldType.STRING).description("댓글 수정 시각"),
//                                        fieldWithPath("pageInfo.totalElements").type(JsonFieldType.NUMBER).description("전체 댓글 갯수"),
//                                        fieldWithPath("pageInfo.totalPages").type(JsonFieldType.NUMBER).description("전체 페이지 갯수")
//                                )
//                        )));
//    }
//}

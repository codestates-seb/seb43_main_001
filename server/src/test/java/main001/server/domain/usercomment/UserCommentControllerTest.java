package main001.server.domain.usercomment;

import com.google.gson.Gson;
import main001.server.domain.usercomment.controller.UserCommentController;
import main001.server.domain.usercomment.dto.UserCommentDto;
import main001.server.domain.usercomment.service.UserCommentService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.http.MediaType;
import org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.patch;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.request.RequestDocumentation.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(UserCommentController.class)
@AutoConfigureRestDocs
@MockBean(JpaMetamodelMappingContext.class)
public class UserCommentControllerTest {

    @Autowired
    MockMvc mockMvc;

    @Autowired
    Gson gson;

    @MockBean
    UserCommentService userCommentService;

    UserCommentDto.Response response1 = new UserCommentDto.Response(1L,
            "1번 댓글",
            1L,
            "테스트회원1",
            3L,
            "작성자1",
            LocalDateTime.now(),
            LocalDateTime.now());

    UserCommentDto.Response response2 = new UserCommentDto.Response(2L,
            "2번 댓글",
            2L,
            "테스트회원2",
            3L,
            "작성자1",
            LocalDateTime.now(),
            LocalDateTime.now());

    UserCommentDto.Response response3 = new UserCommentDto.Response(3L,
            "1번 댓글",
            1L,
            "테스트회원1",
            4L,
            "작성자2",
            LocalDateTime.now(),
            LocalDateTime.now());

    @Test
    @DisplayName("유저 댓글 post 테스트")
    void postUserCommentTest() throws Exception {
        // given
        UserCommentDto.Post post = new UserCommentDto.Post(1L, 1L, "1번 댓글");
        String json = gson.toJson(post);

        // when
        when(userCommentService.createUserComment(Mockito.any(UserCommentDto.Post.class)))
                .thenReturn(response1);

        ResultActions actions = mockMvc.perform(RestDocumentationRequestBuilders.post("/api/usercomments")
                .accept(MediaType.APPLICATION_JSON)
                .contentType(MediaType.APPLICATION_JSON)
                .content(json));

        // then
        actions.andExpect(status().isCreated())
                .andExpect(jsonPath("$.userCommentId").value(response1.getUserCommentId()))
                .andExpect(jsonPath("$.content").value(response1.getContent()))
                .andExpect(jsonPath("$.userId").value(response1.getUserId()))
                .andExpect(jsonPath("$.userName").value(response1.getUserName()))
                .andExpect(jsonPath("$.writerId").value(response1.getWriterId()))
                .andExpect(jsonPath("$.writerName").value(response1.getWriterName()))
                .andDo(document("UserCommentPostAPI",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        requestFields(
                            List.of(fieldWithPath("userId").description("댓글이 작성된 유저 식별자"),
                                    fieldWithPath("writerId").description("댓글 작성자 식별자"),
                                    fieldWithPath("content").description("댓글 내용"))
                        ),
                        responseFields(
                                List.of(
                                        fieldWithPath("userCommentId").type(JsonFieldType.NUMBER).description("댓글 식별자"),
                                        fieldWithPath("content").type(JsonFieldType.STRING).description("댓글 식별자"),
                                        fieldWithPath("userId").type(JsonFieldType.NUMBER).description("댓글이 작성된 유저 식별자"),
                                        fieldWithPath("userName").type(JsonFieldType.STRING).description("댓글이 작성된 유저 닉네임"),
                                        fieldWithPath("writerId").type(JsonFieldType.NUMBER).description("댓글 작성자 식별자"),
                                        fieldWithPath("writerName").type(JsonFieldType.STRING).description("댓글 작성자 닉네임"),
                                        fieldWithPath("createdAt").type(JsonFieldType.STRING).description("댓글 생성 일시"),
                                        fieldWithPath("updatedAt").type(JsonFieldType.STRING).description("댓글 수정 일시")
                                )
                        )));
    }

    @Test
    @DisplayName("유저 댓글 patch 테스트")
    void patchUserCommentTest() throws Exception {
        // given
        UserCommentDto.Patch patch = new UserCommentDto.Patch(1L, "1번 수정 댓글", 1L, 2L);
        String json = gson.toJson(patch);

        // when
        when(userCommentService.updateUserComment(Mockito.any(UserCommentDto.Patch.class))).thenReturn(response1);

        ResultActions actions = mockMvc.perform(patch("/api/usercomments/{usercomment_id}", 1L)
                .accept(MediaType.APPLICATION_JSON)
                .contentType(MediaType.APPLICATION_JSON)
                .content(json));

        // then
        actions.andExpect(status().isOk())
                .andExpect(jsonPath("$.userCommentId").value(response1.getUserCommentId()))
                .andExpect(jsonPath("$.content").value(response1.getContent()))
                .andExpect(jsonPath("$.userId").value(response1.getUserId()))
                .andExpect(jsonPath("$.userName").value(response1.getUserName()))
                .andExpect(jsonPath("$.writerId").value(response1.getWriterId()))
                .andExpect(jsonPath("$.writerName").value(response1.getWriterName()))
                .andDo(document("UserCommentPatchAPI",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        pathParameters(
                                parameterWithName("usercomment_id").description("유저 평가 댓글 식별자")
                        ),
                        requestFields(
                                List.of(
                                        fieldWithPath("userCommentId").description("댓글 식별자").ignored(),
                                        fieldWithPath("userId").description("댓글이 작성된 유저 식별자"),
                                        fieldWithPath("writerId").description("댓글 작성자 식별자"),
                                        fieldWithPath("content").description("댓글 내용"))
                        ),
                        responseFields(
                                List.of(
                                        fieldWithPath("userCommentId").type(JsonFieldType.NUMBER).description("댓글 식별자"),
                                        fieldWithPath("content").type(JsonFieldType.STRING).description("댓글 식별자"),
                                        fieldWithPath("userId").type(JsonFieldType.NUMBER).description("댓글이 작성된 유저 식별자"),
                                        fieldWithPath("userName").type(JsonFieldType.STRING).description("댓글이 작성된 유저 닉네임"),
                                        fieldWithPath("writerId").type(JsonFieldType.NUMBER).description("댓글 작성자 식별자"),
                                        fieldWithPath("writerName").type(JsonFieldType.STRING).description("댓글 작성자 닉네임"),
                                        fieldWithPath("createdAt").type(JsonFieldType.STRING).description("댓글 생성 일시"),
                                        fieldWithPath("updatedAt").type(JsonFieldType.STRING).description("댓글 수정 일시")
                                )
                        )));
    }

    @Test
    @DisplayName("유저 댓글 delete 테스트")
    void deleteUserCommentTest() throws Exception {
        //when
        doNothing().when(userCommentService).deleteUserComment(1L);

        ResultActions actions = mockMvc.perform(RestDocumentationRequestBuilders.delete("/api/usercomments/{usercomment_id}", 1L)
                .accept(MediaType.APPLICATION_JSON));
        //then
        actions.andExpect(status().isNoContent())
                .andDo(document("UserCommentDeleteAPI",
                        preprocessRequest(prettyPrint()),
                        pathParameters(
                                parameterWithName("usercomment_id").description("댓글 식별자")
                        )));
    }

    @Test
    @DisplayName("유저 댓글 유저 ID로 조회")
    void findUserCommentsByUserId() throws Exception {
        //given
        List<UserCommentDto.Response> list = new ArrayList<>();
        list.add(response1);
        list.add(response3);

        UserCommentDto.ResponseList<List<UserCommentDto.Response>> responseList
                = new UserCommentDto.ResponseList<>(list,1,2,2,1);

        //when
        when(userCommentService.findUserCommentsByUser(Mockito.anyLong(),Mockito.anyInt(),Mockito.anyInt()))
                .thenReturn(responseList);

        ResultActions actions =
                mockMvc.perform(RestDocumentationRequestBuilders.get("/api/usercomments/users/{user_id}", 1L)
                        .param("page","1")
                        .param("size","2")
                        .accept(MediaType.APPLICATION_JSON));

        // then
        actions.andExpect(status().isOk())
                .andExpect(jsonPath("$.data.[0].userCommentId").value(responseList.getData().get(0).getUserCommentId()))
                .andExpect(jsonPath("$.data.[0].content").value(responseList.getData().get(0).getContent()))
                .andExpect(jsonPath("$.data.[0].userId").value(responseList.getData().get(0).getUserId()))
                .andExpect(jsonPath("$.data.[0].userName").value(responseList.getData().get(0).getUserName()))
                .andExpect(jsonPath("$.data.[0].writerId").value(responseList.getData().get(0).getWriterId()))
                .andExpect(jsonPath("$.data.[0].writerName").value(responseList.getData().get(0).getWriterName()))
                .andExpect(jsonPath("$.data.[1].userCommentId").value(responseList.getData().get(1).getUserCommentId()))
                .andExpect(jsonPath("$.data.[1].content").value(responseList.getData().get(1).getContent()))
                .andExpect(jsonPath("$.data.[1].userId").value(responseList.getData().get(1).getUserId()))
                .andExpect(jsonPath("$.data.[1].userName").value(responseList.getData().get(1).getUserName()))
                .andExpect(jsonPath("$.data.[1].writerId").value(responseList.getData().get(1).getWriterId()))
                .andExpect(jsonPath("$.data.[1].writerName").value(responseList.getData().get(1).getWriterName()))
                .andExpect(jsonPath("$.page").value(responseList.getPage()))
                .andExpect(jsonPath("$.size").value(responseList.getSize()))
                .andExpect(jsonPath("$.totalElements").value(responseList.getTotalElements()))
                .andExpect(jsonPath("$.totalPages").value(responseList.getTotalPages()))
                .andDo(document("UserCommentGetByUserAPI",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        pathParameters(
                                parameterWithName("user_id").description("댓글이 작성된 유저 식별자")
                        ),
                        requestParameters(
                                List.of(
                                        parameterWithName("page").description("현재 페이지"),
                                        parameterWithName("size").description("페이지 사이즈")
                                )
                        ),
                        responseFields(
                                List.of(
                                        fieldWithPath("data").type(JsonFieldType.ARRAY).description("결과 데이터"),
                                        fieldWithPath("data.[].userCommentId").type(JsonFieldType.NUMBER).description("댓글 식별자"),
                                        fieldWithPath("data.[].content").type(JsonFieldType.STRING).description("댓글 내용"),
                                        fieldWithPath("data.[].userId").type(JsonFieldType.NUMBER).description("댓글이 작성된 유저 식별자"),
                                        fieldWithPath("data.[].userName").type(JsonFieldType.STRING).description("댓글이 작성된 유저 닉네임"),
                                        fieldWithPath("data.[].writerId").type(JsonFieldType.NUMBER).description("댓글 작성자 식별자"),
                                        fieldWithPath("data.[].writerName").type(JsonFieldType.STRING).description("댓글 작성자 닉네임"),
                                        fieldWithPath("data.[].createdAt").type(JsonFieldType.STRING).description("댓글 생성 시각"),
                                        fieldWithPath("data.[].updatedAt").type(JsonFieldType.STRING).description("댓글 수정 시각"),
                                        fieldWithPath("page").type(JsonFieldType.NUMBER).description("페이지"),
                                        fieldWithPath("size").type(JsonFieldType.NUMBER).description("페이지 사이즈"),
                                        fieldWithPath("totalElements").type(JsonFieldType.NUMBER).description("전체 댓글 갯수"),
                                        fieldWithPath("totalPages").type(JsonFieldType.NUMBER).description("전체 페이지 갯수")
                                )
                        )));
    }

    @Test
    @DisplayName("유저 댓글 작성자 ID로 조회")
    void findUserCommentsByWriterId() throws Exception {
        //given
        List<UserCommentDto.Response> list = new ArrayList<>();
        list.add(response1);
        list.add(response2);

        UserCommentDto.ResponseList<List<UserCommentDto.Response>> responseList
                = new UserCommentDto.ResponseList<>(list,1,3,2,1);

        //when
        when(userCommentService.findUserCommentsByWriter(Mockito.anyLong(),Mockito.anyInt(),Mockito.anyInt()))
                .thenReturn(responseList);

        ResultActions actions =
                mockMvc.perform(RestDocumentationRequestBuilders.get("/api/usercomments/writers/{writer_id}", 1L)
                        .param("page","1")
                        .param("size","3")
                        .accept(MediaType.APPLICATION_JSON));

        // then
        actions.andExpect(status().isOk())
                .andExpect(jsonPath("$.data.[0].userCommentId").value(responseList.getData().get(0).getUserCommentId()))
                .andExpect(jsonPath("$.data.[0].content").value(responseList.getData().get(0).getContent()))
                .andExpect(jsonPath("$.data.[0].userId").value(responseList.getData().get(0).getUserId()))
                .andExpect(jsonPath("$.data.[0].userName").value(responseList.getData().get(0).getUserName()))
                .andExpect(jsonPath("$.data.[0].writerId").value(responseList.getData().get(0).getWriterId()))
                .andExpect(jsonPath("$.data.[0].writerName").value(responseList.getData().get(0).getWriterName()))
                .andExpect(jsonPath("$.data.[1].userCommentId").value(responseList.getData().get(1).getUserCommentId()))
                .andExpect(jsonPath("$.data.[1].content").value(responseList.getData().get(1).getContent()))
                .andExpect(jsonPath("$.data.[1].userId").value(responseList.getData().get(1).getUserId()))
                .andExpect(jsonPath("$.data.[1].userName").value(responseList.getData().get(1).getUserName()))
                .andExpect(jsonPath("$.data.[1].writerId").value(responseList.getData().get(1).getWriterId()))
                .andExpect(jsonPath("$.data.[1].writerName").value(responseList.getData().get(1).getWriterName()))
                .andExpect(jsonPath("$.page").value(responseList.getPage()))
                .andExpect(jsonPath("$.size").value(responseList.getSize()))
                .andExpect(jsonPath("$.totalElements").value(responseList.getTotalElements()))
                .andExpect(jsonPath("$.totalPages").value(responseList.getTotalPages()))
                .andDo(document("UserCommentGetByWriterAPI",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        pathParameters(
                                parameterWithName("writer_id").description("포트폴리오 식별자")
                        ),
                        requestParameters(
                                List.of(
                                        parameterWithName("page").description("현재 페이지"),
                                        parameterWithName("size").description("페이지 사이즈")
                                )
                        ),
                        responseFields(
                                List.of(
                                        fieldWithPath("data").type(JsonFieldType.ARRAY).description("결과 데이터"),
                                        fieldWithPath("data.[].userCommentId").type(JsonFieldType.NUMBER).description("댓글 식별자"),
                                        fieldWithPath("data.[].content").type(JsonFieldType.STRING).description("댓글 내용"),
                                        fieldWithPath("data.[].userId").type(JsonFieldType.NUMBER).description("댓글이 작성된 유저 식별자"),
                                        fieldWithPath("data.[].userName").type(JsonFieldType.STRING).description("댓글이 작성된 유저 닉네임"),
                                        fieldWithPath("data.[].writerId").type(JsonFieldType.NUMBER).description("댓글 작성자 식별자"),
                                        fieldWithPath("data.[].writerName").type(JsonFieldType.STRING).description("댓글 작성자 닉네임"),
                                        fieldWithPath("data.[].createdAt").type(JsonFieldType.STRING).description("댓글 생성 시각"),
                                        fieldWithPath("data.[].updatedAt").type(JsonFieldType.STRING).description("댓글 수정 시각"),
                                        fieldWithPath("page").type(JsonFieldType.NUMBER).description("페이지"),
                                        fieldWithPath("size").type(JsonFieldType.NUMBER).description("페이지 사이즈"),
                                        fieldWithPath("totalElements").type(JsonFieldType.NUMBER).description("전체 댓글 갯수"),
                                        fieldWithPath("totalPages").type(JsonFieldType.NUMBER).description("전체 페이지 갯수")
                                )
                        )));
    }}

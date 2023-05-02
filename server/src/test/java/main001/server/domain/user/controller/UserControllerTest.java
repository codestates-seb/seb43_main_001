package main001.server.domain.user.controller;

import com.google.gson.Gson;
import com.jayway.jsonpath.JsonPath;
import main001.server.domain.user.dto.UserDto;
import main001.server.domain.user.enums.UserStatus;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.List;

import static main001.server.domain.user.enums.JobStatus.ON_THE_JOB;
import static main001.server.domain.user.enums.UserStatus.USER_ACTIVE;
import static org.hamcrest.Matchers.is;
import static org.hamcrest.Matchers.startsWith;
import static main001.server.domain.user.enums.JobStatus.JOB_SEEKING;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@Transactional
class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private Gson gson ;

    private ResultActions postResultActions;

    private UserDto.Post post;

    @BeforeEach
    public void init() throws Exception {
        // given

    }

    @Test
    @DisplayName("회원가입")
    public void joinTest() throws Exception {
        // given
        UserDto.Post post = new UserDto.Post("test1@gmail.com",
                "사용자1",
                "",
                "https://github.com/test1",
                "https://blog.com/test1",
                JOB_SEEKING,
                "자기소개");

        String content = gson.toJson(post);
        URI uri = UriComponentsBuilder.newInstance().path("/users/signup").build().toUri();
        // when
        ResultActions actions =
                mockMvc.perform(
                        post(uri)
                                .accept(MediaType.APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(content));

        // then
        actions.andExpect(status().isCreated())
                .andExpect(header().string("Location", is(startsWith("/users/"))));
    }

    @Test
    @DisplayName("회원 조회")
    public void getUserTest() throws Exception {
        // given
        UserDto.Post post = new UserDto.Post("test1@gmail.com",
                "사용자1",
                "",
                "https://github.com/test1",
                "https://blog.com/test1",
                JOB_SEEKING,
                "자기소개");

        String content = gson.toJson(post);
        URI uri = UriComponentsBuilder.newInstance().path("/users/signup").build().toUri();
        // when
        ResultActions actions =
                mockMvc.perform(
                        post(uri)
                                .accept(MediaType.APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(content));
        String location = actions.andReturn().getResponse().getHeader("Location");
        // then
        mockMvc.perform(
                        get(location)
                                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.email").value(post.getEmail()))
                .andExpect(jsonPath("$.data.name").value(post.getName()))
                .andExpect(jsonPath("$.data.about").value(post.getAbout()));
    }

    @Test
    @DisplayName("회원목록 조회")
    public void getUsersTest() throws Exception {
        // given
        UserDto.Post post1 = new UserDto.Post("test1@gmail.com","사용자1", "","https://github.com/test1","https://blog.com/test1", JOB_SEEKING,"자기소개");
        String content1 = gson.toJson(post1);
        URI uri = UriComponentsBuilder.newInstance().path("/users/signup").build().toUri();
        mockMvc.perform(
                    post(uri)
                            .accept(MediaType.APPLICATION_JSON)
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(content1));

        UserDto.Post post2 = new UserDto.Post("test2@gmail.com","사용자2", "","https://github.com/test2","https://blog.com/test2", JOB_SEEKING,"자기소개");
        String content2 = gson.toJson(post2);
        mockMvc.perform(
                    post(uri)
                            .accept(MediaType.APPLICATION_JSON)
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(content2));

        UserDto.Post post3 = new UserDto.Post("test3@gmail.com","사용자3", "","https://github.com/test3","https://blog.com/test3", JOB_SEEKING,"자기소개");
        String content3 = gson.toJson(post3);
        mockMvc.perform(
                    post(uri)
                            .accept(MediaType.APPLICATION_JSON)
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(content3));

        String page = "1";
        String size = "10";
        MultiValueMap<String, String> queryParams = new LinkedMultiValueMap<>();
        queryParams.add("page", page);
        queryParams.add("size", size);

        URI getUri = UriComponentsBuilder.newInstance().path("/users").build().toUri();

        // when
        ResultActions actions = mockMvc.perform(get(getUri)
                .params(queryParams)
                .accept(MediaType.APPLICATION_JSON));

        // then
        MvcResult result = actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data").isArray())
                .andExpect(jsonPath("$.pageInfo.totalElements").value(3))
                .andReturn();
    }

    @Test
    @DisplayName("회원정보 수정")
    public void patchUserTest() throws Exception {
        // given
        UserDto.Post post = new UserDto.Post("test1@gmail.com",
                "사용자1",
                "",
                "https://github.com/test1",
                "https://blog.com/test1",
                JOB_SEEKING,
                "자기소개");

        String content = gson.toJson(post);
        URI uri = UriComponentsBuilder.newInstance().path("/users/signup").build().toUri();

        ResultActions postActions =
                mockMvc.perform(
                        post(uri)
                                .accept(MediaType.APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(content));
        String location = postActions.andReturn().getResponse().getHeader("Location");
        UserDto.Patch patch = new UserDto.Patch(1,
                "변경1", // 변경전 "사용자1"
                "",
                "https://github.com/patch1", // 변경전 "https://github.com/test1"
                "https://blog.com/patch1", //변경전 "https://blog.com/test1"
                USER_ACTIVE,
                ON_THE_JOB, // 변경전 JOB_SEEKING
                "수정 완료"); // 변경전 "자기소개"
        String patchContent = gson.toJson(patch);

        // when
        ResultActions actions =
                mockMvc.perform(
                        patch(location)
                                .accept(MediaType.APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(patchContent)
                );

        // then
        actions.andExpect(status().isOk())
                .andExpect(jsonPath("$.data.name").value(patch.getName()))
                .andExpect(jsonPath("$.data.about").value(patch.getAbout()));
    }

    @Test
    @DisplayName("회원 탈퇴")
    public void deleteUserTest() throws Exception {
        // given
        UserDto.Post post = new UserDto.Post("test1@gmail.com",
                "사용자1",
                "",
                "https://github.com/test1",
                "https://blog.com/test1",
                JOB_SEEKING,
                "자기소개");

        String content = gson.toJson(post);
        URI uri = UriComponentsBuilder.newInstance().path("/users/signup").build().toUri();
        ResultActions postActions =
                mockMvc.perform(
                        post(uri)
                                .accept(MediaType.APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(content));
        String location = postActions.andReturn().getResponse().getHeader("Location");
        // when / then
        mockMvc.perform(delete(location))
                .andExpect(status().isNoContent());
    }
}
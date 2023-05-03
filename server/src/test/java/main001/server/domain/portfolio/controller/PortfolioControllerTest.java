package main001.server.domain.portfolio.controller;

import com.google.gson.Gson;
import main001.server.domain.portfolio.dto.PortfolioDto;
import main001.server.domain.portfolio.entity.Portfolio;
import main001.server.domain.portfolio.mapper.PortfolioMapper;
import main001.server.domain.portfolio.service.PortfolioService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.mockito.internal.matchers.StartsWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import javax.sound.sampled.Port;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import static org.hamcrest.Matchers.is;
import static org.hamcrest.Matchers.startsWith;
import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.headers.HeaderDocumentation.headerWithName;
import static org.springframework.restdocs.headers.HeaderDocumentation.responseHeaders;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.*;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.request.RequestDocumentation.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(value = PortfolioController.class)
@MockBean(JpaMetamodelMappingContext.class)
@AutoConfigureRestDocs
class PortfolioControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private PortfolioService portfolioService;

    @MockBean
    private PortfolioMapper mapper;

    @Autowired
    private Gson gson;

    @Test
    void postPortfolio() throws Exception {
        //given
        PortfolioDto.Post postDto = new PortfolioDto.Post("title", "https://github.com/codestates-seb/seb43_main_001.git",
                "http://localhost:8080", "description", "content");
        String content = gson.toJson(postDto);

        PortfolioDto.Response responseDto = new PortfolioDto.Response(1L, "title", "https://github.com/codestates-seb/seb43_main_001.git",
                "http://localhost:8080", "description", "content", 1, LocalDate.now(), LocalDateTime.now());

        given(mapper.portfolioPostDtoToPortfolio(Mockito.any(PortfolioDto.Post.class)))
                .willReturn(new Portfolio());
        given(portfolioService.createPortfolio(Mockito.any(Portfolio.class)))
                .willReturn(new Portfolio());
        given(mapper.portfolioToPortfolioResponseDto(Mockito.any(Portfolio.class)))
                .willReturn(responseDto);

        //when
        ResultActions actions = mockMvc.perform(
                post("/portfolios")
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content)
        );

        //then
        actions
                .andExpect(status().isCreated())
                .andExpect(header().string("Location", is(startsWith("/portfolios"))))
                .andDo(document("post-portfolio",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        requestFields(
                                List.of(
                                        fieldWithPath("title").type(JsonFieldType.STRING).description("포트폴리오 제목"),
                                        fieldWithPath("gitLink").type(JsonFieldType.STRING).description("깃 링크"),
                                        fieldWithPath("distributionLink").type(JsonFieldType.STRING).description("배포 링크"),
                                        fieldWithPath("description").type(JsonFieldType.STRING).description("프로젝트 소개글"),
                                        fieldWithPath("content").type(JsonFieldType.STRING).description("프로젝트 설명")
                                )
                        ),
                        responseHeaders(
                                headerWithName(HttpHeaders.LOCATION).description("Location header. 등록된 리소스의 URI")
                        )
                ));

    }

    @Test
    void patchPortfolio() throws Exception {
        //given
        long portfolioId = 1L;

        PortfolioDto.Patch patchDto = new PortfolioDto.Patch(1L, "title", "https://github.com/codestates-seb/seb43_main_001.git",
                "http://localhost:8080", "description", "content");
        String content = gson.toJson(patchDto);

        PortfolioDto.Response responseDto = new PortfolioDto.Response(1L, "title", "https://github.com/codestates-seb/seb43_main_001.git",
                "http://localhost:8080", "description", "content", 1, LocalDate.now(), LocalDateTime.now());

        given(mapper.portfolioPatchDtoToPortfolio(Mockito.any(PortfolioDto.Patch.class)))
                .willReturn(new Portfolio());
        given(portfolioService.updatePortfolio(Mockito.any(Portfolio.class)))
                .willReturn(new Portfolio());
        given(mapper.portfolioToPortfolioResponseDto(Mockito.any(Portfolio.class)))
                .willReturn(responseDto);

        //when
        ResultActions actions = mockMvc.perform(
                patch("/portfolios/{portfolio-id}", portfolioId)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content)
        );

        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.id").value(portfolioId))
                .andExpect(jsonPath("$.data.title").value(patchDto.getTitle()))
                .andExpect(jsonPath("$.data.gitLink").value(patchDto.getGitLink()))
                .andExpect(jsonPath("$.data.distributionLink").value(patchDto.getDistributionLink()))
                .andExpect(jsonPath("$.data.description").value(patchDto.getDescription()))
                .andExpect(jsonPath("$.data.content").value(patchDto.getContent()))
                .andDo(document("patch-portfolio",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        pathParameters(parameterWithName("portfolio-id").description("포트폴리오 식별자")),
                        requestFields(
                                List.of(
                                        fieldWithPath("id").type(JsonFieldType.NUMBER).description("포트폴리오 식별자").ignored(),
                                        fieldWithPath("title").type(JsonFieldType.STRING).description("포트폴리오 제목"),
                                        fieldWithPath("gitLink").type(JsonFieldType.STRING).description("깃 링크").optional(),
                                        fieldWithPath("distributionLink").type(JsonFieldType.STRING).description("배포 링크").optional(),
                                        fieldWithPath("description").type(JsonFieldType.STRING).description("프로젝트 소개글"),
                                        fieldWithPath("content").type(JsonFieldType.STRING).description("프로젝트 설명")
                                )
                        ),
                        responseFields(
                                List.of(
                                        fieldWithPath("data").type(JsonFieldType.OBJECT).description("결과 데이터"),
                                        fieldWithPath("data.id").type(JsonFieldType.NUMBER).description("포트폴리오 식별자").ignored(),
                                        fieldWithPath("data.title").type(JsonFieldType.STRING).description("포트폴리오 제목"),
                                        fieldWithPath("data.gitLink").type(JsonFieldType.STRING).description("깃 링크").optional(),
                                        fieldWithPath("data.distributionLink").type(JsonFieldType.STRING).description("배포 링크").optional(),
                                        fieldWithPath("data.description").type(JsonFieldType.STRING).description("프로젝트 소개글"),
                                        fieldWithPath("data.content").type(JsonFieldType.STRING).description("프로젝트 설명"),
                                        fieldWithPath("data.views").type(JsonFieldType.NUMBER).description("조회수"),
                                        fieldWithPath("data.createdTime").type(JsonFieldType.STRING).description("생성 시간"),
                                        fieldWithPath("data.modifiedTime").type(JsonFieldType.STRING).description("수정 시간")
                                )
                        )
                ));

    }

    @Test
    void getPortfolio() throws Exception {
        //given
        long portfolioId = 1L;
        PortfolioDto.Response responseDto = new PortfolioDto.Response(1L, "title", "https://github.com/codestates-seb/seb43_main_001.git",
                "http://localhost:8080", "description", "content", 1, LocalDate.now(), LocalDateTime.now());

        given(portfolioService.findPortfolio(Mockito.anyLong()))
                .willReturn(new Portfolio());
        given(mapper.portfolioToPortfolioResponseDto(Mockito.any(Portfolio.class)))
                .willReturn(responseDto);

        //when
        ResultActions actions = mockMvc.perform(
                get("/portfolios/{portfolio-id}", portfolioId)
                        .accept(MediaType.APPLICATION_JSON)
        );

        //actions
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.id").value(portfolioId))
                .andDo(document("get-portfolio",
                    preprocessResponse(prettyPrint()),
                    pathParameters(parameterWithName("portfolio-id").description("포트폴리오 식별자")),
                    responseFields(
                            List.of(
                                    fieldWithPath("data").type(JsonFieldType.OBJECT).description("결과 데이터"),
                                    fieldWithPath("data.id").type(JsonFieldType.NUMBER).description("포트폴리오 식별자").ignored(),
                                    fieldWithPath("data.title").type(JsonFieldType.STRING).description("포트폴리오 제목"),
                                    fieldWithPath("data.gitLink").type(JsonFieldType.STRING).description("깃 링크").optional(),
                                    fieldWithPath("data.distributionLink").type(JsonFieldType.STRING).description("배포 링크").optional(),
                                    fieldWithPath("data.description").type(JsonFieldType.STRING).description("프로젝트 소개글"),
                                    fieldWithPath("data.content").type(JsonFieldType.STRING).description("프로젝트 설명"),
                                    fieldWithPath("data.views").type(JsonFieldType.NUMBER).description("조회수"),
                                    fieldWithPath("data.createdTime").type(JsonFieldType.STRING).description("생성 시간"),
                                    fieldWithPath("data.modifiedTime").type(JsonFieldType.STRING).description("수정 시간")
                            )
                    )
                ));
    }

    @Test
    void getPortfolios() throws Exception {
        //given
        int page = 1;
        int size = 2;

        List<Portfolio> portfolios = List.of(new Portfolio(), new Portfolio());

        given(portfolioService.findPortfolios(Mockito.anyInt(), Mockito.anyInt()))
                .willReturn(new PageImpl<>(portfolios, PageRequest.of(page-1, size, Sort.by("portfolioId").descending()), portfolios.size()));

        given(mapper.portfolioToPortfolioResponseDtos(Mockito.anyList()))
                .willReturn(List.of(
                        new PortfolioDto.Response(1L, "title1", "https://github.com/codestates-seb/seb43_main_001.git",
                        "http://localhost:8080", "description", "content", 1, LocalDate.now(), LocalDateTime.now()),
                        new PortfolioDto.Response(2L, "title2", "https://github.com/codestates-seb/seb43_main_001.git",
                                "http://localhost:8080", "description", "content", 1, LocalDate.now(), LocalDateTime.now())
                        )
                );

        //when
        ResultActions actions =
                mockMvc.perform(
                        get("/portfolios/?page={page}&size={size}", page, size)
                                .accept(MediaType.APPLICATION_JSON)
                );

        //then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data").isArray())
                .andDo(document("get-portfolios",
                        preprocessResponse(prettyPrint()),
                        requestParameters(List.of(parameterWithName("page").description("페이지 번호"),
                                parameterWithName("size").description("페이지 크기"))),
                        responseFields(
                                List.of(
                                        fieldWithPath("data").type(JsonFieldType.ARRAY).description("결과 데이터"),
                                        fieldWithPath("data[].id").type(JsonFieldType.NUMBER).description("포트폴리오 식별자").ignored(),
                                        fieldWithPath("data[].title").type(JsonFieldType.STRING).description("포트폴리오 제목"),
                                        fieldWithPath("data[].gitLink").type(JsonFieldType.STRING).description("깃 링크").optional(),
                                        fieldWithPath("data[].distributionLink").type(JsonFieldType.STRING).description("배포 링크").optional(),
                                        fieldWithPath("data[].description").type(JsonFieldType.STRING).description("프로젝트 소개글"),
                                        fieldWithPath("data[].content").type(JsonFieldType.STRING).description("프로젝트 설명"),
                                        fieldWithPath("data[].views").type(JsonFieldType.NUMBER).description("조회수"),
                                        fieldWithPath("data[].createdTime").type(JsonFieldType.STRING).description("생성 시간"),
                                        fieldWithPath("data[].modifiedTime").type(JsonFieldType.STRING).description("수정 시간"),

                                        fieldWithPath("pageInfo").type(JsonFieldType.OBJECT).description("페이지 정보"),
                                        fieldWithPath("pageInfo.page").type(JsonFieldType.NUMBER).description("페이지 번호"),
                                        fieldWithPath("pageInfo.size").type(JsonFieldType.NUMBER).description("페이지 크기"),
                                        fieldWithPath("pageInfo.totalElements").type(JsonFieldType.NUMBER).description("총 갯수"),
                                        fieldWithPath("pageInfo.totalPages").type(JsonFieldType.NUMBER).description("총 페이지 수")
                                )
                        )
                ));
    }

    @Test
    void deletePortfolio() throws Exception {
        //given
        long portfolioId = 1;

        //when
        ResultActions actions =
                mockMvc.perform(
                        delete("/portfolios/{portfolio-id}", portfolioId)
                );

        //then
        actions
                .andExpect(status().isNoContent())
                .andDo(document("delete-portfolio",
                        pathParameters(parameterWithName("portfolio-id").description("포트폴리오 식별자"))
                ));
    }
}
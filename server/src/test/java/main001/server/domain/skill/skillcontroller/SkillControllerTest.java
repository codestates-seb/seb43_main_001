package main001.server.domain.skill.skillcontroller;

import main001.server.domain.skill.controller.SkillController;
import main001.server.domain.skill.response.SkillResponseList;
import main001.server.domain.skill.service.SkillService;
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

import java.util.List;

import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.*;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.request.RequestDocumentation.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(SkillController.class)
@AutoConfigureRestDocs
@MockBean(JpaMetamodelMappingContext.class)
public class SkillControllerTest {

    @Autowired
    MockMvc mockMvc;

    @MockBean
    SkillService skillService;

    @Test
    void 스킬_검색() throws Exception {
        // given
        String name = "j";

        SkillResponseList response = new SkillResponseList(List.of("JAVA","JAVASCRIPT"));

        // when
        Mockito.doReturn(response).when(skillService).findSkillsByName(name);
        ResultActions resultActions = mockMvc.perform(RestDocumentationRequestBuilders
                .get("/api/skills")
                .param("name", name)
                .accept(MediaType.APPLICATION_JSON));
        // then
        resultActions.andExpect(status().isOk())
                .andExpect(jsonPath("$.skillNames.[0]").value("JAVA"))
                .andExpect(jsonPath("$.skillNames.[1]").value("JAVASCRIPT"))
                .andDo(document("스킬 검색",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        requestParameters(
                                parameterWithName("name").description("검색할 단어. 해당 단어로 시작하는 스킬만 검색 가능")
                        ),
                        responseFields(
                                List.of(
                                        fieldWithPath("skillNames").type(JsonFieldType.ARRAY).description("검색된 스킬 리스트")
                                )
                        )));

    }
}

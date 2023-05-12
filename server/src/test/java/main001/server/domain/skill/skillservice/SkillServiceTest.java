//package main001.server.domain.skill.skillservice;
//
//import main001.server.domain.skill.repository.SkillRepository;
//import main001.server.domain.skill.response.SkillResponseList;
//import main001.server.domain.skill.service.SkillService;
//import org.junit.jupiter.api.Test;
//import org.junit.jupiter.api.extension.ExtendWith;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.mockito.Mockito;
//import org.mockito.junit.jupiter.MockitoExtension;
//import org.springframework.data.domain.Sort;
//
//import java.util.List;
//
//import static org.assertj.core.api.Assertions.*;
//
//
//@ExtendWith(MockitoExtension.class)
//public class SkillServiceTest {
//
//    // 가짜 객체
//    @Mock
//    SkillRepository skillRepository;
//
//    // 의존관계 주입이 되는 가짜 객체
//    @InjectMocks
//    SkillService skillService;
//
//    @Test
//    void 스킬_이름으로_스킬검색() {
//        // given
//        List<String> skills = List.of("JAVA","JAVASCRIPT");
//        Mockito.doReturn(skills).when(skillRepository).findSkillsByName("J", Sort.by("name").ascending());
//
//        // when
//        SkillResponseList j = skillService.findSkillsByName("j");
//
//        // then
//        assertThat(j.getSkillNames().get(0)).isEqualTo("JAVA");
//        assertThat(j.getSkillNames().get(1)).isEqualTo("JAVASCRIPT");
//    }
//}

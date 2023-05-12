package main001.server.domain.skill.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
@AllArgsConstructor
public class SkillResponseList {

    private List<String> skillNames;
}

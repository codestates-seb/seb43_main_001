package main001.server.domain.skill.controller;

import lombok.RequiredArgsConstructor;
import main001.server.domain.skill.response.SkillResponseList;
import main001.server.domain.skill.service.SkillService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/skills")
@RequiredArgsConstructor
public class SkillController {

    private final SkillService skillService;

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public SkillResponseList getSkills(@RequestParam String name) {
        SkillResponseList skills = skillService.findSkillsByName(name);

        return skills;
    }


}

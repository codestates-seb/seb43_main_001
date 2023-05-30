package main001.server.domain.skill.controller;

import lombok.RequiredArgsConstructor;
import main001.server.domain.skill.service.SkillService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/skills")
@RequiredArgsConstructor
public class SkillController {

    private final SkillService skillService;

    @GetMapping
    public ResponseEntity getAllSkills() {
        List<String> allSkills = skillService.findAllSkills();

        return ResponseEntity.ok().body(allSkills);
    }
}

package main001.server.domain.user.enums;

import lombok.Getter;

public enum Grade {
    NOVICE("초보자"),
    INTERMEDIATE("중급자"),
    ADVANCED("고급자"),
    EXPERT("전문가"),
    MASTER("마스터");

    @Getter
    private final String grade;

    Grade(String grade) {
        this.grade = grade;
    }
}

package main001.server.domain.usercomment.entity;

import lombok.Getter;

public enum UserCommentStatus {
    PUBLIC("등록 됨"),
    PRIVATE("비밀 글"),
    DELETED("삭제 됨");

    @Getter
    private final String title;

    UserCommentStatus(String title) {
        this.title = title;
    }
}

package main001.server.domain.portfoliocomment.entity;

import lombok.Getter;

public enum PortfolioCommentStatus {
    COMMENT_REGISTERED("REGISTERED","등록 됨"),
    COMMENT_PRIVATE("PRIVATE","비밀 글"),
    COMMENT_DELETED("DELETED","삭제 됨");

    @Getter
    private String code;

    @Getter
    private String title;

    PortfolioCommentStatus(String code, String title) {
        this.code = code;
        this.title = title;
    }
}

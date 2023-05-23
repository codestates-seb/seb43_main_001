package main001.server.exception;

import lombok.Getter;

public enum ExceptionCode {

    // user 관련
    USER_NOT_FOUND(404, "회원 정보를 찾을 수 없습니다."),
    USER_EXISTS(409, "기존 회원이 존재합니다."),
    NOT_IMPLEMENTATION(501, "서비스 준비 중입니다."),
    INVALID_USER_STATUS(400, "접근 권한이 없는 회원입니다."),
    NO_PERMISSION_CREATING_POST(403, "회원만 작성 할 수 있습니다."),
    NO_PERMISSION_EDITING_POST(403,"작성자만 수정할 수 있습니다."),
    NO_PERMISSION_DELETING_POST(403,"작성자만 삭제할 수 있습니다."),
    NOT_ALLOW_NULL_VALUE(400, "적절한 입력값을 입력하세요."),

    // portfolio 관련
    PORTFOLIO_NOT_FOUND(404, "포트폴리오가 존재하지 않습니다."),
    SEARCH_CONDITION_MISMATCH(400,"검색 조건이 잘못되었습니다."),
    PORTFOLIO_NOT_SEARCHED(404, "조회된 포트폴리오가 없습니다"),

    // comment 관련
    COMMENT_NOT_FOUND(404,"댓글이 존재하지 않습니다."),
    COMMNET_DELETED(204,"삭제된 댓글입니다."),

    // skill 관련
    SKILL_NOT_FOUND(404,"조회된 기술이 없습니다."),
    SKILL_NOT_EXIST(400, "등록할 기술이 없습니다."),

    // likes 관련
    LIKES_EXIST(400, "이미 좋아요를 누른 게시물입니다."),
    LIKES_NOT_EXIST(400, "좋아요를 누르지 않은 게시물입니다."),

    // security 관련
    // ACCESS_NOT_MATCH(403, "접속 정보가 일치하지 않습니다."); // 개발 후 해당 코드로 아래 코드 교체
    USER_IP_NOT_MATCH(400, "접속 IP정보가 상이합니다."),
    REFRESH_TOKEN_NOT_MATCH(403, "RefreshToken이 일치하지 않습니다."),
    REFRESH_TOKEN_EXPIRED(403, "RefreshToken이 만료되었습니다."),
    TOKEN_NOT_AVAILABLE(401, "사용이 불가능한 토큰입니다.");

    @Getter
    private int status;
    @Getter
    private String message;

    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }
}

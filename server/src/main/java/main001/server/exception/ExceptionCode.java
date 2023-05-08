package main001.server.exception;

import lombok.Getter;

public enum ExceptionCode {

    USER_NOT_FOUND(404, "회원 정보를 찾을 수 없습니다."),
    USER_EXISTS(409, "기존 회원이 존재합니다."),
    NOT_IMPLEMENTATION(501, "서비스 준비 중입니다."),
    INVALID_USER_STATUS(400, "접근 권한이 없는 회원입니다."),
    NO_PERMISSION_CREATING_POST(403, "회원만 작성 할 수 있습니다."),
    NO_PERMISSION_EDITING_POST(403,"작성자만 수정할 수 있습니다."),
    NO_PERMISSION_DELETING_POST(403,"작성자만 삭제할 수 있습니다.");

    @Getter
    private int status;
    @Getter
    private String message;

    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }
}

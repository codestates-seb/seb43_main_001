package main001.server.domain.user.enums;

import lombok.Getter;

public enum UserStatus {
    USER_ACTIVE("활동중"),
    USER_SLEEP("휴면 상태"),
    USER_QUIT("탈퇴 상태");
    @Getter
    private final String userStatus;
    UserStatus(String userStatus) {
        this.userStatus = userStatus;
    }
}
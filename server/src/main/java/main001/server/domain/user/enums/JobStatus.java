package main001.server.domain.user.enums;

import lombok.Getter;

public enum JobStatus {
    JOB_SEEKING("구직 중"),
    ON_THE_JOB("재직 중"),
    STUDENT("학생");

    @Getter
    private final String jobStatus;

    JobStatus(String jobStatus) {
        this.jobStatus = jobStatus;
    }
}

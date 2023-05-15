package main001.server.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class PageInfo {
    private long totalElements;
    private int totalPages;
}
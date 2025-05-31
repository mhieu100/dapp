package com.dapp.backend.model.response;

import lombok.Data;

@Data
public class Pagination {
    private Meta meta;
    private Object result;

    @Data
    public static class Meta {
        private int page;
        private int pageSize;
        private int pages;
        private long total;
    }
}
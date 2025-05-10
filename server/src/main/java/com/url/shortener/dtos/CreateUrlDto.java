package com.url.shortener.dtos;

import lombok.Data;

@Data
public class CreateUrlDto {
    private Long userId;
    private String originalUrl;
}

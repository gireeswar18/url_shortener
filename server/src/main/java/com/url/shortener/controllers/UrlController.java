package com.url.shortener.controllers;

import com.url.shortener.dtos.CreateUrlDto;
import com.url.shortener.services.UrlService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/url")
public class UrlController {

    @Autowired
    private UrlService urlService;

    @PostMapping("/create")
    public ResponseEntity<?> createUrl(@RequestBody CreateUrlDto createUrlDto) {
        return urlService.createUrl(createUrlDto);
    }

    @GetMapping("/all/{id}")
    public ResponseEntity<?> getAllUrlsOfUser(@PathVariable Long id) {
        return urlService.getAllUrlsOfUser(id);
    }

}

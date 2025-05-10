package com.url.shortener.services;

import com.url.shortener.dtos.CreateUrlDto;
import com.url.shortener.models.UrlMapping;
import com.url.shortener.models.User;
import com.url.shortener.repos.UrlRepository;
import com.url.shortener.repos.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Random;

@Service
@AllArgsConstructor
public class UrlService {
    private UrlRepository urlRepository;
    private UserRepository userRepository;

    public ResponseEntity<?> createUrl(CreateUrlDto createUrlDto) {
        if (!userRepository.existsById(createUrlDto.getUserId())) {
            return ResponseEntity.badRequest().body("User not found!");
        }

        User user = userRepository.findById(createUrlDto.getUserId()).get();
        List<UrlMapping> urlMappings = user.getUrlMappingList();

        String shortUrl = generateShortUrl();
        UrlMapping urlMapping = new UrlMapping();
        urlMapping.setUser(user);
        urlMapping.setOriginalUrl(createUrlDto.getOriginalUrl());
        urlMapping.setShortUrl(shortUrl);

        urlMappings.add(urlMapping);
        urlRepository.save(urlMapping);
        userRepository.save(user);

        return ResponseEntity.ok(urlMapping);
    }

    private String generateShortUrl() {
        String chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        Random random = new Random();
        StringBuilder shortUrl = new StringBuilder();

        for (int i = 0; i < 8; i++) {
            shortUrl.append(chars.charAt(random.nextInt(42)));
        }

        return shortUrl.toString();
    }

    public ResponseEntity<?> getAllUrlsOfUser(Long id) {
        if (!userRepository.existsById(id)) {
            return ResponseEntity.badRequest().body("Invalid user id!");
        }

        List<UrlMapping> urlMappings = userRepository.getReferenceById(id).getUrlMappingList();

        return ResponseEntity.ok(urlMappings);
    }

    public ResponseEntity<?> getOriginalUrl(String shortUrl) {
        UrlMapping urlMapping = urlRepository.findOriginalUrlByShortUrl(shortUrl);

        if (urlMapping == null) {
            return ResponseEntity.badRequest().body("Url not found!");
        }

        return ResponseEntity.status(HttpStatus.FOUND).header("Location", urlMapping.getOriginalUrl()).build();
    }
}

package com.url.shortener.services;

import com.url.shortener.dtos.LoginDto;
import com.url.shortener.models.User;
import com.url.shortener.repos.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
@AllArgsConstructor
public class UserService {

    private UserRepository userRepository;

    public ResponseEntity<?> registerUser(User user) {
        if (userRepository.existsUserByEmail(user.getEmail())) {
            return ResponseEntity.badRequest().body("User already exists with the given mail!");
        }

        return ResponseEntity.ok(userRepository.save(user));

    }

    public ResponseEntity<?> login(LoginDto loginDto) {
        if (!userRepository.existsUserByEmail(loginDto.getEmail())) {
            return ResponseEntity.badRequest().body("Account not found!");
        }

        User user = userRepository.findUserByEmail(loginDto.getEmail());
        if (user.getPassword().equals(loginDto.getPassword())) {
            return ResponseEntity.ok(user);
        }
        return ResponseEntity.badRequest().body("Invalid password!");
    }

    public ResponseEntity<?> getUserById(Long id) {
        if (!userRepository.existsById(id)) {
            return ResponseEntity.badRequest().body("User not found!");
        }

        return ResponseEntity.ok(userRepository.findById(id).get());
    }
}

package com.mareen.emailgeniousbackend.controller;

import com.mareen.emailgeniousbackend.dto.EmailRequest;
import com.mareen.emailgeniousbackend.service.EmailGeneratorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/email")
@RequiredArgsConstructor
@CrossOrigin("*")
public class EmailGeneratorController {

    private final EmailGeneratorService emailGeneratorService;

    @PostMapping("/generate")
    public ResponseEntity<String> generateEmail(@RequestBody EmailRequest emailRequest) {
        return ResponseEntity.ok(emailGeneratorService.generateReply(emailRequest));
    }
}

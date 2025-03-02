package com.mareen.emailgeniousbackend.dto;

import lombok.Data;

@Data
public class EmailRequest {
    private String emailContent;
    private String tone;
}

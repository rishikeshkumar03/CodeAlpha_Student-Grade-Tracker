package com.codealpha.gradetracker;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class CodeAlphaGradeTrackerApplication {

    public static void main(String[] args) {
        System.out.println("=====================================================");
        System.out.println("   CODE ALPHA — FUTURISTIC STUDENT GRADE TRACKER");
        System.out.println("   Neural Academic Core Initializing...");
        System.out.println("=====================================================");
        SpringApplication.run(CodeAlphaGradeTrackerApplication.class, args);
    }
}

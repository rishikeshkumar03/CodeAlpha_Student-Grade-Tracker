package com.codealpha.gradetracker.controller;

import com.codealpha.gradetracker.model.*;
import com.codealpha.gradetracker.service.GradeCalculatorService;
import com.codealpha.gradetracker.service.StudentStorageService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class GradeTrackerController {

    private final GradeCalculatorService calculatorService;
    private final StudentStorageService storageService;

    public GradeTrackerController(GradeCalculatorService calculatorService, StudentStorageService storageService) {
        this.calculatorService = calculatorService;
        this.storageService = storageService;
    }

    @PostMapping("/analyze")
    public ResponseEntity<GradeAnalysisResult> analyzePerformance(@RequestBody StudentGradeRequest request) {
        GradeAnalysisResult result = calculatorService.analyzeStudentPerformance(request);
        return ResponseEntity.ok(result);
    }

    @PostMapping("/save")
    public ResponseEntity<StudentSummary> saveStudentPerformance(@RequestBody StudentGradeRequest request) {
        GradeAnalysisResult result = calculatorService.analyzeStudentPerformance(request);
        StudentSummary summary = new StudentSummary(
                result.getStudentName(),
                result.getUniversity(),
                result.getAcademicYear(),
                result.getSemester(),
                result.getPercentage(),
                result.getSemesterSgpa(),
                result.getCumulativeCgpa(),
                result.getReactionTitle()
        );
        StudentSummary saved = storageService.save(summary);
        return ResponseEntity.ok(saved);
    }

    @GetMapping("/students")
    public ResponseEntity<ArrayList<StudentSummary>> getAllStudents() {
        return ResponseEntity.ok(storageService.getAllStudents());
    }

    @DeleteMapping("/students/{id}")
    public ResponseEntity<Map<String, Object>> deleteStudent(@PathVariable String id) {
        boolean deleted = storageService.deleteStudent(id);
        return ResponseEntity.ok(Map.of("success", deleted, "id", id));
    }

    @GetMapping("/schemes")
    public ResponseEntity<Collection<GradingSchemeInfo>> getGradingSchemes() {
        return ResponseEntity.ok(calculatorService.getAllSchemes());
    }

    @GetMapping("/health")
    public ResponseEntity<Map<String, String>> healthCheck() {
        return ResponseEntity.ok(Map.of(
                "status", "ONLINE",
                "brand", "CODE ALPHA",
                "system", "FUTURISTIC STUDENT GRADE TRACKER CORE"
        ));
    }
}

package com.codealpha.gradetracker.model;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.UUID;

public class StudentSummary {
    private String id;
    private String studentName;
    private String university;
    private String academicYear;
    private String semester;
    private double percentage;
    private double sgpa;
    private double cgpa;
    private String reactionTitle;
    private String recordedAt;

    public StudentSummary() {
        this.id = UUID.randomUUID().toString();
        this.recordedAt = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
    }

    public StudentSummary(String studentName, String university, String academicYear, String semester,
                          double percentage, double sgpa, double cgpa, String reactionTitle) {
        this.id = UUID.randomUUID().toString();
        this.studentName = studentName;
        this.university = university;
        this.academicYear = academicYear;
        this.semester = semester;
        this.percentage = percentage;
        this.sgpa = sgpa;
        this.cgpa = cgpa;
        this.reactionTitle = reactionTitle;
        this.recordedAt = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getStudentName() { return studentName; }
    public void setStudentName(String studentName) { this.studentName = studentName; }

    public String getUniversity() { return university; }
    public void setUniversity(String university) { this.university = university; }

    public String getAcademicYear() { return academicYear; }
    public void setAcademicYear(String academicYear) { this.academicYear = academicYear; }

    public String getSemester() { return semester; }
    public void setSemester(String semester) { this.semester = semester; }

    public double getPercentage() { return percentage; }
    public void setPercentage(double percentage) { this.percentage = percentage; }

    public double getSgpa() { return sgpa; }
    public void setSgpa(double sgpa) { this.sgpa = sgpa; }

    public double getCgpa() { return cgpa; }
    public void setCgpa(double cgpa) { this.cgpa = cgpa; }

    public String getReactionTitle() { return reactionTitle; }
    public void setReactionTitle(String reactionTitle) { this.reactionTitle = reactionTitle; }

    public String getRecordedAt() { return recordedAt; }
    public void setRecordedAt(String recordedAt) { this.recordedAt = recordedAt; }
}

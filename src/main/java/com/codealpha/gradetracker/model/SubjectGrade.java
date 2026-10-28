package com.codealpha.gradetracker.model;

public class SubjectGrade {
    private String name;
    private double credits = 3.0;
    private String grade = "A";
    private double gradePoint = 8.0;

    public SubjectGrade() {}

    public SubjectGrade(String name, double credits, String grade, double gradePoint) {
        this.name = name;
        this.credits = credits;
        this.grade = grade;
        this.gradePoint = gradePoint;
    }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public double getCredits() { return credits; }
    public void setCredits(double credits) { this.credits = credits; }

    public String getGrade() { return grade; }
    public void setGrade(String grade) { this.grade = grade; }

    public double getGradePoint() { return gradePoint; }
    public void setGradePoint(double gradePoint) { this.gradePoint = gradePoint; }
}

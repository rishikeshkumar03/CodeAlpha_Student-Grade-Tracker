package com.codealpha.gradetracker.model;

public class SemesterRecord {
    private String semesterName;
    private String academicYear; // Year 1, Year 2, Year 3, Year 4
    private double sgpa;
    private double credits;

    public SemesterRecord() {}

    public SemesterRecord(String semesterName, String academicYear, double sgpa, double credits) {
        this.semesterName = semesterName;
        this.academicYear = academicYear;
        this.sgpa = sgpa;
        this.credits = credits;
    }

    public String getSemesterName() { return semesterName; }
    public void setSemesterName(String semesterName) { this.semesterName = semesterName; }

    public String getAcademicYear() { return academicYear; }
    public void setAcademicYear(String academicYear) { this.academicYear = academicYear; }

    public double getSgpa() { return sgpa; }
    public void setSgpa(double sgpa) { this.sgpa = sgpa; }

    public double getCredits() { return credits; }
    public void setCredits(double credits) { this.credits = credits; }
}

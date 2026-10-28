package com.codealpha.gradetracker.model;

public class SubjectMark {
    private String name;
    private double marksObtained;
    private double maxMarks = 100.0;

    public SubjectMark() {}

    public SubjectMark(String name, double marksObtained, double maxMarks) {
        this.name = name;
        this.marksObtained = marksObtained;
        this.maxMarks = maxMarks > 0 ? maxMarks : 100.0;
    }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public double getMarksObtained() { return marksObtained; }
    public void setMarksObtained(double marksObtained) { this.marksObtained = marksObtained; }

    public double getMaxMarks() { return maxMarks; }
    public void setMaxMarks(double maxMarks) { this.maxMarks = maxMarks > 0 ? maxMarks : 100.0; }
}

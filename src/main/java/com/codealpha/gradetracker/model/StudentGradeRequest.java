package com.codealpha.gradetracker.model;

import java.util.ArrayList;

public class StudentGradeRequest {
    private String studentName = "Cyber Student";
    private String university = "UGC Standard Autonomous";
    private String academicYear = "Year 2";
    private String semester = "Semester 4";
    private String gradingScheme = "UGC_10_POINT";

    private ArrayList<SubjectMark> subjectMarks = new ArrayList<>();
    private ArrayList<SubjectGrade> subjectGrades = new ArrayList<>();
    private ArrayList<SemesterRecord> pastSemesters = new ArrayList<>();

    public StudentGradeRequest() {}

    public String getStudentName() { return studentName; }
    public void setStudentName(String studentName) { this.studentName = studentName; }

    public String getUniversity() { return university; }
    public void setUniversity(String university) { this.university = university; }

    public String getAcademicYear() { return academicYear; }
    public void setAcademicYear(String academicYear) { this.academicYear = academicYear; }

    public String getSemester() { return semester; }
    public void setSemester(String semester) { this.semester = semester; }

    public String getGradingScheme() { return gradingScheme; }
    public void setGradingScheme(String gradingScheme) { this.gradingScheme = gradingScheme; }

    public ArrayList<SubjectMark> getSubjectMarks() { return subjectMarks; }
    public void setSubjectMarks(ArrayList<SubjectMark> subjectMarks) { this.subjectMarks = subjectMarks; }

    public ArrayList<SubjectGrade> getSubjectGrades() { return subjectGrades; }
    public void setSubjectGrades(ArrayList<SubjectGrade> subjectGrades) { this.subjectGrades = subjectGrades; }

    public ArrayList<SemesterRecord> getPastSemesters() { return pastSemesters; }
    public void setPastSemesters(ArrayList<SemesterRecord> pastSemesters) { this.pastSemesters = pastSemesters; }
}

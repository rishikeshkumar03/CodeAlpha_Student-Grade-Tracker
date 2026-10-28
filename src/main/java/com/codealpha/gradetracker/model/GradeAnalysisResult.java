package com.codealpha.gradetracker.model;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.Map;

public class GradeAnalysisResult {
    private String studentName;
    private String university;
    private String academicYear;
    private String semester;
    private String gradingScheme;

    // Percentage stats
    private double totalMarksObtained;
    private double totalMaxMarks;
    private double percentage;
    private double highestScore;
    private String highestSubject = "";
    private double lowestScore;
    private String lowestSubject = "";
    private double averageMarks;
    private int subjectCount;

    // CGPA stats
    private double semesterSgpa;
    private double cumulativeCgpa;
    private double currentSemesterCredits;
    private double totalCumulativeCredits;
    private Map<String, Double> yearWiseCgpa = new LinkedHashMap<>();

    // Performance Reaction & Advice
    private String reactionCode; // "GOOD", "REELS_WARNING", "CRITICAL_WARNING", "CONFLICTING_DATA"
    private String reactionTitle;
    private String reactionSubtitle;
    private String voiceText;
    private String animationType; // "FLOWER_BLOOM", "CONFETTI_CELEBRATION", "RED_HOLOGRAM_WARNING", "NEUTRAL"
    private String academicSummary;
    private ArrayList<String> suggestions = new ArrayList<>();
    private String formulaVerificationNotice;

    private boolean valid;
    private ArrayList<String> errorMessages = new ArrayList<>();

    public GradeAnalysisResult() {}

    // Getters and Setters
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

    public double getTotalMarksObtained() { return totalMarksObtained; }
    public void setTotalMarksObtained(double totalMarksObtained) { this.totalMarksObtained = totalMarksObtained; }

    public double getTotalMaxMarks() { return totalMaxMarks; }
    public void setTotalMaxMarks(double totalMaxMarks) { this.totalMaxMarks = totalMaxMarks; }

    public double getPercentage() { return percentage; }
    public void setPercentage(double percentage) { this.percentage = percentage; }

    public double getHighestScore() { return highestScore; }
    public void setHighestScore(double highestScore) { this.highestScore = highestScore; }

    public String getHighestSubject() { return highestSubject; }
    public void setHighestSubject(String highestSubject) { this.highestSubject = highestSubject; }

    public double getLowestScore() { return lowestScore; }
    public void setLowestScore(double lowestScore) { this.lowestScore = lowestScore; }

    public String getLowestSubject() { return lowestSubject; }
    public void setLowestSubject(String lowestSubject) { this.lowestSubject = lowestSubject; }

    public double getAverageMarks() { return averageMarks; }
    public void setAverageMarks(double averageMarks) { this.averageMarks = averageMarks; }

    public int getSubjectCount() { return subjectCount; }
    public void setSubjectCount(int subjectCount) { this.subjectCount = subjectCount; }

    public double getSemesterSgpa() { return semesterSgpa; }
    public void setSemesterSgpa(double semesterSgpa) { this.semesterSgpa = semesterSgpa; }

    public double getCumulativeCgpa() { return cumulativeCgpa; }
    public void setCumulativeCgpa(double cumulativeCgpa) { this.cumulativeCgpa = cumulativeCgpa; }

    public double getCgpa() { return cumulativeCgpa; }
    public void setCgpa(double cgpa) { this.cumulativeCgpa = cgpa; }

    public double getCurrentSemesterCredits() { return currentSemesterCredits; }
    public void setCurrentSemesterCredits(double currentSemesterCredits) { this.currentSemesterCredits = currentSemesterCredits; }

    public double getTotalCumulativeCredits() { return totalCumulativeCredits; }
    public void setTotalCumulativeCredits(double totalCumulativeCredits) { this.totalCumulativeCredits = totalCumulativeCredits; }

    public Map<String, Double> getYearWiseCgpa() { return yearWiseCgpa; }
    public void setYearWiseCgpa(Map<String, Double> yearWiseCgpa) { this.yearWiseCgpa = yearWiseCgpa; }

    public String getReactionCode() { return reactionCode; }
    public void setReactionCode(String reactionCode) { this.reactionCode = reactionCode; }

    public String getReactionTitle() { return reactionTitle; }
    public void setReactionTitle(String reactionTitle) { this.reactionTitle = reactionTitle; }

    public String getReactionSubtitle() { return reactionSubtitle; }
    public void setReactionSubtitle(String reactionSubtitle) { this.reactionSubtitle = reactionSubtitle; }

    public String getVoiceText() { return voiceText; }
    public void setVoiceText(String voiceText) { this.voiceText = voiceText; }

    public String getAnimationType() { return animationType; }
    public void setAnimationType(String animationType) { this.animationType = animationType; }

    public String getAcademicSummary() { return academicSummary; }
    public void setAcademicSummary(String academicSummary) { this.academicSummary = academicSummary; }

    public ArrayList<String> getSuggestions() { return suggestions; }
    public void setSuggestions(ArrayList<String> suggestions) { this.suggestions = suggestions; }

    public String getFormulaVerificationNotice() { return formulaVerificationNotice; }
    public void setFormulaVerificationNotice(String formulaVerificationNotice) { this.formulaVerificationNotice = formulaVerificationNotice; }

    public boolean isValid() { return valid; }
    public void setValid(boolean valid) { this.valid = valid; }

    public ArrayList<String> getErrorMessages() { return errorMessages; }
    public void setErrorMessages(ArrayList<String> errorMessages) { this.errorMessages = errorMessages; }
}

package com.codealpha.gradetracker.model;

import java.util.LinkedHashMap;
import java.util.Map;

public class GradingSchemeInfo {
    private String id;
    private String name;
    private String universityOrBoard;
    private double maxGradePoint;
    private Map<String, Double> gradePoints = new LinkedHashMap<>();
    private String officialFormulaDescription;
    private boolean verifiedConversion;

    public GradingSchemeInfo() {}

    public GradingSchemeInfo(String id, String name, String universityOrBoard, double maxGradePoint,
                             Map<String, Double> gradePoints, String officialFormulaDescription,
                             boolean verifiedConversion) {
        this.id = id;
        this.name = name;
        this.universityOrBoard = universityOrBoard;
        this.maxGradePoint = maxGradePoint;
        this.gradePoints = gradePoints;
        this.officialFormulaDescription = officialFormulaDescription;
        this.verifiedConversion = verifiedConversion;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getUniversityOrBoard() { return universityOrBoard; }
    public void setUniversityOrBoard(String universityOrBoard) { this.universityOrBoard = universityOrBoard; }

    public double getMaxGradePoint() { return maxGradePoint; }
    public void setMaxGradePoint(double maxGradePoint) { this.maxGradePoint = maxGradePoint; }

    public Map<String, Double> getGradePoints() { return gradePoints; }
    public void setGradePoints(Map<String, Double> gradePoints) { this.gradePoints = gradePoints; }

    public String getOfficialFormulaDescription() { return officialFormulaDescription; }
    public void setOfficialFormulaDescription(String officialFormulaDescription) { this.officialFormulaDescription = officialFormulaDescription; }

    public boolean isVerifiedConversion() { return verifiedConversion; }
    public void setVerifiedConversion(boolean verifiedConversion) { this.verifiedConversion = verifiedConversion; }
}

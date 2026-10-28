package com.codealpha.gradetracker.service;

import com.codealpha.gradetracker.model.*;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.*;

@Service
public class GradeCalculatorService {

    private final Map<String, GradingSchemeInfo> schemes = new LinkedHashMap<>();

    public GradeCalculatorService() {
        initGradingSchemes();
    }

    private void initGradingSchemes() {
        // 1. UGC / AICTE Standard 10-point
        Map<String, Double> ugcPoints = new LinkedHashMap<>();
        ugcPoints.put("O (Outstanding)", 10.0);
        ugcPoints.put("A+ (Excellent)", 9.0);
        ugcPoints.put("A (Very Good)", 8.0);
        ugcPoints.put("B+ (Good)", 7.0);
        ugcPoints.put("B (Above Average)", 6.0);
        ugcPoints.put("C (Average)", 5.0);
        ugcPoints.put("P (Pass)", 4.0);
        ugcPoints.put("F (Fail)", 0.0);
        schemes.put("UGC_10_POINT", new GradingSchemeInfo(
                "UGC_10_POINT",
                "UGC / AICTE Standard (10-Point Scale)",
                "University Grants Commission / AICTE",
                10.0,
                ugcPoints,
                "AICTE Official Guideline: Equivalent Percentage = (CGPA - 0.75) * 10 (or [CGPA - 0.5] * 10 per 2018 notification)",
                true
        ));

        // 2. Mumbai University CBCS
        Map<String, Double> muPoints = new LinkedHashMap<>();
        muPoints.put("O (Outstanding 80-100)", 10.0);
        muPoints.put("A+ (Excellent 70-79.99)", 9.0);
        muPoints.put("A (Very Good 60-69.99)", 8.0);
        muPoints.put("B+ (Good 55-59.99)", 7.0);
        muPoints.put("B (Above Average 50-54.99)", 6.0);
        muPoints.put("C (Average 45-49.99)", 5.0);
        muPoints.put("D (Pass 40-44.99)", 4.0);
        muPoints.put("F (Fail < 40)", 0.0);
        schemes.put("MUMBAI_CBCS", new GradingSchemeInfo(
                "MUMBAI_CBCS",
                "Mumbai University (CBCS 10-Point)",
                "University of Mumbai",
                10.0,
                muPoints,
                "Mumbai University Official Circular: Percentage = 7.25 * CGPA + 11 (for CGPA >= 7.0), or 7.1 * CGPA + 12 (for 6.00-6.99)",
                true
        ));

        // 3. VTU Karnataka
        Map<String, Double> vtuPoints = new LinkedHashMap<>();
        vtuPoints.put("O (Outstanding 90-100)", 10.0);
        vtuPoints.put("A+ (Excellent 80-89)", 9.0);
        vtuPoints.put("A (Very Good 70-79)", 8.0);
        vtuPoints.put("B+ (Good 60-69)", 7.0);
        vtuPoints.put("B (Above Avg 55-59)", 6.0);
        vtuPoints.put("C (Average 50-54)", 5.0);
        vtuPoints.put("P (Pass 40-49)", 4.0);
        vtuPoints.put("F (Fail < 40)", 0.0);
        schemes.put("VTU_10_POINT", new GradingSchemeInfo(
                "VTU_10_POINT",
                "VTU Karnataka (CBCS 10-Point)",
                "Visvesvaraya Technological University",
                10.0,
                vtuPoints,
                "VTU Official Formula: Percentage = (CGPA - 0.75) * 10",
                true
        ));

        // 4. Anna University
        Map<String, Double> annaPoints = new LinkedHashMap<>();
        annaPoints.put("O (Outstanding 91-100)", 10.0);
        annaPoints.put("A+ (Excellent 81-90)", 9.0);
        annaPoints.put("A (Very Good 71-80)", 8.0);
        annaPoints.put("B+ (Good 61-70)", 7.0);
        annaPoints.put("B (Average 50-60)", 6.0);
        annaPoints.put("RA (Re-Appearance < 50)", 0.0);
        schemes.put("ANNA_10_POINT", new GradingSchemeInfo(
                "ANNA_10_POINT",
                "Anna University (10-Point Scale)",
                "Anna University Chennai",
                10.0,
                annaPoints,
                "Anna University Regulation: Equivalent Percentage = CGPA * 10",
                true
        ));

        // 5. US Standard 4.0 GPA
        Map<String, Double> usPoints = new LinkedHashMap<>();
        usPoints.put("A+ (4.0)", 4.0);
        usPoints.put("A (4.0)", 4.0);
        usPoints.put("A- (3.7)", 3.7);
        usPoints.put("B+ (3.3)", 3.3);
        usPoints.put("B (3.0)", 3.0);
        usPoints.put("B- (2.7)", 2.7);
        usPoints.put("C+ (2.3)", 2.3);
        usPoints.put("C (2.0)", 2.0);
        usPoints.put("D (1.0)", 1.0);
        usPoints.put("F (0.0)", 0.0);
        schemes.put("US_4_SCALE", new GradingSchemeInfo(
                "US_4_SCALE",
                "United States Collegiate (4.0 Scale)",
                "US Academic Standard",
                4.0,
                usPoints,
                "No universal linear conversion exists for 4.0 scale. Institutional WES credential evaluation required.",
                false
        ));
    }

    public Collection<GradingSchemeInfo> getAllSchemes() {
        return schemes.values();
    }

    public GradingSchemeInfo getScheme(String schemeId) {
        return schemes.getOrDefault(schemeId, schemes.get("UGC_10_POINT"));
    }

    public GradeAnalysisResult analyzeStudentPerformance(StudentGradeRequest request) {
        GradeAnalysisResult result = new GradeAnalysisResult();
        result.setStudentName(request.getStudentName() != null && !request.getStudentName().trim().isEmpty()
                ? request.getStudentName().trim() : "Student");
        result.setUniversity(request.getUniversity() != null ? request.getUniversity() : "Autonomous University");
        result.setAcademicYear(request.getAcademicYear() != null ? request.getAcademicYear() : "Year 1");
        result.setSemester(request.getSemester() != null ? request.getSemester() : "Semester 1");
        result.setGradingScheme(request.getGradingScheme() != null ? request.getGradingScheme() : "UGC_10_POINT");

        GradingSchemeInfo schemeInfo = getScheme(result.getGradingScheme());
        result.setFormulaVerificationNotice(schemeInfo.getOfficialFormulaDescription());

        // 1. Calculate Percentage & Marks Stats using Java ArrayList
        ArrayList<SubjectMark> marksList = request.getSubjectMarks();
        boolean hasMarks = marksList != null && !marksList.isEmpty();

        double totalMarksObtained = 0.0;
        double totalMaxMarks = 0.0;
        double highestMark = -1.0;
        String highestSub = "";
        double lowestMark = Double.MAX_VALUE;
        String lowestSub = "";
        int validMarkSubjectsCount = 0;

        if (hasMarks) {
            for (SubjectMark sm : marksList) {
                if (sm.getName() == null || sm.getName().trim().isEmpty()) {
                    continue;
                }
                double obt = Math.max(0.0, sm.getMarksObtained());
                double max = sm.getMaxMarks() > 0 ? sm.getMaxMarks() : 100.0;
                totalMarksObtained += obt;
                totalMaxMarks += max;
                validMarkSubjectsCount++;

                double percentageForSubject = (obt / max) * 100.0;
                if (percentageForSubject > highestMark) {
                    highestMark = percentageForSubject;
                    highestSub = sm.getName().trim() + " (" + round(obt) + "/" + round(max) + ")";
                }
                if (percentageForSubject < lowestMark) {
                    lowestMark = percentageForSubject;
                    lowestSub = sm.getName().trim() + " (" + round(obt) + "/" + round(max) + ")";
                }
            }
        }

        if (validMarkSubjectsCount > 0 && totalMaxMarks > 0) {
            double overallPct = (totalMarksObtained / totalMaxMarks) * 100.0;
            result.setTotalMarksObtained(round(totalMarksObtained));
            result.setTotalMaxMarks(round(totalMaxMarks));
            result.setPercentage(round(overallPct));
            result.setHighestScore(round(highestMark));
            result.setHighestSubject(highestSub);
            result.setLowestScore(round(lowestMark));
            result.setLowestSubject(lowestSub);
            result.setAverageMarks(round(totalMarksObtained / validMarkSubjectsCount));
            result.setSubjectCount(validMarkSubjectsCount);
        } else {
            result.setTotalMarksObtained(0.0);
            result.setTotalMaxMarks(0.0);
            result.setPercentage(0.0);
            result.setHighestScore(0.0);
            result.setLowestScore(0.0);
            result.setAverageMarks(0.0);
            result.setSubjectCount(0);
        }

        // 2. Calculate SGPA and CGPA using Java ArrayList
        ArrayList<SubjectGrade> gradeList = request.getSubjectGrades();
        boolean hasGrades = gradeList != null && !gradeList.isEmpty();

        double currentSemesterWeightedPoints = 0.0;
        double currentSemesterCredits = 0.0;

        if (hasGrades) {
            for (SubjectGrade sg : gradeList) {
                if (sg.getName() == null || sg.getName().trim().isEmpty()) {
                    continue;
                }
                double credits = Math.max(0.5, sg.getCredits());
                double gradePt = Math.max(0.0, sg.getGradePoint());
                currentSemesterWeightedPoints += (credits * gradePt);
                currentSemesterCredits += credits;
            }
        }

        double semesterSgpa = currentSemesterCredits > 0
                ? round(currentSemesterWeightedPoints / currentSemesterCredits)
                : 0.0;
        result.setSemesterSgpa(semesterSgpa);
        result.setCurrentSemesterCredits(round(currentSemesterCredits));

        // Cumulative CGPA Calculation incorporating past semesters
        ArrayList<SemesterRecord> pastList = request.getPastSemesters();
        double totalWeightedGradePoints = currentSemesterWeightedPoints;
        double totalCredits = currentSemesterCredits;

        Map<String, List<Double>> yearSgpaMap = new LinkedHashMap<>();
        // Current semester attribution to year
        String curYear = result.getAcademicYear();
        if (currentSemesterCredits > 0) {
            yearSgpaMap.computeIfAbsent(curYear, k -> new ArrayList<>()).add(semesterSgpa);
        }

        if (pastList != null) {
            for (SemesterRecord rec : pastList) {
                if (rec.getCredits() > 0 && rec.getSgpa() >= 0) {
                    totalWeightedGradePoints += (rec.getSgpa() * rec.getCredits());
                    totalCredits += rec.getCredits();
                    String yr = (rec.getAcademicYear() != null && !rec.getAcademicYear().isEmpty())
                            ? rec.getAcademicYear() : "Year 1";
                    yearSgpaMap.computeIfAbsent(yr, k -> new ArrayList<>()).add(rec.getSgpa());
                }
            }
        }

        double cumulativeCgpa = totalCredits > 0
                ? round(totalWeightedGradePoints / totalCredits)
                : semesterSgpa;
        result.setCumulativeCgpa(cumulativeCgpa);
        result.setTotalCumulativeCredits(round(totalCredits));

        // Year-wise CGPA aggregation
        Map<String, Double> yearWiseCgpa = new LinkedHashMap<>();
        for (Map.Entry<String, List<Double>> entry : yearSgpaMap.entrySet()) {
            List<Double> sgpas = entry.getValue();
            double sum = 0.0;
            for (Double d : sgpas) sum += d;
            yearWiseCgpa.put(entry.getKey(), round(sum / sgpas.size()));
        }
        result.setYearWiseCgpa(yearWiseCgpa);

        // 3. Validation & Performance Reaction Logic
        evaluatePerformanceReactions(result, schemeInfo, validMarkSubjectsCount, hasGrades);

        return result;
    }

    private void evaluatePerformanceReactions(GradeAnalysisResult result,
                                             GradingSchemeInfo schemeInfo,
                                             int validMarkSubjectsCount,
                                             boolean hasGrades) {
        ArrayList<String> suggestions = new ArrayList<>();
        ArrayList<String> errors = new ArrayList<>();

        double pct = result.getPercentage();
        double cgpa = result.getCgpa();
        double maxScale = schemeInfo.getMaxGradePoint();

        // Normalizing CGPA threshold if scale is 4.0
        double highCgpaThreshold = (maxScale == 4.0) ? 3.0 : 7.0;
        double midCgpaThreshold = (maxScale == 4.0) ? 2.0 : 5.0;

        if (validMarkSubjectsCount == 0 && !hasGrades) {
            result.setValid(false);
            errors.add("Please input at least one subject mark or grade to trigger academic analysis.");
            result.setErrorMessages(errors);
            result.setReactionCode("INCOMPLETE");
            result.setReactionTitle("AWAITING ACADEMIC TELEMETRY");
            result.setReactionSubtitle("Enter subject marks on the left and grades on the right.");
            result.setVoiceText("Greetings, scholar! Input your academic data to unlock performance synthesis.");
            result.setAnimationType("NEUTRAL");
            result.setAcademicSummary("No active course records detected in neural grade buffer.");
            suggestions.add("Add your semester subjects and marks in the Percentage Analyzer.");
            suggestions.add("Add credit weights and letter grades in the CGPA Analyzer.");
            result.setSuggestions(suggestions);
            return;
        }

        result.setValid(true);

        // Prompt Condition 1: Above 70% AND CGPA >= 7.0
        // "GOOD!" / Cheerful, original voice reaction / Beautiful flower blooming with golden particles
        if (pct > 70.0 && cgpa >= highCgpaThreshold) {
            result.setReactionCode("GOOD");
            result.setReactionTitle("GOOD!");
            result.setReactionSubtitle("EXEMPLARY ACADEMIC TRAJECTORY DETECTED");
            result.setAnimationType("FLOWER_BLOOM");
            result.setVoiceText("Good! Exceptional performance, scholar! Your academic matrix is blooming with brilliance. Keep conquering!");
            result.setAcademicSummary(String.format(
                    "Superlative standing across %s! You maintain an impressive %s%% overall average with a high-caliber %s CGPA.",
                    result.getUniversity(), round(pct), round(cgpa)
            ));
            suggestions.add("Publish academic papers or submit research proposals to leverage your top percentile.");
            suggestions.add("Target elite industry fellowships, postgraduate scholarships, and global internships.");
            suggestions.add("Sustain your mastery in " + (result.getHighestSubject().isEmpty() ? "major electives" : result.getHighestSubject()));
            suggestions.add("Mentor peer study circles to deepen theoretical retention and leadership prestige.");
        }
        // Prompt Condition 2: 50%–70% AND CGPA 5.0–<7.0
        // "PLEASE DO NOT SCROLL SO MUCH REELS!" / Funny, original voice reaction / Colorful confetti celebration
        else if (pct >= 50.0 && pct <= 70.0 && cgpa >= midCgpaThreshold && cgpa < highCgpaThreshold) {
            result.setReactionCode("REELS_WARNING");
            result.setReactionTitle("PLEASE DO NOT SCROLL SO MUCH REELS!");
            result.setReactionSubtitle("POTENTIAL UNTAPPED — HIGH ALGORITHMIC DISTRACTION DETECTED");
            result.setAnimationType("CONFETTI_CELEBRATION");
            result.setVoiceText("Please do not scroll so much reels! Put that smartphone on do-not-disturb mode and unlock your true academic beast!");
            result.setAcademicSummary(String.format(
                    "You are holding a steady ground at %s%% with a %s CGPA, but your true ceiling is significantly higher.",
                    round(pct), round(cgpa)
            ));
            suggestions.add("Lock social media apps during 7:00 PM – 10:00 PM study sprints to prevent dopamine drain.");
            suggestions.add("Prioritize high-credit subjects (" + (result.getLowestSubject().isEmpty() ? "low-scoring units" : result.getLowestSubject()) + ") for an instant SGPA jump.");
            suggestions.add("Solve past 5-year university exam question papers to spot high-yield recurring question patterns.");
            suggestions.add("Implement active recall and 25-minute Pomodoro focus blocks to beat procrastination.");
        }
        // Prompt Condition 3: Below 50% (or CGPA below threshold)
        // "THIS IS NOT FAIR FOR YOU!" / Short, dramatic, funny voice reaction / Red holographic warning
        else if (pct < 50.0 || cgpa < midCgpaThreshold) {
            result.setReactionCode("CRITICAL_WARNING");
            result.setReactionTitle("THIS IS NOT FAIR FOR YOU!");
            result.setReactionSubtitle("ACADEMIC HAZARD PROTOCOL ENGAGED — RAPID INTERVENTION REQUIRED");
            result.setAnimationType("RED_HOLOGRAM_WARNING");
            result.setVoiceText("This is not fair for you! You are built for greatness, not academic surrender. Wake up, revamp, and execute the turnaround now!");
            result.setAcademicSummary(String.format(
                    "Critical alert: Current percentage sits at %s%% with a %s CGPA. Immediate strategic recalibration is mandatory.",
                    round(pct), round(cgpa)
            ));
            suggestions.add("Immediately schedule office hours with your course professors for one-on-one conceptual clarification.");
            suggestions.add("Form an urgent turnaround timetable focusing on core syllabus essentials before remediation exams.");
            suggestions.add("Address root deficiencies in " + (result.getLowestSubject().isEmpty() ? "your weakest course" : result.getLowestSubject()) + " through peer tutoring.");
            suggestions.add("Eliminate all non-essential screen time; commit 3 hours of focused daily practice.");
        }
        // Handle Conflicting / Borderline Cases appropriately without unverified conversion
        else {
            result.setReactionCode("CONFLICTING_DATA");
            result.setReactionTitle("PLEASE DO NOT SCROLL SO MUCH REELS!");
            result.setReactionSubtitle("DIVERGENT METRICS DETECTED — REBALANCE EFFORTS");
            result.setAnimationType("CONFETTI_CELEBRATION");
            result.setVoiceText("Attention! Your marks and CGPA reflect divergent trends. Balance your theory and credit courses!");
            result.setAcademicSummary(String.format(
                    "Recorded %s%% marks and %s CGPA. Per official guidelines, we avoid unverified percentage-to-CGPA estimation.",
                    round(pct), round(cgpa)
            ));
            suggestions.add("Cross-reference your credit weights: courses with higher credits dictate your cumulative standing.");
            suggestions.add("Maintain consistency between internal practical scores and external theoretical papers.");
            suggestions.add("Review grading norms under " + schemeInfo.getName());
        }

        result.setSuggestions(suggestions);
    }

    private double round(double val) {
        return BigDecimal.valueOf(val).setScale(2, RoundingMode.HALF_UP).doubleValue();
    }
}

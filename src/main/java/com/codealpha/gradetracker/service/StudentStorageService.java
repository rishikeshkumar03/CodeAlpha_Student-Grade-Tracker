package com.codealpha.gradetracker.service;

import com.codealpha.gradetracker.model.StudentSummary;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.locks.ReentrantReadWriteLock;

@Service
public class StudentStorageService {

    private final ArrayList<StudentSummary> studentList = new ArrayList<>();
    private final File storageFile = new File("data/student_records.json");
    private final ObjectMapper objectMapper = new ObjectMapper().enable(SerializationFeature.INDENT_OUTPUT);
    private final ReentrantReadWriteLock rwLock = new ReentrantReadWriteLock();

    @PostConstruct
    public void init() {
        loadDataFromFile();
        if (studentList.isEmpty()) {
            seedSampleStudents();
        }
    }

    private void seedSampleStudents() {
        studentList.add(new StudentSummary(
                "Aria Vance", "Stanford Quantum Institute", "Year 4", "Semester 8",
                92.4, 9.6, 9.45, "GOOD!"
        ));
        studentList.add(new StudentSummary(
                "Kaelen Drake", "Mumbai Cyber Tech", "Year 3", "Semester 5",
                64.5, 6.4, 6.20, "PLEASE DO NOT SCROLL SO MUCH REELS!"
        ));
        studentList.add(new StudentSummary(
                "Nova Sterling", "VTU Digital Academy", "Year 1", "Semester 2",
                46.8, 4.3, 4.35, "THIS IS NOT FAIR FOR YOU!"
        ));
        persistToFile();
    }

    private void loadDataFromFile() {
        rwLock.writeLock().lock();
        try {
            if (storageFile.exists() && storageFile.length() > 0) {
                ArrayList<StudentSummary> loaded = objectMapper.readValue(storageFile, new TypeReference<ArrayList<StudentSummary>>() {});
                if (loaded != null) {
                    studentList.clear();
                    studentList.addAll(loaded);
                }
            }
        } catch (IOException e) {
            System.err.println("Warning: Could not read student records file: " + e.getMessage());
        } finally {
            rwLock.writeLock().unlock();
        }
    }

    private void persistToFile() {
        try {
            File parent = storageFile.getParentFile();
            if (parent != null && !parent.exists()) {
                parent.mkdirs();
            }
            objectMapper.writeValue(storageFile, studentList);
        } catch (IOException e) {
            System.err.println("Error saving student records: " + e.getMessage());
        }
    }

    public StudentSummary save(StudentSummary summary) {
        rwLock.writeLock().lock();
        try {
            // Check if existing student by same name & semester to update, else append
            boolean updated = false;
            for (int i = 0; i < studentList.size(); i++) {
                StudentSummary cur = studentList.get(i);
                if (cur.getStudentName().equalsIgnoreCase(summary.getStudentName())
                        && cur.getSemester().equalsIgnoreCase(summary.getSemester())) {
                    studentList.set(i, summary);
                    updated = true;
                    break;
                }
            }
            if (!updated) {
                studentList.add(0, summary); // Add latest to top
            }
            persistToFile();
            return summary;
        } finally {
            rwLock.writeLock().unlock();
        }
    }

    public ArrayList<StudentSummary> getAllStudents() {
        rwLock.readLock().lock();
        try {
            return new ArrayList<>(studentList);
        } finally {
            rwLock.readLock().unlock();
        }
    }

    public boolean deleteStudent(String id) {
        rwLock.writeLock().lock();
        try {
            boolean removed = studentList.removeIf(s -> s.getId().equals(id));
            if (removed) {
                persistToFile();
            }
            return removed;
        } finally {
            rwLock.writeLock().unlock();
        }
    }

    public void clearAll() {
        rwLock.writeLock().lock();
        try {
            studentList.clear();
            persistToFile();
        } finally {
            rwLock.writeLock().unlock();
        }
    }
}

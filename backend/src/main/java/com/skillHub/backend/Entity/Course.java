package com.skillHub.backend.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.util.List;

@Entity
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String description;
    private String category;
    private String thumbnail;
    @OneToMany(mappedBy = "course",cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<Lesson> lesson;
    @OneToMany(mappedBy = "course",cascade = CascadeType.ALL)
    @JsonBackReference(value = "course-enrollment")
    private List<Enrollment> enrollment;
    @OneToMany(mappedBy = "course",cascade = CascadeType.ALL)
    private List<Certificate> certificate;
    public Course() {
    }

    public Course(Long id, String title, String description, String category, String thumbnail, List<Lesson> lesson, List<Enrollment> enrollment, List<Certificate> certificate) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.category = category;
        this.thumbnail = thumbnail;
        this.lesson = lesson;
        this.enrollment = enrollment;
        this.certificate = certificate;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getThumbnail() {
        return thumbnail;
    }

    public void setThumbnail(String thumbnail) {
        this.thumbnail = thumbnail;
    }

    public List<Lesson> getLesson() {
        return lesson;
    }

    public void setLesson(List<Lesson> lesson) {
        this.lesson = lesson;
    }

    public List<Enrollment> getEnrollment() {
        return enrollment;
    }

    public void setEnrollment(List<Enrollment> enrollment) {
        this.enrollment = enrollment;
    }

    public List<Certificate> getCertificate() {
        return certificate;
    }

    public void setCertificate(List<Certificate> certificate) {
        this.certificate = certificate;
    }
}

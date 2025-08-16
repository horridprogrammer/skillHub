package com.skillHub.backend.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.util.Date;

@Entity
public class Enrollment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Date enrollmentDate;
    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonBackReference(value = "user-enrollment")
    private User user;
    @ManyToOne
    @JoinColumn(name = "course_id")
    @JsonManagedReference(value="course-enrollment")
    private Course course;

    public Enrollment() {
    }

    public Enrollment(Long id, Date enrollmentDate, User user, Course course) {
        this.id = id;
        this.enrollmentDate = enrollmentDate;
        this.user = user;
        this.course = course;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getEnrollmentDate() {
        return enrollmentDate;
    }

    public void setEnrollmentDate(Date enrollmentDate) {
        this.enrollmentDate = enrollmentDate;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Course getCourse() {
        return course;
    }

    public void setCourse(Course course) {
        this.course = course;
    }
}

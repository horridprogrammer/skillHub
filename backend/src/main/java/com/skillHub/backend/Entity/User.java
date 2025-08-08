package com.skillHub.backend.Entity;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "\"user\"")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String email;
    private String password;
    private String role;
    @OneToMany(mappedBy = "user",cascade = CascadeType.ALL)
    private List<Enrollment> enrollment;
    @OneToMany(mappedBy = "user",cascade = CascadeType.ALL)
    private List<Progress> progress;
    @OneToMany(mappedBy = "user",cascade = CascadeType.ALL)
    private List<Certificate> certificate;
    public User() {
    }

    public User(Long id, String name, String email, String password, String role, List<Enrollment> enrollment, List<Progress> progress, List<Certificate> certificate) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
        this.enrollment = enrollment;
        this.progress = progress;
        this.certificate = certificate;
    }

    public Long getId() {

        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public List<Enrollment> getEnrollment() {
        return enrollment;
    }

    public void setEnrollment(List<Enrollment> enrollment) {
        this.enrollment = enrollment;
    }

    public List<Progress> getProgress() {
        return progress;
    }

    public void setProgress(List<Progress> progress) {
        this.progress = progress;
    }

    public List<Certificate> getCertificate() {
        return certificate;
    }

    public void setCertificate(List<Certificate> certificate) {
        this.certificate = certificate;
    }
}

package com.skillHub.backend.Entity;

import jakarta.persistence.*;

@Entity
public class Quiz {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String questions;
    private String answers;
    @ManyToOne
    @JoinColumn(name = "lesson_id")
    private Lesson lesson;

    public Quiz() {
    }

    public Quiz(Long id, String questions, String answers, Lesson lesson) {
        this.id = id;
        this.questions = questions;
        this.answers = answers;
        this.lesson = lesson;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getQuestions() {
        return questions;
    }

    public void setQuestions(String questions) {
        this.questions = questions;
    }

    public String getAnswers() {
        return answers;
    }

    public void setAnswers(String answers) {
        this.answers = answers;
    }

    public Lesson getLesson() {
        return lesson;
    }

    public void setLesson(Lesson lesson) {
        this.lesson = lesson;
    }
}

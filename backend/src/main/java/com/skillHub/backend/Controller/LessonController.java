package com.skillHub.backend.Controller;

import com.skillHub.backend.Entity.Lesson;
import com.skillHub.backend.Service.LessonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/lesson")
public class LessonController {
    @Autowired
    public LessonService lessonser;

    @PostMapping("/add")
    public Lesson addLesson(@RequestBody Lesson lesson){
        return lessonser.addLesson(lesson);
    }

    @GetMapping
    public List<Lesson> getAllLesson(){
        return lessonser.getAllLesson();
    }

    @GetMapping("/{lessonId}")
    public Lesson getLessonById(@PathVariable Long lessonId){
        return lessonser.getLessonById(lessonId);
    }

    @PutMapping("/{lessonId}")
    public Lesson updateLesson(@PathVariable Long lessonId,@RequestBody Lesson lesson){
        return lessonser.updateLesson(lessonId,lesson);
    }

    @DeleteMapping("/{lessonId}")
    public void deleteLesson(@PathVariable Long lessonId){
        lessonser.deleteLesson(lessonId);
    }
}

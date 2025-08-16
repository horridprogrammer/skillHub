package com.skillHub.backend.Controller;

import com.skillHub.backend.Entity.Course;
import com.skillHub.backend.Entity.Lesson;
import com.skillHub.backend.Service.CourseService;
import com.skillHub.backend.Service.LessonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
@RequestMapping("/api/lesson")
public class LessonController {
    @Autowired
    public LessonService lessonser;


    @Autowired
    private CourseService courseser;

    @PostMapping("/add")
    public Lesson addLesson(@RequestParam String title, @RequestParam MultipartFile videoUrl,@RequestParam Integer lessonOrder,@RequestParam Long course_id) throws IOException {

        String fileName = System.currentTimeMillis() + "_" + videoUrl.getOriginalFilename();
        Path uploadPath = Paths.get("videUploads");
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        Files.write(uploadPath.resolve(fileName),videoUrl.getBytes());

        Lesson lesson = new Lesson();
        lesson.setTitle(title);
        lesson.setVideoUrl(fileName);
        lesson.setLessonOrder(lessonOrder);
        lesson.setCourse(courseser.getCourseById(course_id));

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

    @PutMapping(value = "/{lessonId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Lesson updateLesson(
            @PathVariable Long lessonId,
            @RequestParam String title,
            @RequestParam(required = false) MultipartFile video, // video is optional
            @RequestParam Integer lessonOrder,
            @RequestParam("course_id") Long courseId
    ) throws IOException {

        Lesson existingLesson = lessonser.getLessonById(lessonId);

        existingLesson.setTitle(title);
        existingLesson.setLessonOrder(lessonOrder);
        existingLesson.setCourse(courseser.getCourseById(courseId));

        if (video != null && !video.isEmpty()) {
            String fileName = System.currentTimeMillis() + "_" + video.getOriginalFilename();
            Path uploadPath = Paths.get("videUploads");
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }
            Files.write(uploadPath.resolve(fileName), video.getBytes());
            existingLesson.setVideoUrl(fileName);
        }

        return lessonser.addLesson(existingLesson);
    }


    @DeleteMapping("/{lessonId}")
    public void deleteLesson(@PathVariable Long lessonId){
        lessonser.deleteLesson(lessonId);
    }
}

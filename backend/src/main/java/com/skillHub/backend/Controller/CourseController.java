package com.skillHub.backend.Controller;

import com.skillHub.backend.Entity.Course;
import com.skillHub.backend.Repository.CourseRepository;
import com.skillHub.backend.Service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
@RequestMapping("/api/course")
public class CourseController {
    @Autowired
    public CourseService courseser;

    @PostMapping("/add")
    public Course addCourse(
            @RequestParam("title") String title,
            @RequestParam("description") String description,
            @RequestParam("category") String category,
            @RequestParam("thumbnail") MultipartFile thumbnailFile
    ) throws IOException {
        // Generate unique file name
        String fileName = System.currentTimeMillis() + "_" + thumbnailFile.getOriginalFilename();

        // Create uploads directory if not exists
        Path uploadPath = Paths.get("uploads");
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        // Save the file
        Files.write(uploadPath.resolve(fileName), thumbnailFile.getBytes());

        // Build and save course
        Course course = new Course();
        course.setTitle(title);
        course.setDescription(description);
        course.setCategory(category);
        course.setThumbnail(fileName);

        return courseser.addCourse(course);
    }



    @GetMapping
    public List<Course> getAllCourses(){
        return courseser.getAllCourse();
    }

    @GetMapping("/{courseId}")
    public Course getCourseBYId(@PathVariable Long courseId){
        return courseser.getCourseById(courseId);
    }

    @PutMapping("/{courseId}")
    public Course updateCourse(@PathVariable Long courseId,@RequestBody Course course){
        return  courseser.updateCourse(courseId,course);
    }

    @DeleteMapping("/{courseId}")
    public void deleteCourse(@PathVariable Long courseId){
        courseser.deleteCourse(courseId);
    }

}

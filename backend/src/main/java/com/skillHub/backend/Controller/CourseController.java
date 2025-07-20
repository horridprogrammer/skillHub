package com.skillHub.backend.Controller;

import com.skillHub.backend.Entity.Course;
import com.skillHub.backend.Repository.CourseRepository;
import com.skillHub.backend.Service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/course")
public class CourseController {
    @Autowired
    public CourseService courseser;

    @PostMapping("/add")
    public Course addCourse(Course course){
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

    @GetMapping("/{courseId}")
    public Course getCourseById(@PathVariable Long courseId){
        return courseser.getCourseById(courseId);
    }
}

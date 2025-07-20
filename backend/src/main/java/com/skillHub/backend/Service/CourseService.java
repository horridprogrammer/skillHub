package com.skillHub.backend.Service;

import com.skillHub.backend.Entity.Course;
import com.skillHub.backend.Repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CourseService {

    @Autowired
    public CourseRepository courserepo;

    public Course addCourse(Course course){
        return courserepo.save(course);
    }

    public List<Course> getAllCourse(){
        return courserepo.findAll();
    }

    public Course getCourseById(Long id){
        Course course =  courserepo.findById(id).orElse(null);
        if(course==null){
            throw new UsernameNotFoundException("Course not found");
        }
        return course;
    }

    public Course updateCourse(Long id,Course course){
        Course updatedCourse = courserepo.findById(id).orElse(null);
        if(updatedCourse==null){
            return courserepo.save(course);
        }
        updatedCourse.setTitle(course.getTitle());
        updatedCourse.setDescription(course.getDescription());
        updatedCourse.setCategory(course.getCategory());
        updatedCourse.setThumbnail(course.getThumbnail());
        updatedCourse.setLesson(course.getLesson());
        updatedCourse.setEnrollment(course.getEnrollment());
        updatedCourse.setCertificate(course.getCertificate());

        return courserepo.save(updatedCourse);
    }

    public void deleteCourse(Long id){
        courserepo.deleteById(id);
    }


}

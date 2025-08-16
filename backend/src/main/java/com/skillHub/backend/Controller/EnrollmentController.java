package com.skillHub.backend.Controller;

import com.skillHub.backend.Entity.Enrollment;
import com.skillHub.backend.Service.EnrollmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/enrollment")
public class EnrollmentController {

    @Autowired
    public EnrollmentService enrollmentser;


    @PostMapping("/add")
    public Enrollment addEnrollment(@RequestBody Enrollment enrollment){
        return enrollmentser.addEnrollment(enrollment);
    }

    @GetMapping
    public List<Enrollment> getAllEnrollment(){
        return enrollmentser.getAllEnrollment();
    }

    @GetMapping("/{enrollmentId}")
    public Enrollment getEnrollmentById(@PathVariable Long enrollmentId){
        return enrollmentser.getEnrollmentById(enrollmentId);
    }

    @GetMapping("/user/{userId}")
    public List<Enrollment> getEnrollmentsByUserId(@PathVariable Long userId){
        return enrollmentser.getEnrollmentsByUserId(userId);
    }

    @PutMapping("/{enrollmentId}")
    public Enrollment updateEnrollement(@PathVariable Long enrollmentId,@RequestBody Enrollment enrollment){
        return enrollmentser.updateEnrollment(enrollmentId,enrollment);
    }

    @DeleteMapping("/{enrollmentId}")
    public void deleteEnrollment(@PathVariable Long enrollmentId){
        enrollmentser.deleteEnrollment(enrollmentId);
    }
}

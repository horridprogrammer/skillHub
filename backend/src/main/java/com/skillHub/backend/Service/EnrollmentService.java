package com.skillHub.backend.Service;

import com.skillHub.backend.Controller.EnrollmentController;
import com.skillHub.backend.Entity.Enrollment;
import com.skillHub.backend.Repository.EnrollmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class EnrollmentService {
    @Autowired
    public EnrollmentRepository enrollmentrepo;

    public Enrollment addEnrollment(Enrollment enrollment){
        if(enrollment.getEnrollmentDate()==null){
            enrollment.setEnrollmentDate(new Date());
        }
        return enrollmentrepo.save(enrollment);
    }

    public List<Enrollment> getAllEnrollment(){
        return enrollmentrepo.findAll();
    }

    public Enrollment getEnrollmentById(Long id){
        Enrollment enrollment = enrollmentrepo.findById(id).orElse(null);
        if(enrollment==null){
            throw new UsernameNotFoundException("Enrollment not Found");
        }
        return enrollment;
    }

    public Enrollment updateEnrollment(Long id,Enrollment enrollment) {
        Enrollment updatedEnrollment = enrollmentrepo.findById(id).orElse(null);
        if (enrollment == null) {
            return enrollmentrepo.save(enrollment);
        }
        updatedEnrollment.setEnrollmentDate(enrollment.getEnrollmentDate());
        updatedEnrollment.setUser(enrollment.getUser());
        updatedEnrollment.setCourse(enrollment.getCourse());

        return enrollmentrepo.save(updatedEnrollment);
    }

    public void deleteEnrollment(Long id){
        enrollmentrepo.deleteById(id);
    }

    public List<Enrollment> getEnrollmentsByUserId(long userId){
        return enrollmentrepo.findByUserId(userId);
    }
}

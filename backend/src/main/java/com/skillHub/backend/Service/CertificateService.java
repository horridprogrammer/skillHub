package com.skillHub.backend.Service;

import com.skillHub.backend.Entity.Certificate;
import com.skillHub.backend.Repository.CertificateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CertificateService {

    @Autowired
    public CertificateRepository certificateRepo;

    public Certificate addCertificate(Certificate certificate){
        return certificateRepo.save(certificate);
    }

    public List<Certificate> getAllCertificates(){
        return certificateRepo.findAll();
    }

    public Certificate getCertificateById(Long id){
        Certificate certificate = certificateRepo.findById(id).orElse(null);
        if(certificate==null){
            throw new UsernameNotFoundException("Certificate not Found");
        }
        return certificate;
    }

    public Certificate updateCertificate(Long id,Certificate certificate){
        Certificate updatedCertificate = certificateRepo.findById(id).orElse(null);
        if(updatedCertificate==null){
            return certificateRepo.save(certificate);
        }
        updatedCertificate.setIssueDate(certificate.getIssueDate());
        updatedCertificate.setUrl(certificate.getUrl());
        updatedCertificate.setUser(certificate.getUser());
        updatedCertificate.setCourse(certificate.getCourse());

        return certificateRepo.save(updatedCertificate);
    }

    public void deleteCertificate(Long id){
        certificateRepo.deleteById(id);
    }
}

package com.skillHub.backend.Controller;


import com.skillHub.backend.Entity.Certificate;
import com.skillHub.backend.Service.CertificateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/certificate")
public class CertificateController {

    @Autowired
    public CertificateService certificateser;

    @PostMapping("/add")
    public Certificate addCertificate(@RequestBody Certificate certificate){
        return certificateser.addCertificate(certificate);
    }

    @GetMapping
    public List<Certificate> getAllCertificate(){
        return certificateser.getAllCertificates();
    }

    @GetMapping("/{certificateId}")
    public Certificate getCertificateById(@PathVariable Long certificateId){
        return certificateser.getCertificateById(certificateId);
    }

    @PutMapping("/{certificateId}")
    public Certificate updateCertificate(@PathVariable Long certificateId,Certificate certificate){
        return certificateser.getCertificateById(certificateId);
    }

    @DeleteMapping("/{certificateId}")
    public void deleteCertificate(@PathVariable Long certificateId){
        certificateser.deleteCertificate(certificateId);
    }
}

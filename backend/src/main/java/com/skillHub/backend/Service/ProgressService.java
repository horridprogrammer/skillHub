package com.skillHub.backend.Service;

import com.skillHub.backend.Entity.Progress;
import com.skillHub.backend.Repository.ProgressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProgressService {
    @Autowired
    public ProgressRepository progressrepo;

    public Progress addProgress(Progress progress){
        return progressrepo.save(progress);
    }

    public List<Progress> getAllProgress(){
        return progressrepo.findAll();
    }

    public Progress getProgressById(Long id){
        Progress progress = progressrepo.findById(id).orElse(null);
        if(progress==null){
            throw new UsernameNotFoundException("Progress Not Found");
        }
        return progress;
    }

    public Progress updateProgress(Long id,Progress progress){
        Progress updatedProgress = progressrepo.findById(id).orElse(null);
        if(updatedProgress==null){
            return progressrepo.save(progress);
        }
        updatedProgress.setCompleted(progress.getCompleted());
        updatedProgress.setUser(progress.getUser());
        updatedProgress.setLesson(progress.getLesson());

        return progressrepo.save(updatedProgress);
    }

    public void deleteProgress(Long id){
        progressrepo.deleteById(id);
    }
}

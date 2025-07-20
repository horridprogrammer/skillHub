package com.skillHub.backend.Controller;

import com.skillHub.backend.Entity.Progress;
import com.skillHub.backend.Service.ProgressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/progress")
public class ProgressController {
    @Autowired
    public ProgressService progressser;

    @PostMapping("/add")
    public Progress addProgress(@RequestBody Progress progress){
        return progressser.addProgress(progress);
    }

    @GetMapping
    public List<Progress> getAllProgress(){
        return  progressser.getAllProgress();
    }

    @GetMapping("/{progressId}")
    public Progress getProgressById(@PathVariable long progressId){
        return progressser.getProgressById(progressId);
    }

    @PostMapping("/{progressId}")
    public Progress updateProgress(@PathVariable Long progressId,@RequestBody Progress progress){
        return progressser.updateProgress(progressId,progress);
    }

    @DeleteMapping("/{progressId}")
    public void deleteProgress(@PathVariable Long progressId){
        progressser.deleteProgress(progressId);
    }
}

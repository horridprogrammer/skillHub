package com.skillHub.backend.Service;

import com.skillHub.backend.Entity.Lesson;
import com.skillHub.backend.Repository.LessonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LessonService {
    @Autowired
    public LessonRepository lessonrepo;

    public Lesson addLesson(Lesson lesson){
        return lessonrepo.save(lesson);
    }

    public List<Lesson> getAllLesson(){
        return lessonrepo.findAll();
    }

    public Lesson getLessonById(Long id){
        Lesson lesson = lessonrepo.findById(id).orElse(null);

        if(lesson==null){
            throw new UsernameNotFoundException("Lesson not Found");
        }
        return lesson;
    }

    public Lesson updateLesson(Long id,Lesson lesson){
        Lesson updatedLesson = lessonrepo.findById(id).orElse(null);
        if(updatedLesson==null){
            return lessonrepo.save(lesson);
        }
        updatedLesson.setTitle(lesson.getTitle());
        updatedLesson.setVideoUrl(lesson.getVideoUrl());
        updatedLesson.setLessonOrder(lesson.getLessonOrder());
        updatedLesson.setCourse(lesson.getCourse());
        updatedLesson.setQuiz(lesson.getQuiz());
        updatedLesson.setProgress(lesson.getProgress());

        return lessonrepo.save(updatedLesson);
    }

    public void deleteLesson(Long id){
        lessonrepo.deleteById(id);
    }
}

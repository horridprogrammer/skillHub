package com.skillHub.backend.Service;

import com.skillHub.backend.Entity.Quiz;
import com.skillHub.backend.Repository.QuizRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuizService {

    @Autowired
    public QuizRepository quizrepo;

    public Quiz addQuiz(Quiz quiz){
        return quizrepo.save(quiz);
    }

    public List<Quiz> getAllQuiz(){
        return quizrepo.findAll();
    }

    public Quiz updateQuiz(Long id,Quiz quiz){
        Quiz updatedQuiz = quizrepo.findById(id).orElse(null);
        if(updatedQuiz==null){
            return quizrepo.save(quiz);
        }
        updatedQuiz.setAnswers(quiz.getAnswers());
        updatedQuiz.setLesson(quiz.getLesson());
        updatedQuiz.setQuestions(quiz.getQuestions());

        return quizrepo.save(updatedQuiz);
    }

    public void deleteQuiz(Long id){
        quizrepo.deleteById(id);
    }

    public Quiz getQuiz(Long id) {
        return quizrepo.findById(id).orElse(null);
    }
}

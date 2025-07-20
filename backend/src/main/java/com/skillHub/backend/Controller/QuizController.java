package com.skillHub.backend.Controller;

import com.skillHub.backend.Entity.Quiz;
import com.skillHub.backend.Service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/quiz")
public class QuizController {

    @Autowired
    public QuizService quizser;

    @PostMapping("/add")
    public Quiz addQuiz(@RequestBody Quiz quiz){
        return quizser.addQuiz(quiz);
    }

    @GetMapping
    public List<Quiz> getAllQuiz(){
        return quizser.getAllQuiz();
    }

    @PutMapping("/{quizId}")
    public Quiz updateQuiz(@PathVariable Long quizId,@RequestBody Quiz quiz){
        return quizser.updateQuiz(quizId,quiz);
    }

    @DeleteMapping("/{quizId}")
    public void deleteQuiz(@PathVariable Long quizId){
        quizser.deleteQuiz(quizId);
    }
}

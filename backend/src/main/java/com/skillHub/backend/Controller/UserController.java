package com.skillHub.backend.Controller;

import com.skillHub.backend.Entity.User;
import com.skillHub.backend.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    protected UserService userser;

    @PostMapping("/add")
    public User userAdd(@RequestBody User user){
        return userser.addUser(user);
    }

    @GetMapping
    public List<User> getAllUsers(){
        return userser.getAllUser();
    }

    @PutMapping("/{userId}")
    public User updateUser(@PathVariable Long userId,@RequestBody User user){
        return userser.updateUser(userId,user);
    }

    @DeleteMapping("/{userId}")
    public void deleteUser(@PathVariable Long userId){
        userser.deleteUser(userId);
    }

    @GetMapping("/{userId}")
    public User getUserById(@PathVariable Long userId){
        return  userser.getByUserId(userId);
    }


}

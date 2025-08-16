package com.skillHub.backend.Service;

import com.skillHub.backend.Entity.User;
import com.skillHub.backend.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    @Autowired
    protected UserRepository userrepo;

    public User addUser(User user){
        return userrepo.save(user);
    }

    public List<User> getAllUser(){
        return userrepo.findAll();
    }

    public User updateUser(Long id,User user){
        User updatedUser = userrepo.findById(id).orElse(null);
        if(user==null){
            return userrepo.save(user);
        }
        updatedUser.setName(user.getName());
        updatedUser.setEmail(user.getEmail());
        updatedUser.setPassword(user.getPassword());
        updatedUser.setRole(user.getRole());
        updatedUser.setEnrollment(user.getEnrollment());
        updatedUser.setProgress(user.getProgress());
        updatedUser.setCertificate(user.getCertificate());

        return userrepo.save(updatedUser);
    }

    public void deleteUser(Long id){
        userrepo.deleteById(id);
    }

    public User getByUserId(Long id){
        User user =  userrepo.findById(id).orElse(null);
        if (user==null){
            throw new UsernameNotFoundException("UserName Not Found");
        }
        return user;
    }

    public User getByUserEmail(String email){
        User user = userrepo.findByEmail(email).orElse(null);
        if(user==null){
            throw new UsernameNotFoundException("UserName Not Found");
        }
        return user;
    }

}

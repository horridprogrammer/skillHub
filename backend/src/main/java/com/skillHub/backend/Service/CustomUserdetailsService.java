package com.skillHub.backend.Service;

import com.skillHub.backend.CustomUserDetails;
import com.skillHub.backend.Entity.User;
import com.skillHub.backend.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserdetailsService implements UserDetailsService {

    @Autowired
    public UserRepository userrepo;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userrepo.findByEmail(email).orElseThrow(()->new UsernameNotFoundException("User Not Found "));
        return new CustomUserDetails(user);
    }
}

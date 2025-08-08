package com.skillHub.backend.Controller;

import com.skillHub.backend.Entity.LoginRequest;
import com.skillHub.backend.Jwt.JwtResponse;
import com.skillHub.backend.Jwt.JwtUtil;
import com.skillHub.backend.Service.CustomUserdetailsService;
import jakarta.validation.Valid;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private AuthenticationManager authManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private CustomUserdetailsService userDetailsService;

    @PostMapping("/login")
    public JwtResponse login(@RequestBody @Valid LoginRequest request) {
        authManager.authenticate(new UsernamePasswordAuthenticationToken(
                request.getEmail(), request.getPassword()));

        UserDetails userDetails = userDetailsService.loadUserByUsername(request.getEmail());

        String token = jwtUtil.generateToken(userDetails.getUsername());
        String role = userDetails.getAuthorities().iterator().next().getAuthority();

        return new JwtResponse(token, role);
    }
}

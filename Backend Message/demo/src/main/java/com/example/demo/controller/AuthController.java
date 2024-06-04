package com.example.demo.controller;

import com.example.demo.config.JwtProvider;
import com.example.demo.model.USER_ROLE;
import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import com.example.demo.request.LogInRequest;
import com.example.demo.response.AuthResponse;
import com.example.demo.service.CustomUserDetailsService;
import com.example.demo.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.Random;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JwtProvider jwtProvider;
    @Autowired
    private CustomUserDetailsService customUserDetailsService;
    @Autowired
    private EmailService emailService;


    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> createUserHandler(@RequestBody User user) throws Exception {

        User isEmailExist = userRepository.findByEmail(user.getEmail());

        if(isEmailExist != null) {
            if (isEmailExist.isVerify()) {
                throw new Exception("Email is already exist: " + user.getEmail());
            } else {
                // User exists but is not verified, resend the OTP
                String otp = generateOTP();
                isEmailExist.setOtp(otp);
                userRepository.save(isEmailExist);
                sendVerificationEmail(isEmailExist.getEmail(), otp);

                return new ResponseEntity<>(new AuthResponse(null, "Verification email sent again", null), HttpStatus.OK);
            }
        }


        User createdUser = new User();
        createdUser.setEmail(user.getEmail());
        createdUser.setFullName(user.getFullName());
        createdUser.setRole(user.getRole());
        createdUser.setPassword(passwordEncoder.encode(user.getPassword()));
        String otp = generateOTP();
        createdUser.setOtp(otp);

        User savedUser = userRepository.save(createdUser);
        sendVerificationEmail(savedUser.getEmail(), otp);

        Authentication authentication = new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword());
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = jwtProvider.generateToken(authentication);

        AuthResponse authResponse = new AuthResponse();
        authResponse.setJwt(jwt);
        authResponse.setMessage("Register Successfully");
        authResponse.setRole(savedUser.getRole());

        return new ResponseEntity<>(authResponse, HttpStatus.CREATED);
    }

    @PostMapping("/signin")
    public ResponseEntity<AuthResponse> signin(@RequestBody LogInRequest req){

        String username = req.getEmail();
        String password = req.getPassword();

        Authentication authentication = authenticate(username, password);

        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
        String role = authorities.isEmpty()? null : authorities.iterator().next().getAuthority();

        String jwt = jwtProvider.generateToken(authentication);

        AuthResponse authResponse = new AuthResponse();
        authResponse.setJwt(jwt);
        authResponse.setMessage("Login Successfully");
        authResponse.setRole(USER_ROLE.valueOf(role));

        return new ResponseEntity<>(authResponse, HttpStatus.OK);
    }

    @PostMapping("/verify")
    public ResponseEntity<?> verifyUser(@RequestParam String email, @RequestParam String otp){
        try{
            verify(email, otp);
            return new ResponseEntity<>("User verified successfully", HttpStatus.OK);
        } catch (RuntimeException e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    private Authentication authenticate(String username, String password) {
        UserDetails userDetails = customUserDetailsService.loadUserByUsername(username);

        if(userDetails == null){
            throw new BadCredentialsException("Invalid username....");
        }

        if(!passwordEncoder.matches(password, userDetails.getPassword())){
            throw new BadCredentialsException("Invalid Password...");
        }

        User user = userRepository.findByEmail(username);
        if (user == null) {
            throw new BadCredentialsException("User not found.");
        }

        if (!user.isVerify()) {
            throw new BadCredentialsException("User is not verified.");
        }

        return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
    }

    private String generateOTP(){
        Random random = new Random();
        int otpValue = 100000 + random.nextInt(900000);
        return String.valueOf(otpValue);
    }

    private void sendVerificationEmail(String email, String otp){
        String subject = "Email verification";
        String body = "Your verification otp is: " + otp;
        emailService.sendEmail(email, subject, body);
    }

    public void verify(String email, String otp) {
        User user = userRepository.findByEmail(email);
        if(user == null){
            throw new RuntimeException("user not found");
        }else if (user.isVerify()) {
            throw new RuntimeException("User is already verified");
        }else if(otp.equals(user.getOtp())){
            user.setVerify(true);
            userRepository.save(user);
        } else{
            throw new RuntimeException("Internal server error");
        }
    }


}

package com.example.demo.controller;

import com.example.demo.model.Doubt;
import com.example.demo.model.User;
import com.example.demo.repository.DoubtRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.DoubtService;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/admin")
public class AdminController {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private DoubtRepository doubtRepository;

    @Autowired
    private DoubtService doubtService;

    @Autowired
    private UserService userService;

    @GetMapping("/findDoubts")
    public ResponseEntity<List<Doubt>> allDoubts(@RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        List<Doubt> doubts = doubtRepository.findByMail(user.getEmail());

        return new ResponseEntity<>(doubts, HttpStatus.OK);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Doubt> updateDoubtStatus(@RequestHeader("Authorization") String jwt, @PathVariable Long id){
        Doubt doubt = doubtService.updateStatus(id);
        doubtRepository.save(doubt);
        return new ResponseEntity<>(doubt, HttpStatus.OK);
    }

}

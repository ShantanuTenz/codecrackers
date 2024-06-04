package com.example.demo.controller;// MessageController.java
import com.example.demo.model.Message;
import com.example.demo.model.User;
import com.example.demo.repository.MessageRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.MessageService;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/doubt/messages")
public class MessageController {
    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private MessageService messageService;

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public List<Message> getAllMessages() {
        return messageRepository.findAll();
    }

    @PostMapping
    public Message addMessage(@RequestHeader("Authorization") String jwt, @RequestBody Message message) throws Exception {
        message.setSentAt(LocalDateTime.now());

        User user = userService.findUserByJwtToken(jwt);

        message.setSender(user.getFullName());

        return messageRepository.save(message);
    }

    @GetMapping("/msg")
    public ResponseEntity<List<Message>> getMessagesBySender(@RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);

        List<Message> messages = messageService.getMessagesBySender(user.getFullName());
        return ResponseEntity.ok(messages);
    }
}

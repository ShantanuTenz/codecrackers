package com.example.demo.service;

import com.example.demo.model.Message;

import java.util.List;

public interface MessageService {
    List<Message> getMessagesBySender(String sender);
}

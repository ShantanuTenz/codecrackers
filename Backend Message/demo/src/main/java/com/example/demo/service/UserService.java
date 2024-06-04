package com.example.demo.service;

import com.example.demo.model.Message;
import com.example.demo.model.User;

import java.util.List;

public interface UserService {
    public User findUserByJwtToken(String jwt) throws Exception;
    public User findUserByEmail(String email) throws Exception;
}

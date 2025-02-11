package com.example.demo.repository;

import com.example.demo.model.Doubt;
import com.example.demo.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {
    public User findByEmail(String username);
}

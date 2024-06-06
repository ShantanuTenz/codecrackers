package com.example.demo.repository;

import com.example.demo.model.Doubt;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DoubtRepository extends JpaRepository<Doubt, Long> {
    public List<Doubt> findByMail(String email);
}

package com.example.demo.repository;

import com.example.demo.model.Doubt;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DoubtRepository extends JpaRepository<Doubt, Long> {
    public Doubt findDoubtById(Long id);
}

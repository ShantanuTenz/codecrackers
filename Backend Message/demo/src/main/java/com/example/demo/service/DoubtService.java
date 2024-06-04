package com.example.demo.service;

import com.example.demo.model.Doubt;

import java.util.Optional;

public interface DoubtService {
    Optional<Doubt> getDoubtById(Long id);
}

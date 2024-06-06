package com.example.demo.service;

import com.example.demo.model.Doubt;
import com.example.demo.repository.DoubtRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class DoubtServiceImpl implements DoubtService {

    @Autowired
    private DoubtRepository doubtRepository;

    @Override
    public Optional<Doubt> getDoubtById(Long id) {
        return doubtRepository.findById(id);
    }

    @Override
    public Doubt updateStatus(Long id) {
        Optional<Doubt> doubt = doubtRepository.findById(id);
        doubt.get().setStatus(!doubt.get().getStatus());
        doubtRepository.save(doubt.get());

        return doubt.get();
    }
}

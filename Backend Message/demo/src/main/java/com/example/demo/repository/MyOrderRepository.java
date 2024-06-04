package com.example.demo.repository;

import com.example.demo.model.MyOrderId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MyOrderRepository extends JpaRepository<MyOrderId, Long> {
    public MyOrderId findByOrderId(String orderId);
}

package com.example.demo.service;

import com.example.demo.model.Doubt;
import com.example.demo.response.DoubtResponse;
import com.example.demo.response.PaymentResponse;
import com.stripe.exception.StripeException;

public interface PaymentService {
    public PaymentResponse createPaymentLink(DoubtResponse doubtResponse) throws StripeException;
}

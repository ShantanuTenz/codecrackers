package com.example.demo.response;

public class PaymentDetailsResponse {
    private String paymentId;
    private Long amount;
    private String status;

    public PaymentDetailsResponse(String paymentId, Long amount, String status) {
        this.paymentId = paymentId;
        this.amount = amount;
        this.status = status;
    }

    // Getters and setters
    public String getPaymentId() {
        return paymentId;
    }

    public void setPaymentId(String paymentId) {
        this.paymentId = paymentId;
    }

    public long getAmount() {
        return amount;
    }

    public void setAmount(Long amount) {
        this.amount = amount;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}

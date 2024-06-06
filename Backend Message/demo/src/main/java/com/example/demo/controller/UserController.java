package com.example.demo.controller;

import com.example.demo.model.Doubt;
import com.example.demo.model.MyOrderId;
import com.example.demo.model.User;
import com.example.demo.repository.DoubtRepository;
import com.example.demo.repository.MyOrderRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.response.CombineResponse;
import com.example.demo.response.DoubtResponse;
import com.example.demo.service.EmailService;
import com.example.demo.service.UserService;
import org.jetbrains.annotations.NotNull;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.razorpay.*;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.HashMap;
import java.util.Map;


@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private DoubtRepository doubtRepository;
    @Autowired
    private MyOrderRepository myOrderRepository;

    @Autowired
    private EmailService emailService;

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @GetMapping("/profile")
    public ResponseEntity<User> findUserByJwtToken(@RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PostMapping("/submit")
    public ResponseEntity<Map<String, Object>> doubt(@RequestHeader("Authorization") String jwt, @RequestBody DoubtResponse req) throws Exception {
        User user = userService.findUserByJwtToken(jwt);

//        Doubt doubt = getDoubt(req, user);
//        doubtRepository.save(doubt);

        int amt = (int)req.getPrice();

        var client = new RazorpayClient("rzp_test_shhvY8NBvTIinr", "8KjJX13KpIjnaU6ah1voSuNP");

        JSONObject ob = new JSONObject();
        ob.put("amount", amt * 100);
        ob.put("currency", "INR");
        ob.put("receipt", "txn_23456789");

        //creating new order
        Order order = client.Orders.create(ob);
        System.out.println(order);

        MyOrderId myOrder = new MyOrderId();
        myOrder.setAmount(order.get("amount") + "");
        myOrder.setOrderId(order.get("id"));
        myOrder.setStatus("created");
        myOrder.setUser(user);
        myOrder.setReceipt(order.get("receipt"));

        myOrderRepository.save(myOrder);

        Map<String, Object> response = new HashMap<>();
        response.put("id", order.get("id"));
        response.put("amount", order.get("amount"));
        response.put("currency", order.get("currency"));
        response.put("receipt", order.get("receipt"));
        response.put("status", "created");

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/update_order")
    public ResponseEntity<?> updateOrder(@RequestHeader("Authorization") String jwt, @RequestBody CombineResponse combineResponse) throws Exception {

        User user = userService.findUserByJwtToken(jwt);
        Doubt doubt = getDoubt(combineResponse.getDoubtResponse(), user);
        doubt.setPaid(true);

        MyOrderId myOrder = myOrderRepository.findByOrderId(combineResponse.getOrder_id());

        if (myOrder == null) {
            logger.error("Order not found: " + combineResponse.getOrder_id());
            return new ResponseEntity<>("Order not found", HttpStatus.NOT_FOUND);
        }

        myOrder.setPaymentId(combineResponse.getPayment_id().toString());
        myOrder.setStatus(combineResponse.getStatus());

        System.out.println(doubt);
        doubtRepository.save(doubt);

        myOrderRepository.save(myOrder);

        String emailContent = "Dear " + doubt.getFirstName() + ",\n\n" +
                "Your booking for a doubt session has been successfully confirmed!\n\n" +
                "**Details of Your Session:**\n" +
                "- **Topic:** " + combineResponse.getDoubtResponse().getTopic() + "\n" +
                "- **Date & Time:** [Date and Time]\n" + // Replace with actual date and time
                "- **Mentor:** Shantanu\n\n" + // Replace with actual mentor's name
                "We are excited to help you tackle your doubts and achieve a deeper understanding of the topic. Please be ready with your questions and any relevant materials.\n\n" +
                "If you need further assistance, feel free to reach out to us at codecracker.\n\n" +
                "Thank you for choosing CodeCrackers. See you soon!\n\n" +
                "Warm regards,\n" +
                "CodeCrackers Support Team";

        emailService.sendEmail(doubt.getMail(), "CodeCrackers", emailContent);
        return ResponseEntity.ok(Map.of("msg", "updated"));
    }
   @NotNull
    private static Doubt getDoubt(DoubtResponse req, User user) {
        Doubt doubt = new Doubt();
        doubt.setFirstName(req.getFirstName());
        doubt.setMail(user.getEmail());
        doubt.setTopic(req.getTopic());
        doubt.setPhoneNumber(req.getPhoneNumber());
        return doubt;
    }

}

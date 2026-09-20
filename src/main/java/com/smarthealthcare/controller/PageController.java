package com.smarthealthcare.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class PageController {

    @GetMapping("/")
    public String home() {
        return "login";
    }

    @GetMapping("/register")
    public String register() {
        return "register";
    }

    @GetMapping("/dashboard")
    public String dashboard() {
        return "dashboard";
    }
    @GetMapping("/history")
    public String history() {
        return "history";
    }
    @GetMapping("/add-reading")
    public String addReading() {
        return "add-reading";
    }
    @GetMapping("/alerts")
    public String alerts() {
        return "alerts";
    }
    @GetMapping("/profile")
    public String profile() {
        return "profile";
    }
    @GetMapping("/settings")
    public String settings() {
        return "settings";
    }
    @GetMapping("/vitals")
    public String vitals() {
        return "vitals";
    }
}
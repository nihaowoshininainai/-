package com.img.share.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.img.share.pojo.Statues;
import com.img.share.pojo.User;
import com.img.share.service.UserService;

@RestController
@RequestMapping("/api")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public Statues<Map<String, Object>> login(@RequestBody User user) {
        return userService.login(user.getUname(), user.getPwd());
    }

    @PostMapping("/register")
    public Statues<Void> register(@RequestBody User user) {
        return userService.register(user.getUname(), user.getPwd());
    }
}

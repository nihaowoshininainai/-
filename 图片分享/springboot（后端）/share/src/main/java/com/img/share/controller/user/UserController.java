package com.img.share.controller.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.img.share.pojo.Statues;
import com.img.share.pojo.User;
import com.img.share.service.user.UserService;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class UserController {
    @Autowired
    private UserService userService;
    @RequestMapping("/login")
    public Statues<User> login(@RequestBody User user){
        return userService.login(user.getUname(), user.getPwd());    
    }
    @RequestMapping("/register")
    public Statues<User> register(@RequestBody User user){
        return userService.regiseter(user.getUname(), user.getPwd());
    }
}

package com.img.share.controller.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.img.share.dao.Statues;
import com.img.share.dao.User;
import com.img.share.service.user.UserService;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class UserController {
    @Autowired
    private UserService userService;
    @RequestMapping("/login")
    public Statues<User> login(@RequestBody User user){
        User userlogin = userService.login(user.getUname(), user.getPwd());
        System.out.println(user.getUname()+user.getPwd());
        if(userlogin.getUid()==-1){
            return new Statues<User>(0,"登录失败",userlogin);
        }
        else{
            return new Statues<User>(1,"登录成功",userlogin);
        }
        
    }
}

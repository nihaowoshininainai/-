package com.img.share.service.userImp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.img.share.mapper.UserMapper;
import com.img.share.pojo.Statues;
import com.img.share.pojo.User;
import com.img.share.service.UserService;
@Service
public class UserServiceImp implements UserService {
    @Autowired
    private UserMapper userMapper;
    @Override
    public Statues<User> login(String uname, String pwd) {
        User userlogin = userMapper.login(uname, pwd);
        if(userlogin==null){
            return new Statues<User>(0,"登录失败",userlogin);
        }
        else{
            return new Statues<User>(1,"登录成功",userlogin);
        }
    }

    @Override
    public Statues<User> regiseter(String uname, String pwd) {
        User user = userMapper.count(uname);
        if(user==null){
            userMapper.register(uname, pwd);
            return new Statues<User>(1,"注册成功",userMapper.login(uname, pwd)); 
        }
        else{
            return new Statues<User>(0,"注册失败",null);
        }
    }

}

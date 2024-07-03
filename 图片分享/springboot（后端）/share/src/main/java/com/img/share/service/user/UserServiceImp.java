package com.img.share.service.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.img.share.dao.Statues;
import com.img.share.dao.User;
import com.img.share.mapper.user.UserMapper;
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
    public User regiseter(String uname, String pwd) {
        return userMapper.count(uname);
    }

}

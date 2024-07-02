package com.img.share.service.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.img.share.dao.User;
import com.img.share.mapper.user.UserMapper;
@Service
public class UserServiceImp implements UserService {
    @Autowired
    private UserMapper userMapper;
    @Override
    public User login(String uname, String pwd) {
        return userMapper.login(uname, pwd);
    }

    @Override
    public User regiseter(String uname, String pwd) {
        return userMapper.count(uname);
    }

}

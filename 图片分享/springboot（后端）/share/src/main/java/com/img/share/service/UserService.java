package com.img.share.service;

import com.img.share.pojo.Statues;
import com.img.share.pojo.User;

public interface UserService {
    public Statues<User> login(String uname,String pwd);
    public Statues<User> regiseter(String uname,String pwd);
}

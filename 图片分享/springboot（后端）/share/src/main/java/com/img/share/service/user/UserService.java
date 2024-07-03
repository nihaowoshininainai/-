package com.img.share.service.user;

import com.img.share.dao.Statues;
import com.img.share.dao.User;

public interface UserService {
    public Statues<User> login(String uname,String pwd);
    public Statues<User> regiseter(String uname,String pwd);
}

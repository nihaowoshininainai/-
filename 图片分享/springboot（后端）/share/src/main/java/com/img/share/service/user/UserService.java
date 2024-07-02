package com.img.share.service.user;

import com.img.share.dao.User;

public interface UserService {
    public User login(String uname,String pwd);
    public User regiseter(String uname,String pwd);
}

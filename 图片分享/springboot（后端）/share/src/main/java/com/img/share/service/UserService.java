package com.img.share.service;

import java.util.Map;

import com.img.share.pojo.Statues;

public interface UserService {
    public Statues<Map<String, Object>> login(String uname, String pwd);
    public Statues<Void> register(String uname, String pwd);
}

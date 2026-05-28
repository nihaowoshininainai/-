package com.img.share.service.userImp;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.img.share.mapper.UserMapper;
import com.img.share.pojo.Statues;
import com.img.share.pojo.User;
import com.img.share.service.UserService;
import com.img.share.utils.JwtUtil;

import cn.hutool.crypto.digest.BCrypt;

@Service
public class UserServiceImp implements UserService {
    @Autowired
    private UserMapper userMapper;

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    public Statues<Map<String, Object>> login(String uname, String pwd) {
        User user = userMapper.findByUname(uname);
        if (user == null) {
            return new Statues<>(0, "用户名或密码错误", null);
        }
        if (!BCrypt.checkpw(pwd, user.getPwd())) {
            return new Statues<>(0, "用户名或密码错误", null);
        }
        String token = jwtUtil.createToken(user.getUid(), user.getUname());
        user.setPwd(null);
        Map<String, Object> result = new HashMap<>();
        result.put("user", user);
        result.put("token", token);
        return new Statues<>(1, "登录成功", result);
    }

    @Override
    public Statues<Void> register(String uname, String pwd) {
        User user = userMapper.count(uname);
        if (user != null) {
            return new Statues<>(0, "用户名已存在", null);
        }
        String hashedPwd = BCrypt.hashpw(pwd, BCrypt.gensalt());
        userMapper.register(uname, hashedPwd);
        return new Statues<>(1, "注册成功", null);
    }

}

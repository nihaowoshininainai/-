package com.img.share.utils;

import cn.hutool.jwt.JWT;
import cn.hutool.jwt.JWTUtil;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.Map;

@Component
public class JwtUtil {

    @Value("${jwt.secret}")
    private String secret;

    private static final long EXPIRE = 7 * 24 * 60 * 60 * 1000L;

    public String createToken(Integer uid, String uname) {
        return JWT.create()
                .setPayload("uid", uid)
                .setPayload("uname", uname)
                .setExpiresAt(new Date(System.currentTimeMillis() + EXPIRE))
                .setKey(secret.getBytes())
                .sign();
    }

    public boolean verify(String token) {
        try {
            return JWTUtil.verify(token, secret.getBytes());
        } catch (Exception e) {
            return false;
        }
    }

    public Integer getUid(String token) {
        try {
            JWT jwt = JWTUtil.parseToken(token);
            Object uid = jwt.getPayload("uid");
            return uid != null ? Integer.parseInt(uid.toString()) : null;
        } catch (Exception e) {
            return null;
        }
    }

    public String getUname(String token) {
        try {
            JWT jwt = JWTUtil.parseToken(token);
            Object uname = jwt.getPayload("uname");
            return uname != null ? uname.toString() : null;
        } catch (Exception e) {
            return null;
        }
    }

    public Map<String, Object> getUserInfo(String token) {
        try {
            JWT jwt = JWTUtil.parseToken(token);
            Integer uid = Integer.parseInt(jwt.getPayload("uid").toString());
            String uname = jwt.getPayload("uname").toString();
            return Map.of("uid", uid, "uname", uname);
        } catch (Exception e) {
            return null;
        }
    }
}
package com.img.share.interceptor;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.img.share.pojo.Statues;
import com.img.share.utils.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.servlet.HandlerInterceptor;

import java.util.Set;

public class LoginInterceptor implements HandlerInterceptor {

    private static final Set<String> EXCLUDE_PATHS = Set.of(
            "/api/login",
            "/api/register",
            "/api/search",
            "/api/getCount",
            "/api/addPageView",
            "/api/getComment"
    );

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            return true;
        }

        String path = request.getRequestURI();
        for (String exclude : EXCLUDE_PATHS) {
            if (path.equals(exclude)) {
                return true;
            }
        }

        String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            response.setContentType("application/json;charset=UTF-8");
            response.setStatus(401);
            Statues<Void> result = new Statues<>(0, "未登录，请先登录", null);
            response.getWriter().write(new ObjectMapper().writeValueAsString(result));
            return false;
        }

        String token = authHeader.substring(7);
        if (!JwtUtil.verify(token)) {
            response.setContentType("application/json;charset=UTF-8");
            response.setStatus(401);
            Statues<Void> result = new Statues<>(0, "登录已过期，请重新登录", null);
            response.getWriter().write(new ObjectMapper().writeValueAsString(result));
            return false;
        }

        Integer uid = JwtUtil.getUid(token);
        String uname = JwtUtil.getUname(token);
        if (uid == null || uname == null) {
            response.setContentType("application/json;charset=UTF-8");
            response.setStatus(401);
            Statues<Void> result = new Statues<>(0, "Token无效", null);
            response.getWriter().write(new ObjectMapper().writeValueAsString(result));
            return false;
        }

        request.setAttribute("uid", uid);
        request.setAttribute("uname", uname);
        return true;
    }
}
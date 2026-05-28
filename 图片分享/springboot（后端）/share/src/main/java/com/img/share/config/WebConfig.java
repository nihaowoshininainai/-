package com.img.share.config;

import com.img.share.interceptor.LoginInterceptor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new LoginInterceptor())
                .addPathPatterns("/api/**")
                .excludePathPatterns(
                        "/api/login",
                        "/api/register",
                        "/api/search",
                        "/api/getCount",
                        "/api/addPageView",
                        "/api/getComment"
                );
    }
}
package com.img.share.utils;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class RedisData {
    private LocalDateTime expireTime;
    private Object data;
}

package com.img.share.utils;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;
import java.util.function.Function;

import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Component;

import cn.hutool.core.util.StrUtil;
import cn.hutool.json.JSONUtil;

import static com.img.share.utils.RedisConstans.CACHE_TTL;

@Component
public class CacheClient {
    private  StringRedisTemplate stringRedisTemplate;

    public CacheClient(StringRedisTemplate stringRedisTemplate) {
        this.stringRedisTemplate = stringRedisTemplate;
    }

    public void set(String key, Object value, Long time, TimeUnit unit) {
        stringRedisTemplate.opsForValue().set(key, JSONUtil.toJsonStr(value), time, unit);

    }
    
    public void setWithLogic(String key, Object value, Long time, TimeUnit unit) {
        RedisData redisData = new RedisData();
        redisData.setData(value);
        redisData.setExpireTime(LocalDateTime.now().plusSeconds(unit.toSeconds(time)));

        stringRedisTemplate.opsForValue().set(key, JSONUtil.toJsonStr(redisData));

    }
    
    public <R, ID> R queryWithPassThrough(String keyPrefix, ID id, Class<R> type, Function<ID, R> dbFallback, Long time,
            TimeUnit unit) {
        String key = keyPrefix + id;
        String json = stringRedisTemplate.opsForValue().get(key);
        if (StrUtil.isNotBlank(json)) {
            return JSONUtil.toBean(json, type);
        }
        if (json != null) {
            return null;
        }
        R r = dbFallback.apply(id);

        if (r == null) {
            stringRedisTemplate.opsForValue().set(key, "", CACHE_TTL, TimeUnit.MINUTES);
            return null;
        }
        System.out.println(r);
        this.set(key, r, time, unit);

        return r;

    }
    public <R,ID> List<R> queryManyWithPassThrough(String keyPrefix,Map<String,Object>params, Class<R> type,Function<Map<String,Object>,List<R>> dbFallback,Long time,TimeUnit unit) {
        String key = keyPrefix + params;
        String json = stringRedisTemplate.opsForValue().get(key);
        if (StrUtil.isNotBlank(json)) {
            return JSONUtil.toList(JSONUtil.parseArray(json), type);
        }
        if (json != null) {
            return null;
        }
        List<R> r = dbFallback.apply(params);

        if (r == null) {
            stringRedisTemplate.opsForValue().set(key, "", CACHE_TTL, TimeUnit.MINUTES);
            return null;
        }
        this.set(key, r, time, unit);
        
        return r;
        
    }
}

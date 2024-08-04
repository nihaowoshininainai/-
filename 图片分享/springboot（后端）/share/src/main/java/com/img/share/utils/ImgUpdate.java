package com.img.share.utils;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;


import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;
/*图片缓存更新操作 */
@Component
public class ImgUpdate {
    
    private RedisTemplate<String, Object> redisTemplate;

    public ImgUpdate(RedisTemplate<String, Object> redisTemplate) {
        this.redisTemplate = redisTemplate;
    }
    
    public void UpdateImg(Integer uid) {
        Map<String, Object> map = new HashMap<>();
        map.put("uid", uid);
        redisTemplate.delete("user:img" + map);
        String key = "search";
        Set<String> keys = redisTemplate.keys(key + "*");
        redisTemplate.delete(keys);
        key = "imgcount:";
        keys = redisTemplate.keys(key + "*");
        redisTemplate.delete(keys);
    }
    
    public void UpdateLikeImg(Integer uid,Integer iid) {
        Map<String, Object> map = new HashMap<>();
            map.put("uid", uid);
            redisTemplate.delete("user:like:img" + map);
            String key = "likeOrNot:uid:iid" + String.valueOf(uid) + String.valueOf(iid);
            redisTemplate.delete(key);
    }
}

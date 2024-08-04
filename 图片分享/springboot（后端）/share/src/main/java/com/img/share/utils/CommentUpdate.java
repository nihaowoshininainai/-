package com.img.share.utils;

import java.util.HashMap;
import java.util.Map;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;
/*评论更新缓存 */
@Component
public class CommentUpdate {
    private RedisTemplate<String, Object> redisTemplate;

    public CommentUpdate(RedisTemplate<String, Object> redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    public void UpdateComment(Integer iid) {
        Map<String, Object> map = new HashMap<>();
        map.put("iid", iid);
        redisTemplate.delete("comments:iid" + map);

    }

    public void UpdateClickComment(Integer uid) {
        Map<String, Object> map = new HashMap<>();
        map.put("uid", uid);
        redisTemplate.delete("comments:clicks:uid" + map);
    }
}

package com.img.share.service.commentImp;

import static com.img.share.utils.RedisConstans.CACHE_TTL;

import java.sql.Date;
import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.img.share.mapper.CommentMapper;
import com.img.share.pojo.Comment;
import com.img.share.pojo.Statues;
import com.img.share.service.CommentService;
import com.img.share.utils.CacheClient;
import com.img.share.utils.CommentUpdate;

import jakarta.annotation.Resource;

@Service
public class CommentServiceImp implements CommentService {
    @Autowired
    private CommentMapper commentMapper;

    @Resource
    private CacheClient cacheClient;

    @Resource
    private CommentUpdate commentUpdate;

    @Override
    public Statues<List<Comment>> getCommens(Integer iid) {
        String message = "这是id为" + iid + "的评论";
        Map<String, Object> map = new HashMap<>();
        map.put("iid", iid);
        List<Comment> comments = cacheClient.queryManyWithPassThrough("comments:iid", map, Comment.class,
                map1 -> commentMapper.getComments(iid), CACHE_TTL, TimeUnit.MINUTES);
        return new Statues<>(1, message, comments);
    }

    @Override
    public Statues<Integer> addComment(Integer iid, Integer uid, String content) {
        long time = System.currentTimeMillis();
        Integer a = commentMapper.addComment(iid, new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date(time)),
                uid, content);
        if (a != 1) {
            return new Statues<>(0, "添加评论失败", null);
        } else {
            commentUpdate.UpdateComment(iid);
            return new Statues<>(1, "添加评论成功", null);
        }
    }

    @Override
    public Statues<Integer> delComment(Integer cid) {
        Integer a = commentMapper.delComment(cid);
        if (a == 0) {
            return new Statues<>(0, "删除失败", null);
        } else {
            return new Statues<>(1, "删除成功", null);
        }
    }

    @Override
    public Statues<List<Integer>> getClickComments(Integer uid) {
        Map<String, Object> map = new HashMap<>();
        map.put("uid", uid);
        List<Integer> clicks = cacheClient.queryManyWithPassThrough("comments:clicks:uid", map, Integer.class, maps->commentMapper.userClickLike(uid), CACHE_TTL, TimeUnit.MINUTES);
        return new Statues<>(1, "查询用户点赞评论成功", clicks);
    }

    @Override
    public Statues<Integer> clickLike(Integer uid, Integer cid) {
        Integer a = commentMapper.clickLike(uid, cid);
        if (a != 1) {
            return new Statues<>(0, "点赞失败", null);
        } else {
            commentUpdate.UpdateClickComment(uid);
            return new Statues<>(1, "点赞成功", null);
        }
    }

    @Override
    public Statues<Integer> delClick(Integer cid, Integer uid) {
        Integer a = commentMapper.delClick(cid, uid);
        if (a != 1) {
            return new Statues<>(0, "取消失败", null);
        } else {
            commentUpdate.UpdateClickComment(uid);
            return new Statues<>(1, "取消点赞", null);
        }
    }
}

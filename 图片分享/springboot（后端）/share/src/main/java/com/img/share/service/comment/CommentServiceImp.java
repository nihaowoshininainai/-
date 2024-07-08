package com.img.share.service.comment;

import java.sql.Date;
import java.text.SimpleDateFormat;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.img.share.mapper.comment.CommentMapper;
import com.img.share.pojo.Comment;
import com.img.share.pojo.Statues;

@Service
public class CommentServiceImp implements CommentService{
    @Autowired
    private CommentMapper commentMapper;
    @Override
    public Statues<List<Comment>> getCommens(Integer iid) {
        String message = "这是id为"+iid+"的评论";
        return new Statues<>(1,message,commentMapper.getComments(iid));
    }

    @Override
    public Statues<Integer> addComment(Integer iid,Integer uid,String content) {
        long time = System.currentTimeMillis();
        Integer a = commentMapper.addComment(iid, new SimpleDateFormat().format(new Date(time)), uid, content);
        if(a!=1){
            return new Statues<>(0,"插入失败",null);
        }
        else{
            return new Statues<>(1,"插入成功",null);
        }
    }

}

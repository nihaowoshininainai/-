package com.img.share.service;

import java.util.List;

import com.img.share.pojo.Comment;
import com.img.share.pojo.Statues;

public interface CommentService {
    public Statues<List<Comment>> getCommens(Integer iid);

    public Statues<Integer> addComment(Integer iid, Integer uid, String content);

    public Statues<Integer> delComment(Integer cid);

    public Statues<List<Integer>> getClickComments(Integer uid);

    public Statues<Integer> clickLike(Integer uid, Integer cid);

    public Statues<Integer> delClick(Integer cid, Integer uid);
}

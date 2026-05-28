package com.img.share.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.img.share.pojo.Comment;
import com.img.share.pojo.Statues;
import com.img.share.service.CommentService;

@RestController
@RequestMapping("/api")
public class CommentController {
    @Autowired
    private CommentService commentService;

    @GetMapping("/getComment")
    public Statues<List<Comment>> getComment(@RequestParam("iid") Integer iid) {
        return commentService.getCommens(iid);
    }

    @PostMapping("/addComment")
    public Statues<Integer> addComment(@RequestBody Comment comment, @RequestAttribute("uid") Integer uid) {
        return commentService.addComment(comment.getImg().getIid(), uid, comment.getContent());
    }

    @PostMapping("/delComment")
    public Statues<Integer> delComment(@RequestBody Comment comment) {
        return commentService.delComment(comment.getCid());
    }

    @GetMapping("/getClickComments")
    public Statues<List<Integer>> getClickComments(@RequestAttribute("uid") Integer uid) {
        return commentService.getClickComments(uid);
    }

    @GetMapping("/clickLike")
    public Statues<Integer> clickLike(@RequestAttribute("uid") Integer uid, @RequestParam("cid") Integer cid) {
        return commentService.clickLike(uid, cid);
    }

    @GetMapping("/delClick")
    public Statues<Integer> delClick(@RequestParam Integer cid, @RequestAttribute("uid") Integer uid) {
        return commentService.delClick(cid, uid);
    }
}

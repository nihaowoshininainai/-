package com.img.share.controller.comment;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.img.share.pojo.Comment;
import com.img.share.pojo.Statues;
import com.img.share.service.comment.CommentService;

@RestController
@RequestMapping("/api")
public class CommentController {
    @Autowired
    private CommentService commentService;
    @RequestMapping("/getComment")
    public Statues<List<Comment>> getComment(@RequestParam("iid") Integer iid){
        return commentService.getCommens(iid);
    }
    @RequestMapping("/addComment")
    public Statues<Integer> addComment(@RequestBody Comment comment){
        return commentService.addComment(comment.getImg().getIid(),comment.getUser().getUid(),comment.getContent());
    }
    @RequestMapping("/delComment")
    public Statues<Integer> delComment(@RequestBody Comment comment){
        return commentService.delComment(comment.getCid());
    }
}

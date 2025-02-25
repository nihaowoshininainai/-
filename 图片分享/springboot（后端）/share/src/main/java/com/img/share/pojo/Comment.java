package com.img.share.pojo;


import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Comment {
    private Integer cid;
    private Img img;
    private String commdate;
    private User user;
    private int  clicklike;
    private String content;
    private List<User> userComments;
}

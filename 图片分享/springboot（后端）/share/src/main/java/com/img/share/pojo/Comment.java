package com.img.share.pojo;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Comment {
    private Integer cid;
    private Img img;
    private Date commdate;
    private User user;
    private int  clicklike;
    private String content;
}

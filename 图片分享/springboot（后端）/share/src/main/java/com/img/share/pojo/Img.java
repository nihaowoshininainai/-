package com.img.share.pojo;

import java.sql.Date;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Img {
    private Integer iid;
    private String iname;
    private String isrc;
    private Date uploaddate;
    private User user;
    private Integer pageview;
    private List<Comment> comment;
    private List<User> likUsers;
}

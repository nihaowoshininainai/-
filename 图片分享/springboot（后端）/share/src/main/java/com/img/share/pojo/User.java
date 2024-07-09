package com.img.share.pojo;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {
    private Integer uid = -1;
    private String uname;
    private String pwd;
    private List<Img> img;
    private List<Comment> comment;
}

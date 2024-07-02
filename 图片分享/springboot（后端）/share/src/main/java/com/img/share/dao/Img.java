package com.img.share.dao;

import java.sql.Date;

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
}

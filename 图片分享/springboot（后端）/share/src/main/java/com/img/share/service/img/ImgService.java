package com.img.share.service.img;

import java.sql.Date;

import com.img.share.dao.Statues;

public interface ImgService {
    public Statues<Integer> add(String iname,String isrc,Date uploaddate,Integer uid);
    public Statues<Integer> delete(Integer iid, Integer uid);
}

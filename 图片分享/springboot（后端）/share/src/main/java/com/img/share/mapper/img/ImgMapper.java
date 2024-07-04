package com.img.share.mapper.img;

import java.sql.Date;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface ImgMapper {
    /* 增 */
    @Insert("insert into img (iname,isrc,uploaddate,uid) values(#{iname},#{isrc},#{uploaddate},#{uid})")
    public Integer add(String iname,String isrc,Date uploaddate,Integer uid);
}

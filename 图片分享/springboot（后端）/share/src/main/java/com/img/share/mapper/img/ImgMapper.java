package com.img.share.mapper.img;

import java.sql.Date;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface ImgMapper {
    /* 增 */
    @Insert("insert into img (iname,isrc,uploaddate,uid) values(#{iname},#{isrc},#{uploaddate},#{uid})")
    public Integer add(String iname,String isrc,Date uploaddate,Integer uid);
    /* 删 */
    @Delete("delete from img where iid=#{iid} and uid=#{uid}")
    public Integer delete(Integer iid, Integer uid);
}

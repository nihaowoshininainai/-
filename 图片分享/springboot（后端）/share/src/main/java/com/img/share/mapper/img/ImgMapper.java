package com.img.share.mapper.img;


import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.Results;
import org.apache.ibatis.annotations.Select;

import com.img.share.pojo.Img;

@Mapper
public interface ImgMapper {
    /* 增 */
    @Insert("insert into img (iname,isrc,uploaddate,uid) values(#{iname},#{isrc},#{uploaddate},#{uid})")
    public Integer add(String iname,String isrc,String uploaddate,Integer uid);
    /* 删 */
    @Delete("delete from img where iid=#{iid} and uid=#{uid}")
    public Integer delete(Integer iid, Integer uid);
    /* 获取总数 */
    @Select("select count(*) from img")
    public Integer getCount();
    /* 分页查 */
    @Select("select i.iid,i.iname,i.isrc,i.uploaddate,i.pageview,u.uid,u.uname from img i left join `user` u on i.uid = u.uid order by #{order} limit #{start},#{count}")
    @Results({
        @Result(property = "user.uid",column = "uid"),
        @Result(property = "user.uname",column = "uname")
    })
    public List<Img> search(String order,Integer start,Integer count); 
}

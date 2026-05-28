package com.img.share.mapper;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import com.img.share.pojo.User;

@Mapper
public interface UserMapper {
    @Select("select * from user where uname=#{uname}")
    public User findByUname(String uname);

    @Select("select * from user where uname=#{uname}")
    public User count(String uname);

    @Insert("insert into user(uname,pwd) values(#{uname},#{pwd})")
    public void register(String uname, String pwd);

}

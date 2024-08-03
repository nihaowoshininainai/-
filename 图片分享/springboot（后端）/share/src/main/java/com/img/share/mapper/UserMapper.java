package com.img.share.mapper;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import com.img.share.pojo.User;

@Mapper
public interface UserMapper {
    /* 登录操作 */
    @Select("select * from user where uname=#{uname} and pwd=#{pwd}")
    public User login(String uname,String pwd);
    /* 重名检测 */
    @Select("select * from user where uname=#{uname}")
    public User count(String uname);
    /* 注册操作 */
    @Insert("insert into user(uname,pwd) values(#{uname},#{pwd})")
    public void register(String uname,String pwd);

}

package com.img.share.mapper.comment;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.Results;
import org.apache.ibatis.annotations.Select;

import com.img.share.pojo.Comment;

@Mapper
public interface CommentMapper {
    /* 查 */
    @Select("select c.cid,c.iid,c.commdate,u.uid,u.uname,c.clicklike,c.content from comment c left join `user` u on c.uid = u.uid where iid = #{iid}")
    @Results({
            @Result(property = "user.uid", column = "uid"),
            @Result(property = "user.uname", column = "uname")
    })
    public List<Comment> getComments(Integer iid);

    /* 增 */
    @Insert("insert into comment(iid,commdate,uid,content) values(#{iid},#{commdate},#{uid},#{content})")
    public Integer addComment(Integer iid, String commdate, Integer uid, String content);

    /* 删 */
    @Delete("delete from comment where cid=#{cid}")
    public Integer delComment(Integer cid);
}

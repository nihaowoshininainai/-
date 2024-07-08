package com.img.share.mapper.comment;

import java.util.List;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import com.img.share.pojo.Comment;
@Mapper
public interface CommentMapper {
    /*查 */
    @Select("select * from comment c where iid = #{iid}")
    public List<Comment> getComments(Integer iid);
    /*增 */
    @Insert("insert into comment(iid,commdate,uid,content) values(#{iid},#{commdate},#{uid},#{content})")
    public Integer addComment(Integer iid,String commdate,Integer uid,String content);
}

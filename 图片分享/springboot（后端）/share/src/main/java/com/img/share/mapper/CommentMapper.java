package com.img.share.mapper;

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

    /*查用户给哪些评论点赞 */
    @Select("SELECT c.cid FROM clicklike c WHERE uid = #{uid}")
    public List<Integer> userClickLike(Integer uid);

    /*评论点赞 */
    @Insert("INSERT INTO clicklike (uid,cid) values(#{uid},#{cid})")
    public Integer clickLike(Integer uid, Integer cid);

    /*取消点赞 */
    @Delete("DELETE FROM clicklike where cid = #{cid} and uid = #{uid}")
    public Integer delClick(Integer cid, Integer uid);
}

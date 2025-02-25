package com.img.share.service;

import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.img.share.pojo.Img;
import com.img.share.pojo.Statues;

public interface ImgService {
    public Statues<Integer> add(MultipartFile file, String iname, Integer uid)
            throws IllegalStateException, IOException;

    public Statues<Integer> delete(Integer iid, Integer uid,String path);

    public Statues<List<Img>> search(String order, Integer page, Integer count,String iname);

    public Statues<Integer> getCount(String iname);

    public Statues<List<Img>> getLikeImg(Integer uid);

    public Statues<List<Img>> getUserImg(Integer uid);

    public Statues<Integer> addLike(Integer uid, Integer iid);

    public Statues<Boolean> likeOrNot(Integer uid, Integer iid);

    public Statues<Integer> delLike(Integer uid, Integer iid);

    public Statues<Integer> addPageView(Integer iid);
}

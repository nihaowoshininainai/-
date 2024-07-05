package com.img.share.service.img;

import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.img.share.dao.Img;
import com.img.share.dao.Statues;

public interface ImgService {
    public Statues<Integer> add(MultipartFile file,String iname,Integer uid) throws IllegalStateException, IOException;
    public Statues<Integer> delete(Integer iid, Integer uid);
    public Statues<List<Img>> search(String order,Integer page,Integer count);
}

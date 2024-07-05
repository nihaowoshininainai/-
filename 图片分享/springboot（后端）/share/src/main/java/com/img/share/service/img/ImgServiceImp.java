package com.img.share.service.img;

import java.io.File;
import java.io.IOException;
import java.sql.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.img.share.dao.Img;
import com.img.share.dao.Statues;
import com.img.share.mapper.img.ImgMapper;
@Service
public class ImgServiceImp implements ImgService{
    public static final String FILEDIR = "D:/c/";
    @Autowired
    private ImgMapper imgMapper;

    @Override
    public Statues<Integer> add(MultipartFile file,String iname,Integer uid) throws IllegalStateException, IOException {
        long time = System.currentTimeMillis();
        String filepath = FILEDIR+iname+time+file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf("."));
        File newFile = new File(filepath);
        file.transferTo(newFile);
        Integer a = imgMapper.add(iname,filepath,new Date(time),uid);
        if(a!=1){
            return new Statues<Integer>(0,"插入失败",null);
        }
        else{
            return new Statues<Integer>(1,"插入成功",null);
        }
    }

    @Override
    public Statues<Integer> delete(Integer iid, Integer uid) {
        Integer a = imgMapper.delete(iid, uid);
        if(a==0){
            return new Statues<>(0,"删除失败",null);
        }
        else{
            return new Statues<>(1,"删除成功",null);
        }

    }

    @Override
    public Statues<List<Img>> search(String order, Integer page, Integer count) {
        String message = "这是第"+page+"页";
        System.out.println(imgMapper.search(order, (page-1)*count, count));
        return new Statues<>(1,message,imgMapper.search(order, (page-1)*count, count));
    }
    

}

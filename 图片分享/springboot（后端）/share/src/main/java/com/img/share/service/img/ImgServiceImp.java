package com.img.share.service.img;

import java.sql.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.img.share.dao.Statues;
import com.img.share.mapper.img.ImgMapper;
@Service
public class ImgServiceImp implements ImgService{
    @Autowired
    private ImgMapper imgMapper;

    @Override
    public Statues<Integer> add(String iname, String isrc, Date uploaddate, Integer uid) {
        Integer a = imgMapper.add(iname, isrc, uploaddate, uid);
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
    

}

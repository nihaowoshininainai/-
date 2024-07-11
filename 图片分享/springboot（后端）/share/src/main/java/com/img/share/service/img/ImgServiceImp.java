package com.img.share.service.img;

import java.io.File;
import java.io.IOException;
import java.sql.Date;
import java.text.SimpleDateFormat;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.img.share.mapper.img.ImgMapper;
import com.img.share.pojo.Img;
import com.img.share.pojo.Statues;
@Service
public class ImgServiceImp implements ImgService{
    public static final String FILEDIR = "/mnt/img/";
    /* public static final String FILEDIR = "D:/c/img"; */
    @Autowired
    private ImgMapper imgMapper;

    @Override
    public Statues<Integer> add(MultipartFile file,String iname,Integer uid) throws IllegalStateException, IOException {
        long time = System.currentTimeMillis();
        @SuppressWarnings("null")
        String filepath = FILEDIR+uid+"/"+iname+time+file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf("."));
        File newFile = new File(filepath);
        File dir = newFile.getParentFile();
        if (!dir.exists()) {
            // 创建文件夹
            dir.mkdirs();
        }
        // 创建文件
        file.transferTo(newFile);
        System.out.println(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date(time)));
        Integer a = imgMapper.add(iname,filepath,new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date(time)),uid);
        if(a!=1){
            return new Statues<Integer>(0,"添加图片失败",null);
        }
        else{
            return new Statues<Integer>(1,"添加图片成功",null);
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

    @Override
    public Statues<Integer> getCount(){
        return new Statues<>(1,"获取成功",imgMapper.getCount());
    }
    

}

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
public class ImgServiceImp implements ImgService {
    public static final String FILEDIR = "/mnt/img/";
    /* public static final String FILEDIR = "D:/c/img"; */
    @Autowired
    private ImgMapper imgMapper;

    class AddImg extends Thread {
        MultipartFile file;
        String iname;
        Integer uid;
        long time = System.currentTimeMillis();

        public AddImg(MultipartFile file, String iname, Integer uid) {
            this.file = file;
            this.iname = iname;
            this.uid = uid;
        }

        @Override
        public void run() {
            @SuppressWarnings("null")
            String filepath = FILEDIR + this.uid + "/" + this.iname + this.time
                    + this.file.getOriginalFilename().substring(this.file.getOriginalFilename().lastIndexOf("."));
            File newFile = new File(filepath);
            File dir = newFile.getParentFile();
            if (!dir.exists()) {
                // 创建文件夹
                dir.mkdirs();
            }
            // 创建文件
            try {
                file.transferTo(newFile);
            } catch (IllegalStateException | IOException e) {
                e.printStackTrace();
            }

        }
    }

    class DelImg extends Thread {
        String path;

        public DelImg(String path) {
            this.path = path;
        }

        @Override
        public void run() {
            File file = new File(path);
            file.delete();
        }
    }

    @Override
    public Statues<Integer> add(MultipartFile file, String iname, Integer uid)
            throws IllegalStateException, IOException {
        AddImg addImg = new AddImg(file, iname, uid);
        addImg.start();
        @SuppressWarnings("null")
        String filepath = FILEDIR + addImg.uid + "/" + addImg.iname + addImg.time
                + addImg.file.getOriginalFilename().substring(addImg.file.getOriginalFilename().lastIndexOf("."));
        System.out.println(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date(addImg.time)));
        Integer a = imgMapper.add(addImg.iname, filepath,
                new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date(addImg.time)), addImg.uid);
        if (a != 1) {
            return new Statues<Integer>(0, "添加图片失败", null);
        } else {
            return new Statues<Integer>(1, "添加图片成功", null);
        }
    }

    @Override
    public Statues<Integer> delete(Integer iid, Integer uid,String path) {
        DelImg delImg = new DelImg(path);
        delImg.start();
        Integer a = imgMapper.delete(iid, uid);
        if (a == 0) {
            return new Statues<>(0, "删除失败", null);
        } else {
            return new Statues<>(1, "删除成功", null);
        }

    }

    @Override
    public Statues<List<Img>> search(String order, Integer page, Integer count) {
        String message = "这是第" + page + "页";
        System.out.println(imgMapper.search(order, (page - 1) * count, count));
        return new Statues<>(1, message, imgMapper.search(order, (page - 1) * count, count));
    }

    @Override
    public Statues<Integer> getCount() {
        return new Statues<>(1, "获取成功", imgMapper.getCount());
    }

    @Override
    public Statues<List<Img>> getLikeImg(Integer uid) {
        return new Statues<>(1, "获取成功", imgMapper.getLikeImg(uid));
    }

    @Override
    public Statues<List<Img>> getUserImg(Integer uid) {
        return new Statues<>(1, "或取成功", imgMapper.getUserImg(uid));
    }

    @Override
    public Statues<Integer> addLike(Integer uid, Integer iid) {
        Integer a = imgMapper.addLike(uid, iid);
        if (a != 1) {
            return new Statues<>(0, "添加至我喜欢失败", null);
        } else {
            return new Statues<>(1, "添加喜欢", null);
        }
    }
    
    @Override
    public Statues<Boolean> likeOrNot(Integer uid, Integer iid) {
        Integer a = imgMapper.likeOrNot(uid, iid);
        if (a==0) {
            return new Statues<>(1, "未在喜欢列表中", false);
        } else {
            return new Statues<>(1, "在喜欢列表中", true);
        }
    }
}

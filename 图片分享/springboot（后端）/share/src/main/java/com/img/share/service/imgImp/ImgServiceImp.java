package com.img.share.service.imgImp;

import static com.img.share.utils.RedisConstans.CACHE_TTL;

import java.io.File;
import java.io.IOException;
import java.sql.Date;
import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.img.share.mapper.ImgMapper;
import com.img.share.pojo.Img;
import com.img.share.pojo.Statues;
import com.img.share.service.ImgService;
import com.img.share.utils.CacheClient;

import cn.hutool.core.util.StrUtil;
import jakarta.annotation.Resource;

@Service
public class ImgServiceImp implements ImgService {
    public static final String FILEDIR = "/mnt/nginx/html/";
    /* public static final String FILEDIR = "D:/c/img"; */
    @Autowired
    private ImgMapper imgMapper;

    @Resource
    private CacheClient cacheClient;
    @Autowired
    private StringRedisTemplate stringRedisTemplate;

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
    public Statues<Integer> delete(Integer iid, Integer uid, String path) {
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
    public Statues<List<Img>> search(String order, Integer page, Integer count, String iname) {
        String message = "这是第" + page + "页";
        Map<String, Object> map = new HashMap<>();
        map.put("order", order);
        map.put("page", page);
        map.put("count", count);
        map.put("iname", iname);
        List<Img> imgs = cacheClient.queryManyWithPassThrough("search", map, Img.class,
                map1 -> imgMapper.search(order, (page - 1) * count, count, iname), CACHE_TTL, TimeUnit.MINUTES);
        return new Statues<>(1, message, imgs);
    }

    @Override
    public Statues<Integer> getCount(String iname) {
        String key = "imgcount:" + iname;
        String count = stringRedisTemplate.opsForValue().get(key);
        if (StrUtil.isNotBlank(count))
            return new Statues<>(1, "获取成功", Integer.parseInt(count));
        count = String.valueOf(imgMapper.getCount(iname));
        stringRedisTemplate.opsForValue().set(key, count, CACHE_TTL, TimeUnit.MINUTES);
        return new Statues<>(1, "获取成功", Integer.parseInt(count));
    }

    @Override
    public Statues<List<Img>> getLikeImg(Integer uid) {
        Map<String, Object> map = new HashMap<>();
        map.put("uid", uid);
        List<Img> imgs = cacheClient.queryManyWithPassThrough("user:like:img", map, Img.class,
                map1 -> imgMapper.getLikeImg(uid), CACHE_TTL, TimeUnit.MINUTES);
        return new Statues<>(1, "获取成功", imgs);
    }

    @Override
    public Statues<List<Img>> getUserImg(Integer uid) {
        Map<String, Object> map = new HashMap<>();
        map.put("uid", uid);
        List<Img> imgs = cacheClient.queryManyWithPassThrough("user:img", map, Img.class,
                map1 -> imgMapper.getUserImg(uid), CACHE_TTL, TimeUnit.MINUTES);
        return new Statues<>(1, "获取成功", imgs);
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
        String key = "likeOrNot:uid:iid" + String.valueOf(uid) + String.valueOf(iid);
        String result = stringRedisTemplate.opsForValue().get(key);
        if (StrUtil.isNotBlank(result)) {
            Integer a = Integer.parseInt(result);
            if (a == 0) {
                return new Statues<>(1, "未在喜欢列表中", false);
            } else {
                return new Statues<>(1, "在喜欢列表中", true);
            }
        }
        result = String.valueOf(imgMapper.likeOrNot(uid, iid));
        stringRedisTemplate.opsForValue().set(key, result, CACHE_TTL, TimeUnit.MINUTES);
        Integer a = Integer.parseInt(result);
        if (a == 0) {
            return new Statues<>(1, "未在喜欢列表中", false);
        } else {
            return new Statues<>(1, "在喜欢列表中", true);
        }

    }

    @Override
    public Statues<Integer> delLike(Integer uid, Integer iid) {
        Integer a = imgMapper.delLike(uid, iid);
        if (a != 1) {
            return new Statues<>(0, "移除喜欢失败", null);
        } else {
            return new Statues<>(1, "从喜欢列表中移除", null);
        }
    }

    @Override
    public Statues<Integer> addPageView(Integer iid) {
        Integer a = imgMapper.addPageView(iid);
        if (a != 1) {
            return new Statues<>(0, "添加浏览量失败", null);
        } else {
            return new Statues<>(1, "添加浏览量成功", null);
        }
    }
}

package com.img.share.controller.img;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.img.share.pojo.Img;
import com.img.share.pojo.Statues;
import com.img.share.service.img.ImgService;

@RestController
@RequestMapping("/api")
public class ImgController {
    @Autowired
    private ImgService imgService;

    @RequestMapping("/addImg")
    public Statues<Integer> add(@RequestParam("file") MultipartFile file, @RequestParam("iname") String filename,
            @RequestParam("uid") Integer uid) throws IllegalStateException, IOException {
        return imgService.add(file, filename, uid);
    }

    @RequestMapping("/deleteImg")
    public Statues<Integer> delete(@RequestBody Img img) {
        return imgService.delete(img.getIid(), img.getUser().getUid(),img.getIsrc());
    }

    @RequestMapping("/search")
    public Statues<List<Img>> search(@RequestParam("order") String order, @RequestParam("count") Integer count,
            @RequestParam("page") Integer page) {
        return imgService.search(order, page, count);
    }

    @RequestMapping("/getCount")
    public Statues<Integer> getCount() {
        return imgService.getCount();
    }

    @RequestMapping("/getLikeImg")
    public Statues<List<Img>> getLikeImg(@RequestParam("uid") Integer uid) {
        return imgService.getLikeImg(uid);
    }

    @RequestMapping("/getUserImg")
    public Statues<List<Img>> getUserImg(@RequestParam("uid") Integer uid) {
        return imgService.getUserImg(uid);
    }
}

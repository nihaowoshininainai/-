package com.img.share.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.img.share.pojo.Img;
import com.img.share.pojo.Statues;
import com.img.share.service.ImgService;

@RestController
@RequestMapping("/api")
public class ImgController {
    @Autowired
    private ImgService imgService;

    @PostMapping("/addImg")
    public Statues<Integer> add(@RequestParam("file") MultipartFile file, @RequestParam("iname") String filename,
            @RequestAttribute("uid") Integer uid) throws IllegalStateException, IOException {
        return imgService.add(file, filename, uid);
    }

    @PostMapping("/deleteImg")
    public Statues<Integer> delete(@RequestBody Img img, @RequestAttribute("uid") Integer uid) {
        return imgService.delete(img.getIid(), uid, img.getIsrc());
    }

    @GetMapping("/search")
    public Statues<List<Img>> search(@RequestParam("order") String order, @RequestParam("count") Integer count,
            @RequestParam("page") Integer page, @RequestParam String iname) {
        return imgService.search(order, page, count, iname);
    }

    @GetMapping("/getCount")
    public Statues<Integer> getCount(@RequestParam String iname) {
        return imgService.getCount(iname);
    }

    @GetMapping("/getLikeImg")
    public Statues<List<Img>> getLikeImg(@RequestAttribute("uid") Integer uid) {
        return imgService.getLikeImg(uid);
    }

    @GetMapping("/getUserImg")
    public Statues<List<Img>> getUserImg(@RequestAttribute("uid") Integer uid) {
        return imgService.getUserImg(uid);
    }

    @GetMapping("/addLike")
    public Statues<Integer> addLike(@RequestAttribute("uid") Integer uid, @RequestParam("iid") Integer iid) {
        return imgService.addLike(uid, iid);
    }

    @GetMapping("/likeOrNot")
    public Statues<Boolean> likeOrNot(@RequestAttribute("uid") Integer uid, @RequestParam("iid") Integer iid) {
        return imgService.likeOrNot(uid, iid);
    }

    @GetMapping("/delLike")
    public Statues<Integer> delLike(@RequestAttribute("uid") Integer uid, @RequestParam Integer iid) {
        return imgService.delLike(uid, iid);
    }

    @GetMapping("/addPageView")
    public Statues<Integer> addPageView(@RequestParam Integer iid) {
        return imgService.addPageView(iid);
    }

    @GetMapping("/getImgById")
    public Statues<Img> getImgById(@RequestParam Integer iid) {
        return imgService.getImgById(iid);
    }
}

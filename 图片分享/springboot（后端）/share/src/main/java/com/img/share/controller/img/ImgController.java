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
            @RequestParam("page") Integer page,@RequestParam String iname) {
        return imgService.search(order, page, count,iname);
    }

    @RequestMapping("/getCount")
    public Statues<Integer> getCount(@RequestParam String iname) {
        return imgService.getCount(iname);
    }

    @RequestMapping("/getLikeImg")
    public Statues<List<Img>> getLikeImg(@RequestParam("uid") Integer uid) {
        return imgService.getLikeImg(uid);
    }

    @RequestMapping("/getUserImg")
    public Statues<List<Img>> getUserImg(@RequestParam("uid") Integer uid) {
        return imgService.getUserImg(uid);
    }

    @RequestMapping("/addLike")
    public Statues<Integer> addLike(@RequestParam("uid") Integer uid, @RequestParam("iid") Integer iid) {
        return imgService.addLike(uid, iid);
    }

    @RequestMapping("/likeOrNot")
    public Statues<Boolean> likeOrNot(@RequestParam("uid") Integer uid, @RequestParam("iid") Integer iid) {
        return imgService.likeOrNot(uid, iid);
    }

    @RequestMapping("/delLike")
    public Statues<Integer> delLike(@RequestParam Integer uid, @RequestParam Integer iid) {
        return imgService.delLike(uid, iid);
    }

    @RequestMapping("/addPageView")
    public Statues<Integer> addPageView(@RequestParam Integer iid) {
        return imgService.addPageView(iid);
    }
}

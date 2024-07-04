package com.img.share.controller.img;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.img.share.dao.Img;
import com.img.share.dao.Statues;
import com.img.share.service.img.ImgService;

@RestController
@RequestMapping("/api")
public class ImgController {
    @Autowired
    private ImgService imgService;
    @RequestMapping("/addImg")
    public Statues<Integer> add(@RequestBody Img img){
        return imgService.add(img.getIname(), img.getIsrc(), img.getUploaddate(), img.getUser().getUid());
    }
}

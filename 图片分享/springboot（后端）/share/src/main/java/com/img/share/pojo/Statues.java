package com.img.share.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Statues<T> {
    private Integer code;
    private String message;
    private T Date;
}

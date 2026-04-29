package com.dashboard.controller;

import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/video")
public class VideoController {

    @GetMapping("/annotations")
    public List<Map<String, String>> getAnnotations() {
        List<Map<String, String>> list = new ArrayList<>();

        Map<String, String> item = new HashMap<>();
        item.put("time", "00:10");
        item.put("label", "Objeto detectado");

        list.add(item);
        return list;
    }
}

package com.dashboard.controller;

import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/video")
public class VideoController {

    @GetMapping("/list")
    public List<String> listVideos() {
        return List.of("video1.mp4", "video2.mp4");
    }

    @GetMapping("/annotations")
    public List<Map<String, String>> annotations() {
        List<Map<String, String>> data = new ArrayList<>();

        Map<String, String> item1 = new HashMap<>();
        item1.put("time", "00:05");
        item1.put("label", "Falha detectada");

        Map<String, String> item2 = new HashMap<>();
        item2.put("time", "00:12");
        item2.put("label", "Anomalia");

        data.add(item1);
        data.add(item2);

        return data;
    }
}
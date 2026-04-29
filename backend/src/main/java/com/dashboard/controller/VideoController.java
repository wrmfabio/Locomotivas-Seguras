package com.dashboard.controller;

import org.springframework.web.bind.annotation.*;
import java.util.*;

@GetMapping("/list")
public List<String> listVideos() {
    File folder = new File("videos");
    String[] files = folder.list((dir, name) -> name.endsWith(".mp4"));

    return Arrays.asList(files);
}

@GetMapping("/{name}")
public ResponseEntity<Resource> getVideo(@PathVariable String name) {
    File file = new File("videos/" + name);
    Resource resource = new FileSystemResource(file);

    return ResponseEntity.ok()
        .contentType(MediaType.parseMediaType("video/mp4"))
        .body(resource);
}

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

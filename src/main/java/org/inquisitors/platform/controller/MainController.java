package org.inquisitors.platform.controller;

import com.google.gson.Gson;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class MainController {

    @RequestMapping(value="/views/summary/heatmap/heatmap")
    public String getComputersTemplate() {
        System.out.println("checked1");
        return "views/summary/heatmap/heatmap";
    }

    @RequestMapping(value="/views/summary/histogram/view")
    public String getPhonesTemplate() {

        System.out.println("checked1");
        return "views/summary/histogram/view";
    }

    @RequestMapping(value="/views/file-upload/file-upload")
    public String getPrintersTemplate() {
        System.out.println("checked1");
        return "views/file-upload/file-upload";
    }

    @RequestMapping(value="/views/summary/querywindow/querywindow")
    public String getComputerDetailsTemplate() {
        System.out.println("checked1");
        return "views/summary/querywindow/querywindow";
    }

    @RequestMapping(value="/views/preprocess/file-upload/file_upload")
    public String getFileUploadTemplate() {
        System.out.println("checked1");
        return "views/preprocess/file-upload/file_upload";
    }

    //-----------------------------------

    Gson gson = new Gson();
    @ResponseBody
    @RequestMapping(value="summary/isdatasetavailable")
    public String isDatasetAvailable() {
        System.out.println("checking for dataset");
        return gson.toJson("available");
    }
}


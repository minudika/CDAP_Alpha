package org.inquisitors.platform.controller.summary;


import com.google.gson.Gson;
import org.abithana.frontConnector.Visualizer;
import org.inquisitors.platform.model.Preprocessor;
import org.json.JSONException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.io.IOException;
import java.util.List;

/**
 * Created by minudika on 11/6/16.
 */

@Controller
public class HistogramController {
    Gson gson = new Gson();
    @ResponseBody
    @RequestMapping(value="/summary/gethistogramdata",method = RequestMethod.POST)
    public String getHistogramResults(@RequestParam("category") String category,@RequestParam("id") String id) throws IOException, JSONException {
        System.out.println("category : "+ category+" | id : "+id);

        /*Visualizer v=new Visualizer();
        v.readFile("./data/sample.csv","crimeData");*/

        Visualizer v = Preprocessor.getVisualizer();
        System.out.println("file read completed");


        if(id.equalsIgnoreCase("years")){
            List list = v.categoryWiseData(category);
            System.out.println(list.toString());
            return gson.toJson(list);
        }
        else{
            List list = v.yearWiseData(Integer.parseInt(category));
            System.out.println(list.toString());
            return gson.toJson(list);
        }
    }
}

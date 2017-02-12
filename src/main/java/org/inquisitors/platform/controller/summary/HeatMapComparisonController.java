package org.inquisitors.platform.controller.summary;

import org.springframework.stereotype.Controller;

/**
 * Created by minudika on 2/2/17.
 */

@Controller
public class HeatMapComparisonController {
   /* Gson gson = new Gson();
    @ResponseBody
    @RequestMapping(value = "/getLocationsForWeekend", method = RequestMethod.POST)
    public String getLocationsForWeekend() throws IOException {
        Visualizer v = Preprocessor.getVisualizer();
        List locations = v.weekendsCrimeLoc();
        return gson.toJson(locations);
    }

    @ResponseBody
    @RequestMapping(value = "/getLocationsForWeekdays", method = RequestMethod.POST)
    public String getLocationsForWeekdays() throws IOException {
        Visualizer v = Preprocessor.getVisualizer();
        List locations = v.weekDaysCrimeLoc();
        return gson.toJson(locations);
    }

    @ResponseBody
    @RequestMapping(value = "/getLocationsTimeRange", method = RequestMethod.POST)
    public String getLocationsForTimeRange(@RequestParam("start") Integer startTime,@RequestParam("end") Integer endTime) throws IOException {
        Visualizer v = Preprocessor.getVisualizer();
        List locations =  v.timeComparison(startTime,endTime);
        return gson.toJson(locations);
    }*/
}

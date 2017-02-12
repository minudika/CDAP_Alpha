package org.inquisitors.platform.controller.prescription;

import com.google.gson.Gson;
import org.abithana.frontConnector.Visualizer_UploadCrime;
import org.abithana.frontConnector.Vizualizer_prescription;
import org.abithana.prescription.beans.CensusBlock;
import org.abithana.prescription.impl.Redistricting.CensusTract;
import org.abithana.prescription.impl.Redistricting.Cluster;
import org.abithana.prescription.impl.patrolBeats.ClusterPatrol;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;

/**
 * Created by minudika on 11/27/16.
 */
@Controller
public class BoundaryController {
    Vizualizer_prescription vp;
    Gson gson = new Gson();
    @ResponseBody
    @RequestMapping(value="/boundaryPolygons",method = RequestMethod.POST)
    public String getBoundaryPolygons(@RequestParam("population") String totalPopulation,@RequestParam("nDistricts") String nDistricts){
        return getBoundaryCoordinates(Integer.parseInt(nDistricts),Integer.parseInt(totalPopulation));
    }
    @ResponseBody
    @RequestMapping(value="/originalBoundaryPolygons",method = RequestMethod.POST)
    public String getOriginalBoundaryPolygons(@RequestParam("districtID") String districtID,@RequestParam("season") Integer season,@RequestParam("weekdays") Integer weekdays, @RequestParam("weekend") Integer weekend, @RequestParam("watch") Integer watch, @RequestParam("nBeats") Integer nBeats){
        int x =10;
        return getOriginalBoundaryCoordinates(season,weekdays,weekend,watch,nBeats,Long.parseLong(districtID));
    }

    private String getBoundaryCoordinates(int nDistricts,int population){
        vp = new Vizualizer_prescription();
        HashMap map = vp.getRedistrictBoundry(nDistricts,population);
        Iterator i = map.keySet().iterator();

        //JSONObject jsonMap = new JSONObject();
        JSONArray jsonMap = new JSONArray();

        int x=0;
        int districtCnt = 0;
        while (i.hasNext()){
            x++;
            //JSONObject jsonCluster = new JSONObject();
            JSONArray jsonCluster = new JSONArray();
            long key = (long) i.next();
            //ArrayList list = (ArrayList) map.get(key);
            HashSet censusTractMap = (HashSet) ((Cluster)map.get(key)).cencusTracts;
            Long clusterID = ((Cluster)map.get(key)).getClusterId();
            Iterator tractIterator = censusTractMap.iterator();

            int cnt =0 ;
            while(tractIterator.hasNext()){
                JSONObject jsonTract = new JSONObject();
                CensusTract ct = (CensusTract) tractIterator.next();
                ArrayList latList = ct.getPolygonLatPoints();
                ArrayList lngList = ct.getPolygonLonPoints();

                try {
                    jsonTract.put("0",latList);
                    jsonTract.put("1",lngList);
                    jsonCluster.put(cnt++,jsonTract);
                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }

            try {
                //jsonMap.put(Integer.toString(districtCnt),jsonTract);
                jsonMap.put(districtCnt++,jsonCluster);
                jsonMap.put(districtCnt++,clusterID);
            } catch (JSONException e) {
                e.printStackTrace();
            }
        }
        Gson gson = new Gson();
        return gson.toJson(jsonMap);
    }

    private String getOriginalBoundaryCoordinates(int season,int weekdays,int weekend,int watch,int nBeats,long districtID){
        Visualizer_UploadCrime uploadCrime=new Visualizer_UploadCrime();
        uploadCrime.getColums("./data/train2.csv");
        uploadCrime.saveTable("MyCrimeData","Dates","Category","DayOfWeek","PdDistrict","Resolution","Y","X");
        HashMap map = (HashMap) vp.generatePatrolBeats(districtID,nBeats,season,weekdays,watch);

        Iterator i = map.keySet().iterator();

        //JSONObject jsonMap = new JSONObject();
        JSONArray jsonMap = new JSONArray();

        int x=0;
        int districtCnt = 0;
        while (i.hasNext()){
            x++;
            //JSONObject jsonCluster = new JSONObject();
            JSONArray jsonCluster = new JSONArray();
            long key = (long) i.next();
            //ArrayList list = (ArrayList) map.get(key);
            HashSet censusTractMap = (HashSet) ((ClusterPatrol)map.get(key)).getCencusTracts();
            Iterator tractIterator = censusTractMap.iterator();

            int cnt =0 ;
            while(tractIterator.hasNext()){
                JSONObject jsonTract = new JSONObject();
                CensusBlock ct = (CensusBlock) tractIterator.next();
                if(ct!=null)
                {
                    ArrayList latList = ct.getPolygonLatPoints();
                    ArrayList lngList = ct.getPolygonLonPoints();

                    try {
                        jsonTract.put("0",latList);
                        jsonTract.put("1",lngList);
                        jsonCluster.put(cnt++,jsonTract);
                    } catch (JSONException e) {
                        e.printStackTrace();
                    }
                }
            }

            try {
                //jsonMap.put(Integer.toString(districtCnt),jsonTract);
                jsonMap.put(districtCnt++,jsonCluster);
            } catch (JSONException e) {
                e.printStackTrace();
            }
        }
        Gson gson = new Gson();
        return gson.toJson(jsonMap);
    }


}

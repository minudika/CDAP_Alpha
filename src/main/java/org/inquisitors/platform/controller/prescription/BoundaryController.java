package org.inquisitors.platform.controller.prescription;

import com.google.gson.Gson;
import org.abithana.frontConnector.Visualizer_UploadCrime;
import org.abithana.frontConnector.Vizualizer_prescription;
import org.abithana.prescription.beans.CensusBlock;
import org.abithana.prescription.impl.Redistricting.CensusTract;
import org.abithana.prescription.impl.Redistricting.Cluster;
import org.abithana.prescription.impl.Redistricting.DistrictBoundryDefiner;
import org.abithana.prescription.impl.patrolBeats.ClusterPatrol;
import org.abithana.statBeans.HistogramBean;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;

/**
 * Created by minudika on 11/27/16.
 */
@Controller
public class BoundaryController {
    List<HistogramBean> clusterPopulationList;

    Vizualizer_prescription vp = new Vizualizer_prescription();
    Gson gson = new Gson();
    int nDistricts = 0;
    int population = 0;
    @ResponseBody
    @RequestMapping(value="/boundaryPolygons",method = RequestMethod.POST)
    public String getBoundaryPolygons(@RequestParam("population") String totalPopulation,@RequestParam("nDistricts") String nDistricts) throws JSONException {
        this.nDistricts = Integer.parseInt(nDistricts);
        this.population = Integer.parseInt(totalPopulation);
        return getBoundaryCoordinates(this.nDistricts,this.population);
    }
    @ResponseBody
    @RequestMapping(value="/originalBoundaryPolygons",method = RequestMethod.POST)
    public String getOriginalBoundaryPolygons(@RequestParam("districtID") String districtID,@RequestParam("season") Integer season,@RequestParam("weekdays") Integer weekdays, @RequestParam("weekend") Integer weekend, @RequestParam("watch") Integer watch, @RequestParam("nBeats") Integer nBeats){
        int x =10;
        return getOriginalBoundaryCoordinates(season,weekdays,weekend,watch,nBeats,Long.parseLong(districtID));
    }

    @ResponseBody
    @RequestMapping(value="/prescription/getHistogram_clusterPopulation",method = RequestMethod.POST)
    public String getHistogram_clusterPopulation(){
        return gson.toJson(clusterPopulationList);
    }

    @ResponseBody
    @RequestMapping(value="/prescription/getHistogramResultsForBeats",method = RequestMethod.POST)
    public String getHistogramResultsDate() throws IOException, JSONException {
        List list = vp.evaluateResponseTime();
        return  gson.toJson(list);
    }

    @ResponseBody
    @RequestMapping(value="/prescription/getHistogramEvalCompactness",method = RequestMethod.POST)
    public String getHistogramEvalCompacness() throws IOException, JSONException {
        List list = vp.evaluateResponseTime();
        return  gson.toJson(list);
    }

    @ResponseBody
    @RequestMapping(value="/prescription/getState",method = RequestMethod.POST)
    public int getState() throws IOException, JSONException {
        return vp.getState();
    }

    @ResponseBody
    @RequestMapping(value="/prescription/getBeatsSeedPoints",method = RequestMethod.POST)
    public String getDSeedpoints() throws IOException, JSONException {
        DistrictBoundryDefiner dbd = new DistrictBoundryDefiner(nDistricts,population);
        dbd.getSeedClusters();
        return null;

    }


    private String getBoundaryCoordinates(int nDistricts,int population) throws JSONException {
        //vp = new Vizualizer_prescription();
        HashMap map = vp.getRedistrictBoundry(nDistricts,population);
        Iterator i = map.keySet().iterator();
        //JSONObject jsonMap = new JSONObject();
        JSONArray jsonMap = new JSONArray();
        clusterPopulationList = new ArrayList<HistogramBean>();

        int x=0;
        int districtCnt = 0;
        while (i.hasNext()){
            x++;
            //JSONObject jsonCluster = new JSONObject();
            JSONArray jsonCluster = new JSONArray();
            long key = (long) i.next();
            //ArrayList list = (ArrayList) map.get(key);
            Cluster cluster = ((Cluster)map.get(key));
            HashSet censusTractMap = (HashSet) cluster.cencusTracts;
            Long clusterID = cluster.getClusterId();
            HistogramBean hBean = new HistogramBean(Long.toString(clusterID),cluster.getPopulation());
            clusterPopulationList.add(hBean);
            Iterator tractIterator = censusTractMap.iterator();

            int cnt =0 ;
            JSONObject jsonC = new JSONObject();
            try {
                jsonC.put("lat",((Cluster)map.get(key)).maxminLatreturn());
                jsonC.put("lng",((Cluster)map.get(key)).maxminLonreturn());
            } catch (JSONException e) {
                e.printStackTrace();
            }
            jsonMap.put(districtCnt++,jsonC);
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

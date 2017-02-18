/**
 * Created by minudika on 11/19/16.
 */
var coordinates = [];
var coordinates2 = [];
var coordinates3 = [];
var coordinates4 = [];
var coordinates_boundaryPopulation = [];
app.controller('histogramController',['$scope','$http',function($scope,$http){

    $scope.model1 = {'value':""};
    $scope.model2 = {'value':""};
    $scope.userState1 = "";
    this.states1 = ('Warrants,Vandalism,Larceny/Theft,Vehicle Theft,Robbery,Assault,Other offenses').split(',').map(function (state) { return { abbrev: state }; });

    $scope.userState2 = "";
    this.states2 = ('2005 2006 2007 2008 2009 2010 2011 2012 2013 2014 2015 ').split(' ').map(function (state) { return { abbrev: state }; });

    $scope.selectedOption = 1;

    $scope.categoriesYearSelected = true;
    $scope.yearsCategorySelected = true;


    $scope.yearsCategory  = "Number of crimes for a given category over years";
    $scope.categoriesYear  = "Number of crimes for a given year over categories";
    $scope.select = function(x) {

       if(x == $scope.yearsCategory){
           $scope.categoriesYearSelected = true;
           $scope.yearsCategorySelected = false;
           $scope.selectedOption = 1;
           console.log("checked1");
           console.log($scope.categoriesYearSelected);
       }
        else{
           $scope.categoriesYearSelected = false;
           $scope.yearsCategorySelected = true;
           $scope.selectedOption = 2;
           console.log("checked2");
           console.log($scope.yearsCategorySelected);
       }
    };
    $scope.options = {};
    $scope.data = [];
    $scope.description="";
    var date = "2015:10";
    var dateRange = "2010:1:2015:12";

    $scope.updateChartForDate = function(){
        queryObj = {'date': date};

        $http({
            method: 'POST',
            url: 'summary/getHistogramResultsForDate',
            data: Object.toParams(queryObj),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function(data){
            $scope.res = JSON.parse(JSON.stringify(data));
            coordinates = $scope.res;
            $scope.selectedOption = 1;
            $scope.options = getChartOptions("Crime Category");
            $scope.data = getChartData();
            $scope.description = $scope.yearsCategory;

            console.log("update clicked");
        });
    }

    $scope.updateChartForDateRange = function(){
        queryObj = {'days': dateRange};

        $http({
            method: 'POST',
            url: 'summary/getHistogramResultsForRange',
            data: Object.toParams(queryObj),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function(data){
            $scope.res = JSON.parse(JSON.stringify(data));
            coordinates = $scope.res;
            $scope.selectedOption = 1;
            $scope.options = getChartOptions("Day");
            $scope.data = getChartData();
            $scope.description = $scope.yearsCategory;

            console.log("update clicked");
        });
    }

    $scope.updateChart = function(x){
        console.log($scope.model1.value);
        console.log($scope.model2.value);
     //   console.log(this.userState2);
        var tmp = "";
        var id = "";

        if(x == "yearsCategory"){
            tmp = ($scope.model1.value).toUpperCase();
            id = "Years";
        }
        else{
            tmp = ($scope.model2.value).toUpperCase();
            id = "Crime Categories";
        }

        queryObj = {'category': tmp,'id' : id};

        $http({
            method: 'POST',
            url: 'summary/gethistogramdata',
            data: Object.toParams(queryObj),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function(data){
            $scope.res = JSON.parse(JSON.stringify(data));
            coordinates = $scope.res;

            if(x== "yearsCategory") {
                $scope.selectedOption = 1;
                $scope.options = getChartOptions(id);
                $scope.data = getChartData();
                $scope.description = $scope.yearsCategory;
                console.log("checked11");
            }
            else{
                $scope.selectedOption = 2;
                $scope.options = getChartOptions(id);
                $scope.data = getChartData();
                $scope.description = $scope.categoriesYear;
                console.log("checked22");
            }
            console.log("update clicked");
        });
    }

    $scope.isDatasetAvailable = false;
    $scope.checkForDataset = function(){
        queryObj = {'param': 'dataset'};

        $http({
            method: 'POST',
            url: 'summary/isdatasetavailable',
            data: Object.toParams(queryObj),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function(data){
            if(data == true){
                console.log("true");
                $scope.isDatasetAvailable = true;
            }
            else{
                console.log("false");
                $scope.isDatasetAvailable = false;
            }
        });
    }

    $scope.initialOperation = function(){
        if($scope.isDatasetAvailable){
            
        }
        else{

        }
    }

}]);

//histpgram for police district populations
app.controller('histogramController_boundaryPopulation',['$scope','$http',function($scope,$http){

    $scope.options = {};
    $scope.data = [];
    $scope.options2 = {};
    $scope.data2 = [];
    $scope.options3 = {};
    $scope.data3 = [];
    $scope.options4 = {};
    $scope.data4 = [];
    $scope.description="";

    $http({
        method: 'POST',
        url: '/prescription/getHistogram_clusterPopulation',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success(function(data){
        $scope.res1 = JSON.parse(JSON.stringify(data));
        coordinates_boundaryPopulation = $scope.res1;
        $scope.options = getChartOptions("Police District");
        $scope.data = getChartData();

        console.log("update clicked");
    });
}]);

app.controller('histogramController_beats',['$scope','$http',function($scope,$http){

    $scope.options = {};
    $scope.data = [];
    $scope.options2 = {};
    $scope.data2 = [];
    $scope.options3 = {};
    $scope.data3 = [];
    $scope.options4 = {};
    $scope.data4 = [];
    $scope.description="";


    //data for histogram 1
    $http({
        method: 'POST',
        url: '/prescription/getHistogramResultsForBeats',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success(function(data){
        $scope.res1 = JSON.parse(JSON.stringify(data));
        coordinates = $scope.res1;
        $scope.options = getChartOptions("Days");
        $scope.data = getChartData();

        console.log("update clicked");
    });

    //data for histogram2
    $http({
        method: 'POST',
        url: 'prescription/getHistogramEvalCompactness',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success(function(data){
        $scope.res2 = JSON.parse(JSON.stringify(data));
        coordinates2 = $scope.res2;
        $scope.options2 = getChartOptions("Beat");
        $scope.data2 = getChartData_eval(coordinates2);
        console.log("update clicked");
    });

   /* $scope.option = getChartOptions_data();
    $scope.data = getChartOptions_data();*/

    $scope.updateChart = function(){


    }


    $scope.initialOperation = function(){
        if($scope.isDatasetAvailable){

        }
        else{

        }
    }

}]);

function  getChartOptions(id){
    return {
        chart: {
            type: 'discreteBarChart',
            height: 450,
            margin : {
                top: 20,
                right: 20,
                bottom: 50,
                left: 55
            },
            x: function(d){return d.label;},
            y: function(d){return d.value;},
            showValues: true,
            valueFormat: function(d){
                return d3.format(',.4f')(d);
            },
            duration: 500,
            xAxis: {
                axisLabel: id,
            },
            yAxis: {
                axisLabel: 'Response Time (seconds)',
                axisLabelDistance: -10
            },
        },
    };
}


function getChartData(){
    var result = [];
    for (var i = 0; i < coordinates_boundaryPopulation.length; i++) {
        result.push({
            label: coordinates_boundaryPopulation[i]['label'],
            value: coordinates_boundaryPopulation[i]['frquncy']
        });
    }
    return [{
        values: result,
        key: 'My Chart',
        mean: 250
    }];
}



function getChartData_eval(coordinateList){
    var result = [];
    for (var i = 0; i < coordinateList.length; i++) {
        result.push({
            label: coordinateList[i]['label'],
            value: coordinateList[i]['frquncy']
        });
    }
    return [{
        values: result,
        key: 'My Chart',
    }];
}


////////////////////////////////
function getChartData_test(){
    var result = [];
    result.push({
            "key" : "Quantity" ,
            "bar": true,
            "values" : [ [ 1136005200000 , 1271000.0] , [ 1138683600000 , 1271000.0] , [ 1141102800000 , 1271000.0] , [ 1143781200000 , 0] , [ 1146369600000 , 0] , [ 1149048000000 , 0] , [ 1151640000000 , 0] , [ 1154318400000 , 0] , [ 1156996800000 , 0] , [ 1159588800000 , 3899486.0] , [ 1162270800000 , 3899486.0] , [ 1164862800000 , 3899486.0] , [ 1167541200000 , 3564700.0] , [ 1170219600000 , 3564700.0] , [ 1172638800000 , 3564700.0] , [ 1175313600000 , 2648493.0] , [ 1177905600000 , 2648493.0] , [ 1180584000000 , 2648493.0] , [ 1183176000000 , 2522993.0] , [ 1185854400000 , 2522993.0] , [ 1188532800000 , 2522993.0] , [ 1191124800000 , 2906501.0] , [ 1193803200000 , 2906501.0] , [ 1196398800000 , 2906501.0] , [ 1199077200000 , 2206761.0] , [ 1201755600000 , 2206761.0] , [ 1204261200000 , 2206761.0] , [ 1206936000000 , 2287726.0] , [ 1209528000000 , 2287726.0] , [ 1212206400000 , 2287726.0] , [ 1214798400000 , 2732646.0] , [ 1217476800000 , 2732646.0] , [ 1220155200000 , 2732646.0] , [ 1222747200000 , 2599196.0] , [ 1225425600000 , 2599196.0] , [ 1228021200000 , 2599196.0] , [ 1230699600000 , 1924387.0] , [ 1233378000000 , 1924387.0] , [ 1235797200000 , 1924387.0] , [ 1238472000000 , 1756311.0] , [ 1241064000000 , 1756311.0] , [ 1243742400000 , 1756311.0] , [ 1246334400000 , 1743470.0] , [ 1249012800000 , 1743470.0] , [ 1251691200000 , 1743470.0] , [ 1254283200000 , 1519010.0] , [ 1256961600000 , 1519010.0] , [ 1259557200000 , 1519010.0] , [ 1262235600000 , 1591444.0] , [ 1264914000000 , 1591444.0] , [ 1267333200000 , 1591444.0] , [ 1270008000000 , 1543784.0] , [ 1272600000000 , 1543784.0] , [ 1275278400000 , 1543784.0] , [ 1277870400000 , 1309915.0] , [ 1280548800000 , 1309915.0] , [ 1283227200000 , 1309915.0] , [ 1285819200000 , 1331875.0] , [ 1288497600000 , 1331875.0] , [ 1291093200000 , 1331875.0] , [ 1293771600000 , 1331875.0] , [ 1296450000000 , 1154695.0] , [ 1298869200000 , 1154695.0] , [ 1301544000000 , 1194025.0] , [ 1304136000000 , 1194025.0] , [ 1306814400000 , 1194025.0] , [ 1309406400000 , 1194025.0] , [ 1312084800000 , 1194025.0] , [ 1314763200000 , 1244525.0] , [ 1317355200000 , 475000.0] , [ 1320033600000 , 475000.0] , [ 1322629200000 , 475000.0] , [ 1325307600000 , 690033.0] , [ 1327986000000 , 690033.0] , [ 1330491600000 , 690033.0] , [ 1333166400000 , 514733.0] , [ 1335758400000 , 514733.0]]
        },
        {
            "key" : "Price" ,
            "values" : [ [ 1136005200000 , 71.89] , [ 1138683600000 , 75.51] , [ 1141102800000 , 68.49] , [ 1143781200000 , 62.72] , [ 1146369600000 , 70.39] , [ 1149048000000 , 59.77] , [ 1151640000000 , 57.27] , [ 1154318400000 , 67.96] , [ 1156996800000 , 67.85] , [ 1159588800000 , 76.98] , [ 1162270800000 , 81.08] , [ 1164862800000 , 91.66] , [ 1167541200000 , 84.84] , [ 1170219600000 , 85.73] , [ 1172638800000 , 84.61] , [ 1175313600000 , 92.91] , [ 1177905600000 , 99.8] , [ 1180584000000 , 121.191] , [ 1183176000000 , 122.04] , [ 1185854400000 , 131.76] , [ 1188532800000 , 138.48] , [ 1191124800000 , 153.47] , [ 1193803200000 , 189.95] , [ 1196398800000 , 182.22] , [ 1199077200000 , 198.08] , [ 1201755600000 , 135.36] , [ 1204261200000 , 125.02] , [ 1206936000000 , 143.5] , [ 1209528000000 , 173.95] , [ 1212206400000 , 188.75] , [ 1214798400000 , 167.44] , [ 1217476800000 , 158.95] , [ 1220155200000 , 169.53] , [ 1222747200000 , 113.66] , [ 1225425600000 , 107.59] , [ 1228021200000 , 92.67] , [ 1230699600000 , 85.35] , [ 1233378000000 , 90.13] , [ 1235797200000 , 89.31] , [ 1238472000000 , 105.12] , [ 1241064000000 , 125.83] , [ 1243742400000 , 135.81] , [ 1246334400000 , 142.43] , [ 1249012800000 , 163.39] , [ 1251691200000 , 168.21] , [ 1254283200000 , 185.35] , [ 1256961600000 , 188.5] , [ 1259557200000 , 199.91] , [ 1262235600000 , 210.732] , [ 1264914000000 , 192.063] , [ 1267333200000 , 204.62] , [ 1270008000000 , 235.0] , [ 1272600000000 , 261.09] , [ 1275278400000 , 256.88] , [ 1277870400000 , 251.53] , [ 1280548800000 , 257.25] , [ 1283227200000 , 243.1] , [ 1285819200000 , 283.75] , [ 1288497600000 , 300.98] , [ 1291093200000 , 311.15] , [ 1293771600000 , 322.56] , [ 1296450000000 , 339.32] , [ 1298869200000 , 353.21] , [ 1301544000000 , 348.5075] , [ 1304136000000 , 350.13] , [ 1306814400000 , 347.83] , [ 1309406400000 , 335.67] , [ 1312084800000 , 390.48] , [ 1314763200000 , 384.83] , [ 1317355200000 , 381.32] , [ 1320033600000 , 404.78] , [ 1322629200000 , 382.2] , [ 1325307600000 , 405.0] , [ 1327986000000 , 456.48] , [ 1330491600000 , 542.44] , [ 1333166400000 , 599.55] , [ 1335758400000 , 583.98]]
        });
   /* for (var i = 0; i < coordinates_boundaryPopulation.length; i++) {
        result.push({
            label: coordinates_boundaryPopulation[i]['label'],
            value: coordinates_boundaryPopulation[i]['frquncy']
        });
    }*/
    return result;
}

function  getChartOptions_data(){
    return {
        chart: {
            type: 'linePlusBarChart',
            height: 500,
            margin: {
                top: 30,
                right: 75,
                bottom: 50,
                left: 75
            },
            bars: {
                forceY: [0]
            },
            bars2: {
                forceY: [0]
            },
            color: ['#2ca02c', 'darkred'],
            x: function(d,i) { return i },
            xAxis: {
                axisLabel: 'X Axis',
                tickFormat: function(d) {
                    var dx = $scope.data[0].values[d] && $scope.data[0].values[d].x || 0;
                    if (dx > 0) {
                        return d3.time.format('%x')(new Date(dx))
                    }
                    return null;
                }
            },
            x2Axis: {
                tickFormat: function(d) {
                    var dx = $scope.data[0].values[d] && $scope.data[0].values[d].x || 0;
                    return d3.time.format('%b-%Y')(new Date(dx))
                },
                showMaxMin: false
            },
            y1Axis: {
                axisLabel: 'Y1 Axis',
                tickFormat: function(d){
                    return d3.format(',f')(d);
                },
                axisLabelDistance: 12
            },
            y2Axis: {
                axisLabel: 'Y2 Axis',
                tickFormat: function(d) {
                    return '$' + d3.format(',.2f')(d)
                }
            },
            y3Axis: {
                tickFormat: function(d){
                    return d3.format(',f')(d);
                }
            },
            y4Axis: {
                tickFormat: function(d) {
                    return '$' + d3.format(',.2f')(d)
                }
            }
        }
    };
}
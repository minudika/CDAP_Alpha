/**
 * Created by minudika on 11/19/16.
 */

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
            $scope.options = getChartOptions("Days");
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
            $scope.options = getChartOptions("Days");
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

app.controller('histogramController_beats',['$scope','$http',function($scope,$http){

    $scope.options = {};
    $scope.data = [];
    $scope.description="";

    $http({
        method: 'POST',
        url: 'prescription/getHistogramResultsForBeats',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success(function(data){
        $scope.res = JSON.parse(JSON.stringify(data));
        coordinates = $scope.res;
        $scope.options = getChartOptions("Days");
        $scope.data = getChartData();

        console.log("update clicked");
    });

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
        }

    };
}


function getChartData(){
    var result = [];
    for (var i = 0; i < coordinates.length; i++) {
        result.push({
            label: coordinates[i]['label'],
            value: coordinates[i]['frquncy']
        });
    }
    return [{
        values: result,
        key: 'My Chart',
    }];
}

/*function getChartData(){
    return [
        {
            key: "Cumulative Return",
            values: [
                {
                    "label": "A",
                    "value": -29.765957771107
                },
                {
                    "label": "B",
                    "value": 0
                },
                {
                    "label": "C",
                    "value": 32.807804682612
                },
                {
                    "label": "D",
                    "value": 196.45946739256
                },
                {
                    "label": "E",
                    "value": 0.19434030906893
                },
                {
                    "label": "F",
                    "value": -98.079782601442
                },
                {
                    "label": "G",
                    "value": -13.925743130903
                },
                {
                    "label": "H",
                    "value": -5.1387322875705
                }
            ]
        }
    ]
}*/


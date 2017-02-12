app.controller('ComparisonController',['$scope','$http',function($scope,$http){
    var coordinates;
    var heatmap_L, heatmap_R;
    var mapOptions = {
        center: {lat: 37.7090296042376, lng: -122.446571654745},
        zoom: 8
    };
    var map1 = new google.maps.Map(document.getElementById('map-comp1'), mapOptions);
    //var map2 = new google.maps.Map(document.getElementById('map-comp2'), mapOptions);

    var queryObj = {'startYear': 2010, 'endYear': 2015};

    heatmap_L = new google.maps.visualization.HeatmapLayer({
        // data: getPoints(),
        map: map1
    });

   /* heatmap_R = new google.maps.visualization.HeatmapLayer({
        // data: getPoints(),
        map: map2
    });*/


    $http({
        method: 'POST',
        data:Object.toParams(queryObj),
        url: 'summary/getTimeLapseData',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success(function(data){
        if(data != "null") {
            $scope.res = JSON.parse(JSON.stringify(data));
            coordinates = $scope.res;

            console.log("sdfsdfs"+data);
            //console.log(category);

            heatmap_L.setData(getPoints());
        }
    });

    /*$http({
        method: 'POST',
        url: 'getLocationsForWeekend',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success(function(data){
        if(data != "null") {
            $scope.res = JSON.parse(JSON.stringify(data));
            coordinates = $scope.res;

            console.log("sdfsdfs"+data);
           // console.log(category);

            heatmap_R.setData(getPoints());
        }
    });*/
}]);


function getPoints() {
    var locations = [];
    if(coordinates != null){
    for(var i=0;i<coordinates.length;i++){
        locations.push(new google.maps.LatLng(coordinates[i]['x'], coordinates[i]['y']));
    }
    }
    else{
        console.log("check mate");
    }
    return locations;
}

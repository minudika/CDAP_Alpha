app.controller('BeatsController',['$scope','$http',function($scope,$http){
  var heatmap;
  var seedCoordinates = [];
  var seedMarkers = [];
  var colors = ["#6dff00","#ff0000","#ff8800","#fff200","#00ffd3","#0090ff","#0100b1","#c600c3",
    "#ff54a8","#398400","#e9b4ce","#2dff83","#bea200","#001d26"];

  $scope.isFileAvailable = false;
  $scope.message  = "";
  var polygons = [];
  var map = new google.maps.Map(document.getElementById('map1'), {
    center: {lat: 37.77419580, lng: -122.44778840},
    zoom: 13
  });

  heatmap = new google.maps.visualization.HeatmapLayer({
    //data: getPoints(),
    map: map
  });






  $scope.submitBeatsParams = function () {
    var txtDistrictID = document.getElementById("districtID");
    var txtnBeats = document.getElementById("nBeats");
    var opSeason = document.getElementById("seasons");
    var weekdaysSelect = document.getElementById("weekdays");
    var weekendSelect = document.getElementById("weekend");

    var nBeats = txtnBeats.value;
    var watch = document.getElementById("watch").value;
    var districtID = txtDistrictID.value;
    var season = opSeason.value;
    var weekdaysSelected = weekdaysSelect.checked == true ? 1 : 0;
    var weekendSelected = weekendSelect.checked == true ? 1 : 0;

    $scope.message  = "Please wait until data is loaded..";

    queryObj = {'districtID':districtID,'nBeats':nBeats, 'season': season,'weekdays' : weekdaysSelected, 'weekend' : weekendSelected,'watch':watch};

    $http({
      method: 'POST',
      data : Object.toParams(queryObj),
      url: 'originalBoundaryPolygons',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success(function(result){
      $scope.message  = "";
      var id=0;
      var color;
      for(var j=0;j<result["myArrayList"].length;j++){
        if(nBeats > colors.length) {
          color = getRandomColor();
        }
        else{
          color = colors[id++];
        }
        for(var k=0;k<result["myArrayList"][j]["myArrayList"].length;k++){

          var latTmp =  result["myArrayList"][j]["myArrayList"][k]["map"][0]["myArrayList"];
          var lngTmp =  result["myArrayList"][j]["myArrayList"][k]["map"][1]["myArrayList"];

          var polygonCoordinates = [];

          for(var i=0;i<latTmp.length;i++){
            polygonCoordinates.push({lat:latTmp[i],lng:lngTmp[i]});
          }

          var polygon = new google.maps.Polygon({
            paths: polygonCoordinates,
            strokeColor: '#FF0000',
            strokeOpacity: 0.4,
            strokeWeight: 1,
            fillColor: color,
            fillOpacity: 0.8
          });


          polygon.setMap(map);
        }
        //polygons.push(polygon);
      }
    });


    /*request seed points*/
    queryObj = {'districtID':districtID,'nBeats':nBeats, 'season': season,'weekdays' : weekdaysSelected, 'weekend' : weekendSelected,'watch':watch};
    $http({
      method: 'POST',
      url: 'prescription/getBeatsSeedPoints',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success(function(result){
      if(data != "null") {
        $scope.seeds = JSON.parse(JSON.stringify(data));
        seedCoordinates = $scope.seeds;
        for(var i=0;i<seedCoordinates.length;i++){
          var marker = new google.maps.Marker({
            position: { lat: seedCoordinates[i]['y'], lng: seedCoordinates[i]['x'] },
            label: i+1,
            map: map
          });
          //locations.push(new google.maps.LatLng(coordinates[i]['x'], coordinates[i]['y']));
        }
        heatmap.setData(getPoints());
      }
    });
    /*********************/

    queryObj = {'startYear': 2010, 'endYear': 2015}

    $http({
      method: 'POST',
      url: 'summary/getTimeLapseData',
      data: Object.toParams(queryObj),
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success(function(data){
      if(data != "null") {
        $scope.res = JSON.parse(JSON.stringify(data));
        coordinates = $scope.res;

        console.log("heatmap initialized");

        heatmap.setData(getPoints());
      }
    });
  }



}]);

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++ ) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function getPoints() {
  var locations = [];
  for(var i=0;i<coordinates.length;i++){
    locations.push(new google.maps.LatLng(coordinates[i]['x'], coordinates[i]['y']));
  }
  return locations;
}

app.controller('BoundaryController',['$scope','$http',function($scope,$http){

  $scope.isFileAvailable = false;
  $scope.message  = "";
  var polygons = [];
  var colors = ["#ff0000","#ffec00","#00d116","#007bd1","#c100d1","#02f4f8","#ff7400","#1300ff","#ff7abe","#003605"];
  var map = new google.maps.Map(document.getElementById('map1'), {
    center: {lat: 37.77419580, lng: -122.44778840},
    zoom: 13
  });
  var map2 = new google.maps.Map(document.getElementById('map2'), {
    center: {lat: 37.77419580, lng: -122.44778840},
    zoom: 13
  });

  $scope.submitBoundaryMapParams = function () {
    var nDistricts = document.getElementById("nDistricts").value;
    var population = document.getElementById("population").value;

    $scope.message  = "Please wait until data is loaded..";
    queryObj1 = {'nDistricts': nDistricts,'population' : population};

    $http({
      method: 'POST',
      data : Object.toParams(queryObj1),
      url: 'boundaryPolygons',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success(function(result){
      $scope.message  = "";
      var id=0;
      for(var j=0;j<result["myArrayList"].length;j=j+3){
        //var color = getRandomColor(id);
        color = colors[id];
        id++;
        var clusterID = result["myArrayList"][j+2];
        var latTmp1 = result["myArrayList"][j]["map"]["lat"];
        var lngTmp1 = result["myArrayList"][j]["map"]["lng"];

        var polygonCoordinates1 = [];

        for(var i=0;i<latTmp1.length;i++){
          polygonCoordinates1.push({lat:latTmp1[i],lng:lngTmp1[i]});
        }

        var polygon = new google.maps.Polygon({
          paths: polygonCoordinates1,
          strokeColor: color,
          strokeOpacity: 0,
          strokeWeight: 3,
          fillColor: color,
          fillOpacity: 0,
          label:'sdfsdf',
        });
        polygon.setMap(map);

        for(var k=0;k<result["myArrayList"][j+1]["myArrayList"].length;k++){

          var latTmp =  result["myArrayList"][j+1]["myArrayList"][k]["map"][0]["myArrayList"];
          var lngTmp =  result["myArrayList"][j+1]["myArrayList"][k]["map"][1]["myArrayList"];

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
            fillOpacity: 0.8,
            label:'sdfsdf',
          });
          polygon.setMap(map);
        }
        //polygons.push(polygon);
      }
    });
/*
    $http({
      method: 'POST',
      data : Object.toParams(queryObj1),
      url: 'originalBoundaryPolygons',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success(function(result){
      $scope.message  = "";
      for(var j=0;j<result["myArrayList"].length;j++){
        var color = getRandomColor();
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


          polygon.setMap(map2);
        }
        //polygons.push(polygon);
      }
    });*/
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

function getColor(count) {
  var colors = ["ff0000","ffec00","00d116","007bd1","c100d1","02f4f8","ff7400","1300ff","ff7abe","003605"];
  return colors;
}

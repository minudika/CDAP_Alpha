/**
 * Created by minudika on 9/9/16.
 */
/*var app = angular.module('myApp', ['ngMaterial']);*/


app.controller('MyController',function($scope,$http,$timeout, $mdSidenav, $routeParams, $location, $window,$mdDialog) {
//    $scope.openLeftMenu = function() {
//        $mdSidenav('left').toggle();
//    };


         console.log($scope.Data);
//         $http({
//                  method: 'POST',
//                  url: 'getCrimefileLoaded',
//                  headers: {'Content-Type': 'application/x-www-form-urlencoded'}
//              }).success(function(result){
//                if(result != null){
//                    $scope.crimeFile = result;
//              }
//                else
//                    $scope.crimeFile = "No File";
//              console.log(result);
//              });

      $scope.status = '  ';
      $scope.customFullscreen = false;
      $scope.showAlert = function(ev) {
         // Appending dialog to document.body to cover sidenav in docs app
         // Modal dialogs should fully cover application
         // to prevent interaction outside of dialog
         $mdDialog.show(
           $mdDialog.alert()
             .parent(angular.element(document.querySelector('#popupContainer')))
             .clickOutsideToClose(true)
             .title('Available Datasets')
             .textContent('<h1>You can specify some description text in here.</h1>')
             .ariaLabel('Alert Dialog Demo')
             .ok('Got it!')
             .targetEvent(ev)
         );
       };
     $scope.toggleLeft = buildToggler('left');
      $scope.toggleRight = buildToggler('right');
        $scope.toggleDataSet = function(){
        $http({
                          method: 'POST',
                          url: 'getCrimefileLoaded',
                          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                      }).success(function(result){
                        if(result != null){
                            $scope.crimeFile = result;
                            $scope.crimeFileParts = $scope.crimeFile.split("/");
                             $scope.crimeFileName = $scope.crimeFileParts[3];
                      }
                        else
                            $scope.crimeFile = "No File";
                            console.log(result);
                      });

        }
        $scope.home = [
                {
                    image: '/resources/svg/uploader.svg',
                    who: 'Upload File',
                    path: '/#/views/uploadfile'

                }
            ]

        $scope.prediction = [
        {
            image: '/resources/svg/model-train.svg',
            who: 'Train Model',
            path: '/#/views/trainmodel'
            }
        ]

        $scope.prescription = [
        {
            image: '/resources/svg/model-train.svg',
            who: 'Redrawing District Boundaries',
            path: '#/views/policeboundaries'
            }
        ]

        $scope.preprocess = [
                {
                    image: '/resources/svg/preprocess.svg',
                    who: 'Preproces Data',
                    path: '/#/views/fileupload'
                    }
                ]

        $scope.visualization = [
            {
                image: '/resources/svg/map.svg',
                who: 'Heat Map',
                path: '/#/views/1'
            },
            {
                image: '/resources/svg/graph.svg',
                who: 'Histogram',
                path: '/#/views/2',
            },
            {
                image: '/resources/svg/query.svg',
                who: 'Query',
                path: '/#/views/query',
            },
            {
                image: '/resources/svg/timelaps.svg',
                who: 'Heatmap Timelaps',
                path: '/#/views/heatmap-timelaps',
            },

        ];

        function buildToggler(componentId) {
            return function() {
                $mdSidenav(componentId).toggle();
              }
         }

         function AppCtrl($scope) {
            $scope.currentNavItem = 'page1';
         }

         $scope.go = function ( path ) {
           //$location.path(path);
           $window.location.href = path;

         };


});


app.controller('MyCtrl', ['$scope', 'Upload', '$timeout', function ($scope, Upload, $timeout) {
    $scope.$watch('files', function () {
        $scope.upload($scope.files);
    });
    $scope.$watch('file', function () {
        if ($scope.file != null) {
            $scope.files = [$scope.file];
        }
    });
    $scope.log = '';

    $scope.upload = function (files) {
        if (files && files.length) {
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                if (!file.$error) {
                    Upload.upload({
                        url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
                        data: {
                            username: $scope.username,
                            file: file
                        }
                    }).then(function (resp) {
                        $timeout(function() {
                            $scope.log = 'file: ' +
                                resp.config.data.file.name +
                                ', Response: ' + JSON.stringify(resp.data) +
                                '\n' + $scope.log;
                        });
                    }, null, function (evt) {
                        var progressPercentage = parseInt(100.0 *
                            evt.loaded / evt.total);
                        $scope.log = 'progress: ' + progressPercentage +
                            '% ' + evt.config.data.file.name + '\n' +
                            $scope.log;
                    });
                }
            }
        }
    };
}]);

app.controller('aMenuCtrl',['$scope',function($scope){
    $scope.onAtATime = true;
}]);

app.controller('sliderCtrl', function($scope) {
    $scope.slider = {
        value: 100,
        options: {
            id: 'slider-id',
            onStart: function(id) {
                console.log('on start ' + id); // logs 'on start slider-id'
            },
            onChange: function(id) {
                console.log('on change ' + id, $scope.slider.value); // logs 'on change slider-id'
            },
            onEnd: function(id) {
                console.log('on end ' + id); // logs 'on end slider-id'
            }
        }
    };

    $scope.userState = '';
    $scope.states = ('AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS ' +
    'MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI ' +
    'WY').split(' ').map(function (state) { return { abbrev: state }; });

    $scope.items = ['one','two','three','four'];

});



/*
Heatmap controller-------------------------------------------------------------------------------
*/

var lattitudes = null;
var longitudes = null;
//var locations = [];
var coordinates = [];

app.controller('mainCtrl', ['$scope', '$mdSidenav', '$mdUtil', function ($scope, $mdSidenav, $mdUtil) {


    $scope.toggleLeft = buildToggler('left');

    function buildToggler(navID) {
        var debounceFn = $mdUtil.debounce(function () {
            $mdSidenav(navID)
                .toggle()
        }, 100);
        return debounceFn;
    }}]);

app.controller('AccordionDemoCtrl', function ($scope) {
    $scope.oneAtATime = true;

    $scope.groups = [
        {
            title: 'Dynamic Group Header - 1',
            content: 'Dynamic Group Body - 1'
        },
        {
            title: 'Dynamic Group Header - 2',
            content: 'Dynamic Group Body - 2'
        }
    ];

    $scope.items = ['Item 1', 'Item 2', 'Item 3'];

    $scope.addItem = function() {
        var newItemNo = $scope.items.length + 1;
        $scope.items.push('Item ' + newItemNo);
    };

    $scope.status = {
        isCustomHeaderOpen: false,
        isFirstOpen: true,
        isFirstDisabled: false
    };
});



app.controller('mapController',['$scope','$http',function($scope,$http){
     $scope.list = [];
    $scope.listModel = [];
    //$scope.categoryList=[];
     $http({
                    method: 'POST',
                    url: 'getCategories',
                     headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                     }).success(function(results){
                          $scope.categoryList = results;
                            //$scope.listModel = results;
                          console.log($scope.categoryList.length);
                           for(var i=0; i < $scope.categoryList.length ; i++){
                                  $scope.list.push(false);
                               $scope.listModel.push(false);
                              }
                            console.log($scope.list);
              });



    var mapOptions = {
        center: {lat: 37.7090296042376, lng: -122.446571654745},
        zoom: 8
    };
    var map = new google.maps.Map(document.getElementById('map'), mapOptions);

    //getPoints();
    heatmap = new google.maps.visualization.HeatmapLayer({
       // data: getPoints(),
        map: map
    });

    $scope.data = {};
    $scope.data.fraud = false;
    $scope.data.robbery = false;
    $scope.data.burglary = false;
    $scope.data.kidnapping = false;
    $scope.data.theft = false;
    $scope.data.suicide = false;
    $scope.data.otherOffenses = false;

   // $scope.list = [false,false,false,false,false,false,false];
   // $scope.categoryList = ['WARRANTS','VANDALISM','LARCENY/THEFT','VEHICLE THEFT','ROBBERY','ASSAULT','OTHER OFFENSES'];

    $scope.initialize = function(category) {

        $scope.list[category] = !($scope.list[category]);
        console.log($scope.categoryList[category]);

        var str = "";
        for(var x=0;x< $scope.categoryList.length ;x++){
            if($scope.list[x]){
                str += $scope.categoryList[x] + ":";
            }
        }

        queryObj = {'category': str}
        console.log(str);

        /*$http({
            type: 'GET',
            url: 'summary/getheatmapdata',
            dataType: 'json',
            data:{"category":category},
            success: function(result) {
                var res = JSON.parse(JSON.stringify(result));
                coordinates = res;
            }
        });*/

        $http({
            method: 'POST',
            url: 'summary/getheatmapdata',
            data: Object.toParams(queryObj),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function(data){
            if(data != "null") {
                $scope.res = JSON.parse(JSON.stringify(data));
                coordinates = $scope.res;

                console.log("sdfsdfs"+data);
                console.log(category);

                heatmap.setData(getPoints());
                // getPoints();


            }
        });
    };
    
    this.userState1 = '';
    this.states1 = ('AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS ' +
    'MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI ' +
    'WY').split(' ').map(function (state) { return { abbrev: state }; });

    this.userState2 = '';
    this.states2 = ('AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS ' +
    'MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI ' +
    'WY').split(' ').map(function (state) { return { abbrev: state }; });

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

    $scope.updateChart = function(x){
        if(x== "yearsCategory") {
            $scope.selectedOption = 1;
            $scope.options = getChartOptions();
            $scope.data = getChartData();
            $scope.description = $scope.yearsCategory;
            console.log("checked11");
        }
        else{
            $scope.selectedOption = 2;
            $scope.options = getChartOptions();
            $scope.data = getChartData();
            $scope.description = $scope.categoriesYear;
            console.log("checked22");
        }
        console.log("update clicked");

    }
}]);

/*function getPoints() {
    for(var i=1;i<coordinates["myArrayList"].length;i++){
        locations.push(new google.maps.LatLng(coordinates[i]["map"], coordinates[i]['x']));
    }
    return locations;
}*/

function getPoints() {
    var locations = [];
    for(var i=0;i<coordinates.length;i++){
        locations.push(new google.maps.LatLng(coordinates[i]['y'], coordinates[i]['x']));
    }
    return locations;
}

function loadData(){

}

/*function getPoints() {
    var locations = [
        new google.maps.LatLng(37.782551, -122.445368),
        new google.maps.LatLng(37.782745, -122.444586),
        new google.maps.LatLng(37.782842, -122.443688),
        new google.maps.LatLng(37.782919, -122.442815),
        new google.maps.LatLng(37.782992, -122.442112),
        new google.maps.LatLng(37.783100, -122.441461),
        new google.maps.LatLng(37.783206, -122.440829),
        new google.maps.LatLng(37.783273, -122.440324),
        new google.maps.LatLng(37.783316, -122.440023),
        new google.maps.LatLng(37.783357, -122.439794),
        new google.maps.LatLng(37.783371, -122.439687),
        new google.maps.LatLng(37.783368, -122.439666),
        new google.maps.LatLng(37.783383, -122.439594),
        new google.maps.LatLng(37.783508, -122.439525),
        new google.maps.LatLng(37.783842, -122.439591),
        new google.maps.LatLng(37.784147, -122.439668),
        new google.maps.LatLng(37.784206, -122.439686),
        new google.maps.LatLng(37.784386, -122.439790),
        new google.maps.LatLng(37.784701, -122.439902),
        new google.maps.LatLng(37.784965, -122.439938),
        new google.maps.LatLng(37.785010, -122.439947),
        new google.maps.LatLng(37.785360, -122.439952),
        new google.maps.LatLng(37.785715, -122.440030),
        new google.maps.LatLng(37.786117, -122.440119),
        new google.maps.LatLng(37.786564, -122.440209),
        new google.maps.LatLng(37.786905, -122.440270),
        new google.maps.LatLng(37.786956, -122.440279),
        new google.maps.LatLng(37.800224, -122.433520),
        new google.maps.LatLng(37.800155, -122.434101),
        new google.maps.LatLng(37.800160, -122.434430),
        new google.maps.LatLng(37.800378, -122.434527),
        new google.maps.LatLng(37.800738, -122.434598),
        new google.maps.LatLng(37.800938, -122.434650),
        new google.maps.LatLng(37.801024, -122.434889),
        new google.maps.LatLng(37.800955, -122.435392),
        new google.maps.LatLng(37.800886, -122.435959),
        new google.maps.LatLng(37.800811, -122.436275),
        new google.maps.LatLng(37.800788, -122.436299),
        new google.maps.LatLng(37.800719, -122.436302),
        new google.maps.LatLng(37.800702, -122.436298),
        new google.maps.LatLng(37.800661, -122.436273),
        new google.maps.LatLng(37.800395, -122.436172),
        new google.maps.LatLng(37.800228, -122.436116),
        new google.maps.LatLng(37.800169, -122.436130),
        new google.maps.LatLng(37.800066, -122.436167),
        new google.maps.LatLng(37.784345, -122.422922),
        new google.maps.LatLng(37.784389, -122.422926),
        new google.maps.LatLng(37.784437, -122.422924),
        new google.maps.LatLng(37.784746, -122.422818),
        new google.maps.LatLng(37.785436, -122.422959),
        new google.maps.LatLng(37.786120, -122.423112),
        new google.maps.LatLng(37.786433, -122.423029),
        new google.maps.LatLng(37.786631, -122.421213),
        new google.maps.LatLng(37.786660, -122.421033),
        new google.maps.LatLng(37.786801, -122.420141),
        new google.maps.LatLng(37.786823, -122.420034),
        new google.maps.LatLng(37.786831, -122.419916),
        new google.maps.LatLng(37.787034, -122.418208),
        new google.maps.LatLng(37.787056, -122.418034),
        new google.maps.LatLng(37.787169, -122.417145),
        new google.maps.LatLng(37.787217, -122.416715),
        new google.maps.LatLng(37.786144, -122.416403),
        new google.maps.LatLng(37.785292, -122.416257),
        new google.maps.LatLng(37.780666, -122.390374),
        new google.maps.LatLng(37.780501, -122.391281),
        new google.maps.LatLng(37.780148, -122.392052),
        new google.maps.LatLng(37.780173, -122.391148),
        new google.maps.LatLng(37.780693, -122.390592),
        new google.maps.LatLng(37.781261, -122.391142),
        new google.maps.LatLng(37.781808, -122.391730),
        new google.maps.LatLng(37.782340, -122.392341),
        new google.maps.LatLng(37.782812, -122.393022),
        new google.maps.LatLng(37.783300, -122.393672),
        new google.maps.LatLng(37.783809, -122.394275),
        new google.maps.LatLng(37.784246, -122.394979),
        new google.maps.LatLng(37.784791, -122.395958),
        new google.maps.LatLng(37.785675, -122.396746),
        new google.maps.LatLng(37.786262, -122.395780),
        new google.maps.LatLng(37.786776, -122.395093),
        new google.maps.LatLng(37.787282, -122.394426),
        new google.maps.LatLng(37.787783, -122.393767),
        new google.maps.LatLng(37.788343, -122.393184),
        new google.maps.LatLng(37.788895, -122.392506),
        new google.maps.LatLng(37.789371, -122.391701),
        new google.maps.LatLng(37.789722, -122.390952),
        new google.maps.LatLng(37.790315, -122.390305),
        new google.maps.LatLng(37.790738, -122.389616),
        new google.maps.LatLng(37.779448, -122.438702),
        new google.maps.LatLng(37.779023, -122.438585),
        new google.maps.LatLng(37.778542, -122.438492),
        new google.maps.LatLng(37.778100, -122.438411),
        new google.maps.LatLng(37.777986, -122.438376),
        new google.maps.LatLng(37.777680, -122.438313),
        new google.maps.LatLng(37.777316, -122.438273),
        new google.maps.LatLng(37.777135, -122.438254),
        new google.maps.LatLng(37.776987, -122.438303),
        new google.maps.LatLng(37.776946, -122.438404),
        new google.maps.LatLng(37.776944, -122.438467),
        new google.maps.LatLng(37.776892, -122.438459),
        new google.maps.LatLng(37.776842, -122.438442),
        new google.maps.LatLng(37.776822, -122.438391),
        new google.maps.LatLng(37.776814, -122.438412),
        new google.maps.LatLng(37.776787, -122.438628),
        new google.maps.LatLng(37.776729, -122.438650),
        new google.maps.LatLng(37.776759, -122.438677),
        new google.maps.LatLng(37.776772, -122.438498),
        new google.maps.LatLng(37.776787, -122.438389),
        new google.maps.LatLng(37.776848, -122.438283),
        new google.maps.LatLng(37.776870, -122.438239),
        new google.maps.LatLng(37.777015, -122.438198),
        new google.maps.LatLng(37.777333, -122.438256),
        new google.maps.LatLng(37.777595, -122.438308),
        new google.maps.LatLng(37.777797, -122.438344),
        new google.maps.LatLng(37.778160, -122.438442),
        new google.maps.LatLng(37.778414, -122.438508),
        new google.maps.LatLng(37.778445, -122.438516),
        new google.maps.LatLng(37.778503, -122.438529),
        new google.maps.LatLng(37.778607, -122.438549),
        new google.maps.LatLng(37.778670, -122.438644),
        new google.maps.LatLng(37.778847, -122.438706),
        new google.maps.LatLng(37.779240, -122.438744),
        new google.maps.LatLng(37.779738, -122.438822),
        new google.maps.LatLng(37.780201, -122.438882),
        new google.maps.LatLng(37.780400, -122.438905),
        new google.maps.LatLng(37.780501, -122.438921),
        new google.maps.LatLng(37.780892, -122.438986),
        new google.maps.LatLng(37.781446, -122.439087),
        new google.maps.LatLng(37.781985, -122.439199),
        new google.maps.LatLng(37.782239, -122.439249),
        new google.maps.LatLng(37.782286, -122.439266),
        new google.maps.LatLng(37.797847, -122.429388),
        new google.maps.LatLng(37.797874, -122.429180),
        new google.maps.LatLng(37.797885, -122.429069),
        new google.maps.LatLng(37.797887, -122.429050),
        new google.maps.LatLng(37.797933, -122.428954),
        new google.maps.LatLng(37.798242, -122.428990),
        new google.maps.LatLng(37.798617, -122.429075),
        new google.maps.LatLng(37.798719, -122.429092),
        new google.maps.LatLng(37.798944, -122.429145),
        new google.maps.LatLng(37.799320, -122.429251),
        new google.maps.LatLng(37.799590, -122.429309),
        new google.maps.LatLng(37.799677, -122.429324),
        new google.maps.LatLng(37.799966, -122.429360),
        new google.maps.LatLng(37.800288, -122.429430),
        new google.maps.LatLng(37.800443, -122.429461),
        new google.maps.LatLng(37.800465, -122.429474),
        new google.maps.LatLng(37.800644, -122.429540),
        new google.maps.LatLng(37.800948, -122.429620),
        new google.maps.LatLng(37.801242, -122.429685),
        new google.maps.LatLng(37.801375, -122.429702),
        new google.maps.LatLng(37.801400, -122.429703),
        new google.maps.LatLng(37.801453, -122.429707),
        new google.maps.LatLng(37.801473, -122.429709),
        new google.maps.LatLng(37.801532, -122.429707),
        new google.maps.LatLng(37.801852, -122.429729),
        new google.maps.LatLng(37.802173, -122.429789),
        new google.maps.LatLng(37.802459, -122.429847),
        new google.maps.LatLng(37.802554, -122.429825),
        new google.maps.LatLng(37.802647, -122.429549),
        new google.maps.LatLng(37.802693, -122.429179),
        new google.maps.LatLng(37.802729, -122.428751),
        new google.maps.LatLng(37.766104, -122.409291),
        new google.maps.LatLng(37.766103, -122.409268),
        new google.maps.LatLng(37.766138, -122.409229),
        new google.maps.LatLng(37.766183, -122.409231),
        new google.maps.LatLng(37.766153, -122.409276),
        new google.maps.LatLng(37.766005, -122.409365),
        new google.maps.LatLng(37.765897, -122.409570),
        new google.maps.LatLng(37.765767, -122.409739),
        new google.maps.LatLng(37.765693, -122.410389),
        new google.maps.LatLng(37.765615, -122.411201),
        new google.maps.LatLng(37.765533, -122.412121),
        new google.maps.LatLng(37.765467, -122.412939),
        new google.maps.LatLng(37.765444, -122.414821),
        new google.maps.LatLng(37.765444, -122.414964),
        new google.maps.LatLng(37.765318, -122.415424),
        new google.maps.LatLng(37.763961, -122.415296),
        new google.maps.LatLng(37.763115, -122.415196),
        new google.maps.LatLng(37.762967, -122.415183),
        new google.maps.LatLng(37.762278, -122.415127),
        new google.maps.LatLng(37.761675, -122.415055),
        new google.maps.LatLng(37.760932, -122.414988),
        new google.maps.LatLng(37.759337, -122.414862),
        new google.maps.LatLng(37.773187, -122.421922),
        new google.maps.LatLng(37.773043, -122.422118),
        new google.maps.LatLng(37.773007, -122.422165),
        new google.maps.LatLng(37.772979, -122.422219),
        new google.maps.LatLng(37.772865, -122.422394),
        new google.maps.LatLng(37.772779, -122.422503),
        new google.maps.LatLng(37.772676, -122.422701),
        new google.maps.LatLng(37.772606, -122.422806),
        new google.maps.LatLng(37.772566, -122.422840),
        new google.maps.LatLng(37.772508, -122.422852),
        new google.maps.LatLng(37.772387, -122.423011),
        new google.maps.LatLng(37.772099, -122.423328),
        new google.maps.LatLng(37.771704, -122.423783),
        new google.maps.LatLng(37.771481, -122.424081),
        new google.maps.LatLng(37.771400, -122.424179),
        new google.maps.LatLng(37.771352, -122.424220),
        new google.maps.LatLng(37.771248, -122.424327),
        new google.maps.LatLng(37.770904, -122.424781),
        new google.maps.LatLng(37.770520, -122.425283),
        new google.maps.LatLng(37.770337, -122.425553),
        new google.maps.LatLng(37.770128, -122.425832),
        new google.maps.LatLng(37.769756, -122.426331),
        new google.maps.LatLng(37.769300, -122.426902),
        new google.maps.LatLng(37.769132, -122.427065),
        new google.maps.LatLng(37.769092, -122.427103),
        new google.maps.LatLng(37.768979, -122.427172),
        new google.maps.LatLng(37.768595, -122.427634),
        new google.maps.LatLng(37.768372, -122.427913),
        new google.maps.LatLng(37.768337, -122.427961),
        new google.maps.LatLng(37.768244, -122.428138),
        new google.maps.LatLng(37.767942, -122.428581),
        new google.maps.LatLng(37.767482, -122.429094),
        new google.maps.LatLng(37.767031, -122.429606),
        new google.maps.LatLng(37.766732, -122.429986),
        new google.maps.LatLng(37.766680, -122.430058),
        new google.maps.LatLng(37.766633, -122.430109),
        new google.maps.LatLng(37.766580, -122.430211),
        new google.maps.LatLng(37.766367, -122.430594),
        new google.maps.LatLng(37.765910, -122.431137),
        new google.maps.LatLng(37.765353, -122.431806),
        new google.maps.LatLng(37.764962, -122.432298),
        new google.maps.LatLng(37.764868, -122.432486),
        new google.maps.LatLng(37.764518, -122.432913),
        new google.maps.LatLng(37.763435, -122.434173),
        new google.maps.LatLng(37.762847, -122.434953),
        new google.maps.LatLng(37.762291, -122.435935),
        new google.maps.LatLng(37.762224, -122.436074),
        new google.maps.LatLng(37.761957, -122.436892),
        new google.maps.LatLng(37.761652, -122.438886),
        new google.maps.LatLng(37.761284, -122.439955),
        new google.maps.LatLng(37.761210, -122.440068),
        new google.maps.LatLng(37.761064, -122.440720),
        new google.maps.LatLng(37.761040, -122.441411),
        new google.maps.LatLng(37.761048, -122.442324),
        new google.maps.LatLng(37.760851, -122.443118),
        new google.maps.LatLng(37.759977, -122.444591),
        new google.maps.LatLng(37.759913, -122.444698),
        new google.maps.LatLng(37.759623, -122.445065),
        new google.maps.LatLng(37.758902, -122.445158),
        new google.maps.LatLng(37.758428, -122.444570),
        new google.maps.LatLng(37.757687, -122.443340),
        new google.maps.LatLng(37.757583, -122.443240),
        new google.maps.LatLng(37.757019, -122.442787),
        new google.maps.LatLng(37.756603, -122.442322),
        new google.maps.LatLng(37.756380, -122.441602),
        new google.maps.LatLng(37.755790, -122.441382),
        new google.maps.LatLng(37.754493, -122.442133),
        new google.maps.LatLng(37.754361, -122.442206),
        new google.maps.LatLng(37.753719, -122.442650),
        new google.maps.LatLng(37.753096, -122.442915),
        new google.maps.LatLng(37.751617, -122.443211),
        new google.maps.LatLng(37.751496, -122.443246),
        new google.maps.LatLng(37.750733, -122.443428),
        new google.maps.LatLng(37.750126, -122.443536),
        new google.maps.LatLng(37.750103, -122.443784),
        new google.maps.LatLng(37.750390, -122.444010),
        new google.maps.LatLng(37.750448, -122.444013),
        new google.maps.LatLng(37.750536, -122.444040),
        new google.maps.LatLng(37.750493, -122.444141),
        new google.maps.LatLng(37.790859, -122.402808),
        new google.maps.LatLng(37.790864, -122.402768),
        new google.maps.LatLng(37.790995, -122.402539),
        new google.maps.LatLng(37.791148, -122.402172),
        new google.maps.LatLng(37.791385, -122.401312),
        new google.maps.LatLng(37.791405, -122.400776),
        new google.maps.LatLng(37.791288, -122.400528),
        new google.maps.LatLng(37.791113, -122.400441),
        new google.maps.LatLng(37.791027, -122.400395),
        new google.maps.LatLng(37.791094, -122.400311),
        new google.maps.LatLng(37.791211, -122.400183),
        new google.maps.LatLng(37.791060, -122.399334),
        new google.maps.LatLng(37.790538, -122.398718),
        new google.maps.LatLng(37.790095, -122.398086),
        new google.maps.LatLng(37.789644, -122.397360),
        new google.maps.LatLng(37.789254, -122.396844),
        new google.maps.LatLng(37.788855, -122.396397),
        new google.maps.LatLng(37.788483, -122.395963),
        new google.maps.LatLng(37.788015, -122.395365),
        new google.maps.LatLng(37.787558, -122.394735),
        new google.maps.LatLng(37.787472, -122.394323),
        new google.maps.LatLng(37.787630, -122.394025),
        new google.maps.LatLng(37.787767, -122.393987),
        new google.maps.LatLng(37.787486, -122.394452),
        new google.maps.LatLng(37.786977, -122.395043),
        new google.maps.LatLng(37.786583, -122.395552),
        new google.maps.LatLng(37.786540, -122.395610),
        new google.maps.LatLng(37.786516, -122.395659),
        new google.maps.LatLng(37.786378, -122.395707),
        new google.maps.LatLng(37.786044, -122.395362),
        new google.maps.LatLng(37.785598, -122.394715),
        new google.maps.LatLng(37.785321, -122.394361),
        new google.maps.LatLng(37.785207, -122.394236),
        new google.maps.LatLng(37.785751, -122.394062),
        new google.maps.LatLng(37.785996, -122.393881),
        new google.maps.LatLng(37.786092, -122.393830),
        new google.maps.LatLng(37.785998, -122.393899),
        new google.maps.LatLng(37.785114, -122.394365),
        new google.maps.LatLng(37.785022, -122.394441),
        new google.maps.LatLng(37.784823, -122.394635),
        new google.maps.LatLng(37.784719, -122.394629),
        new google.maps.LatLng(37.785069, -122.394176),
        new google.maps.LatLng(37.785500, -122.393650),
        new google.maps.LatLng(37.785770, -122.393291),
        new google.maps.LatLng(37.785839, -122.393159),
        new google.maps.LatLng(37.782651, -122.400628),
        new google.maps.LatLng(37.782616, -122.400599),
        new google.maps.LatLng(37.782702, -122.400470),
        new google.maps.LatLng(37.782915, -122.400192),
        new google.maps.LatLng(37.783137, -122.399887),
        new google.maps.LatLng(37.783414, -122.399519),
        new google.maps.LatLng(37.783629, -122.399237),
        new google.maps.LatLng(37.783688, -122.399157),
        new google.maps.LatLng(37.783716, -122.399106),
        new google.maps.LatLng(37.783798, -122.399072),
        new google.maps.LatLng(37.783997, -122.399186),
        new google.maps.LatLng(37.784271, -122.399538),
        new google.maps.LatLng(37.784577, -122.399948),
        new google.maps.LatLng(37.784828, -122.400260),
        new google.maps.LatLng(37.784999, -122.400477),
        new google.maps.LatLng(37.785113, -122.400651),
        new google.maps.LatLng(37.785155, -122.400703),
        new google.maps.LatLng(37.785192, -122.400749),
        new google.maps.LatLng(37.785278, -122.400839),
        new google.maps.LatLng(37.785387, -122.400857),
        new google.maps.LatLng(37.785478, -122.400890),
        new google.maps.LatLng(37.785526, -122.401022),
        new google.maps.LatLng(37.785598, -122.401148),
        new google.maps.LatLng(37.785631, -122.401202),
        new google.maps.LatLng(37.785660, -122.401267),
        new google.maps.LatLng(37.803986, -122.426035),
        new google.maps.LatLng(37.804102, -122.425089),
        new google.maps.LatLng(37.804211, -122.424156),
        new google.maps.LatLng(37.803861, -122.423385),
        new google.maps.LatLng(37.803151, -122.423214),
        new google.maps.LatLng(37.802439, -122.423077),
        new google.maps.LatLng(37.801740, -122.422905),
        new google.maps.LatLng(37.801069, -122.422785),
        new google.maps.LatLng(37.800345, -122.422649),
        new google.maps.LatLng(37.799633, -122.422603),
        new google.maps.LatLng(37.799750, -122.421700),
        new google.maps.LatLng(37.799885, -122.420854),
        new google.maps.LatLng(37.799209, -122.420607),
        new google.maps.LatLng(37.795656, -122.400395),
        new google.maps.LatLng(37.795203, -122.400304),
        new google.maps.LatLng(37.778738, -122.415584),
        new google.maps.LatLng(37.778812, -122.415189),
        new google.maps.LatLng(37.778824, -122.415092),
        new google.maps.LatLng(37.778833, -122.414932),
        new google.maps.LatLng(37.778834, -122.414898),
        new google.maps.LatLng(37.778740, -122.414757),
        new google.maps.LatLng(37.778501, -122.414433),
        new google.maps.LatLng(37.778182, -122.414026),
        new google.maps.LatLng(37.777851, -122.413623),
        new google.maps.LatLng(37.777486, -122.413166),
        new google.maps.LatLng(37.777109, -122.412674),
        new google.maps.LatLng(37.776743, -122.412186),
        new google.maps.LatLng(37.776440, -122.411800),
        new google.maps.LatLng(37.776295, -122.411614),
        new google.maps.LatLng(37.776158, -122.411440),
        new google.maps.LatLng(37.775806, -122.410997),
        new google.maps.LatLng(37.775422, -122.410484),
        new google.maps.LatLng(37.775126, -122.410087),
        new google.maps.LatLng(37.775012, -122.409854),
        new google.maps.LatLng(37.775164, -122.409573),
        new google.maps.LatLng(37.775498, -122.409180),
        new google.maps.LatLng(37.775868, -122.408730),
        new google.maps.LatLng(37.776256, -122.408240),
        new google.maps.LatLng(37.776519, -122.407928),
        new google.maps.LatLng(37.776539, -122.407904),
        new google.maps.LatLng(37.776595, -122.407854),
        new google.maps.LatLng(37.776853, -122.407547),
        new google.maps.LatLng(37.777234, -122.407087),
        new google.maps.LatLng(37.777644, -122.406558),
        new google.maps.LatLng(37.778066, -122.406017),
        new google.maps.LatLng(37.778468, -122.405499),
        new google.maps.LatLng(37.778866, -122.404995),
        new google.maps.LatLng(37.779295, -122.404455),
        new google.maps.LatLng(37.779695, -122.403950),
        new google.maps.LatLng(37.779982, -122.403584),
        new google.maps.LatLng(37.780295, -122.403223),
        new google.maps.LatLng(37.780664, -122.402766),
        new google.maps.LatLng(37.781043, -122.402288),
        new google.maps.LatLng(37.781399, -122.401823),
        new google.maps.LatLng(37.781727, -122.401407),
        new google.maps.LatLng(37.781853, -122.401247),
        new google.maps.LatLng(37.781894, -122.401195),
        new google.maps.LatLng(37.782076, -122.400977),
        new google.maps.LatLng(37.782338, -122.400603),
        new google.maps.LatLng(37.782666, -122.400133),
        new google.maps.LatLng(37.783048, -122.399634),
        new google.maps.LatLng(37.783450, -122.399198),
        new google.maps.LatLng(37.783791, -122.398998),
        new google.maps.LatLng(37.784177, -122.398959),
        new google.maps.LatLng(37.784388, -122.398971),
        new google.maps.LatLng(37.784404, -122.399128),
        new google.maps.LatLng(37.784586, -122.399524),
        new google.maps.LatLng(37.784835, -122.399927),
        new google.maps.LatLng(37.785116, -122.400307),
        new google.maps.LatLng(37.785282, -122.400539),
        new google.maps.LatLng(37.785346, -122.400692),
        new google.maps.LatLng(37.765769, -122.407201),
        new google.maps.LatLng(37.765790, -122.407414),
        new google.maps.LatLng(37.765802, -122.407755),
        new google.maps.LatLng(37.765791, -122.408219),
        new google.maps.LatLng(37.765763, -122.408759),
        new google.maps.LatLng(37.765726, -122.409348),
        new google.maps.LatLng(37.765716, -122.409882),
        new google.maps.LatLng(37.765708, -122.410202),
        new google.maps.LatLng(37.765705, -122.410253),
        new google.maps.LatLng(37.765707, -122.410369),
        new google.maps.LatLng(37.765692, -122.410720),
        new google.maps.LatLng(37.765699, -122.411215),
        new google.maps.LatLng(37.765687, -122.411789),
        new google.maps.LatLng(37.765666, -122.412373),
        new google.maps.LatLng(37.765598, -122.412883),
        new google.maps.LatLng(37.765543, -122.413039),
        new google.maps.LatLng(37.765532, -122.413125),
        new google.maps.LatLng(37.765500, -122.413553),
        new google.maps.LatLng(37.765448, -122.414053),
        new google.maps.LatLng(37.765388, -122.414645),
        new google.maps.LatLng(37.765323, -122.415250),
        new google.maps.LatLng(37.765303, -122.415847),
        new google.maps.LatLng(37.765251, -122.416439),
        new google.maps.LatLng(37.765204, -122.417020),
        new google.maps.LatLng(37.765172, -122.417556),
        new google.maps.LatLng(37.765164, -122.418075),
        new google.maps.LatLng(37.765153, -122.418618),
        new google.maps.LatLng(37.765136, -122.419112),
        new google.maps.LatLng(37.765129, -122.419378),
        new google.maps.LatLng(37.765119, -122.419481),
        new google.maps.LatLng(37.765100, -122.419852),
        new google.maps.LatLng(37.765083, -122.420349),
        new google.maps.LatLng(37.765045, -122.420930),
        new google.maps.LatLng(37.764992, -122.421481),
        new google.maps.LatLng(37.764980, -122.421695),
        new google.maps.LatLng(37.764993, -122.421843),
        new google.maps.LatLng(37.764986, -122.422255),
        new google.maps.LatLng(37.764975, -122.422823),
        new google.maps.LatLng(37.764939, -122.423411),
        new google.maps.LatLng(37.764902, -122.424014),
        new google.maps.LatLng(37.764853, -122.424576),
        new google.maps.LatLng(37.764826, -122.424922),
        new google.maps.LatLng(37.764796, -122.425375),
        new google.maps.LatLng(37.764782, -122.425869),
        new google.maps.LatLng(37.764768, -122.426089),
        new google.maps.LatLng(37.764766, -122.426117),
        new google.maps.LatLng(37.764723, -122.426276),
        new google.maps.LatLng(37.764681, -122.426649),
        new google.maps.LatLng(37.782012, -122.404200),
        new google.maps.LatLng(37.781574, -122.404911),
        new google.maps.LatLng(37.781055, -122.405597),
        new google.maps.LatLng(37.780479, -122.406341),
        new google.maps.LatLng(37.779996, -122.406939),
        new google.maps.LatLng(37.779459, -122.407613),
        new google.maps.LatLng(37.778953, -122.408228),
        new google.maps.LatLng(37.778409, -122.408839),
        new google.maps.LatLng(37.777842, -122.409501),
        new google.maps.LatLng(37.777334, -122.410181),
        new google.maps.LatLng(37.776809, -122.410836),
        new google.maps.LatLng(37.776240, -122.411514),
        new google.maps.LatLng(37.775725, -122.412145),
        new google.maps.LatLng(37.775190, -122.412805),
        new google.maps.LatLng(37.774672, -122.413464),
        new google.maps.LatLng(37.774084, -122.414186),
        new google.maps.LatLng(37.773533, -122.413636),
        new google.maps.LatLng(37.773021, -122.413009),
        new google.maps.LatLng(37.772501, -122.412371),
        new google.maps.LatLng(37.771964, -122.411681),
        new google.maps.LatLng(37.771479, -122.411078),
        new google.maps.LatLng(37.770992, -122.410477),
        new google.maps.LatLng(37.770467, -122.409801),
        new google.maps.LatLng(37.770090, -122.408904),
        new google.maps.LatLng(37.769657, -122.408103),
        new google.maps.LatLng(37.769132, -122.407276),
        new google.maps.LatLng(37.768564, -122.406469),
        new google.maps.LatLng(37.767980, -122.405745),
        new google.maps.LatLng(37.767380, -122.405299),
        new google.maps.LatLng(37.766604, -122.405297),
        new google.maps.LatLng(37.765838, -122.405200),
        new google.maps.LatLng(37.765139, -122.405139),
        new google.maps.LatLng(37.764457, -122.405094),
        new google.maps.LatLng(37.763716, -122.405142),
        new google.maps.LatLng(37.762932, -122.405398),
        new google.maps.LatLng(37.762126, -122.405813),
        new google.maps.LatLng(37.761344, -122.406215),
        new google.maps.LatLng(37.760556, -122.406495),
        new google.maps.LatLng(37.759732, -122.406484),
        new google.maps.LatLng(37.758910, -122.406228),
        new google.maps.LatLng(37.758182, -122.405695),
        new google.maps.LatLng(37.757676, -122.405118),
        new google.maps.LatLng(37.757039, -122.404346),
        new google.maps.LatLng(37.756335, -122.403719),
        new google.maps.LatLng(37.755503, -122.403406),
        new google.maps.LatLng(37.754665, -122.403242),
        new google.maps.LatLng(37.753837, -122.403172),
        new google.maps.LatLng(37.752986, -122.403112),
        new google.maps.LatLng(37.751266, -122.403355)
    ];

    return locations;
}*/

function  getChartOptions(){
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
                axisLabel: 'X Axis'
            },
            yAxis: {
                axisLabel: 'Y Axis',
                axisLabelDistance: -10
            },
        }

    };
}

function getChartData(){
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
}





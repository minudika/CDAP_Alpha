'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('myApp', [
  'ngRoute',
    'ngMaterial',
    'rzModule',
    'nvd3',
    'ui.bootstrap'
]);
/*config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');
  /!*$routeProvider.otherwise({redirectTo: '/view1'});*!/
}]);*/

Object.toParams= function toParams(obj) {
    var p = [];
    for (var key in obj) {
        p.push(key + '=' + encodeURIComponent(obj[key]));
    }
    return p.join('&');
}


app.config(function ($routeProvider,$mdThemingProvider) {
    $mdThemingProvider.theme('altTheme')
        .primaryPalette('teal');

    $mdThemingProvider.setDefaultTheme('altTheme');

    $routeProvider
      .when('/views/1', {
        controller: 'MyController',
        templateUrl: 'views/summary/heatmap/heatmap'
      })
      .when('/views/2', {
          controller: 'histogramController',
          templateUrl: 'views/summary/histogram/view'
      })
      .when('/views/file-upload', {
          controller: 'MyController',
          templateUrl: 'views/file-upload/file-upload'
      })
      .when('/views/query', {
          controller: 'MyController',
          templateUrl: 'views/summary/querywindow/querywindow'
      })
        .when('/views/fileupload', {
            controller: 'MyController',
            templateUrl: 'views/preprocess/file-upload/file_upload'
        })
      .otherwise({
        redirectTo: '/'
      });
});





//========================


/***** Application *****/

/*angular.module('adminMenu',['windows','ui.bootstrap'])

    .controller('aMenuCtrl',['$scope',function($scope){
        $scope.onAtATime = true;
    }]) // end aMenuCtrl

/!**/
app.controller('aMenuCtrl',['$scope',function($scope){
    $scope.onAtATime = true;
}]);

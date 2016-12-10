/**
 * Created by minudika on 10/4/16.
 */

/*app.controller('queryController',['$scope','$http',function($scope,$http){
    $scope.executeQuery = function() {
        $http.post('summary/executequery').success(function (data) {
            $scope.results = data;
            console.log(data);
        });
    };
}]);*/

app.controller('queryController',['$scope','$http',function($scope,$http){
    $scope.executeQuery = function() {
        queryObj = {'query': $scope.query}

        /*Object.toparams = function ObjecttoParams(obj) {
            var p = [];
            for (var key in obj) {
                p.push(key + '=' + encodeURIComponent(obj[key]));
            }
            return p.join('&');
        };*/

        $http({
            method: 'POST',
            url: 'summary/executequery',
            data: Object.toParams(queryObj),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function(data){
            $scope.results = data;
            console.log(data)
        });
    };
}]);


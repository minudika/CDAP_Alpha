

app.controller('TrnCtrl',['$scope','$http','$element','Upload', '$timeout',function($scope, $http, $element,Upload,$timeout) {
      $scope.path = "./data/";
       pathObj = {'path' : $scope.path}
                  $http({
                              method: 'POST',
                              url: 'getfilelist',
                              data: Object.toParams(pathObj),
                              headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                          }).success(function(result){
                          $scope.files = result;
                          console.log(result);
                          });
      $scope.algorithm = {
                type: 'one',
                column: ['one', 'two', 'three'],
      }
      //$scope.Data = Data;
      $scope.trees          = {value: 0};
      $scope.blocksize      = {value: 0};
      $scope.maxIterations  = {value: 0};
      $scope.folds          = {value: 0};
      $scope.nodes          = {value: ""};
      $scope.seeds          = {value: 0};
      $scope.selectedLabel;
      $scope.fileLocation   = "./data/sample.csv";
      $scope.isCompleted    = false;

      $scope.algos = [
           {algo: "Multilayer Perceptron Classification", value: "one"},
           {algo: "Random Forest", value: "two"},
           {algo: "Naive Baysian", value:"three"}
           ];

    $scope.uploadFiles = function(file, errFiles) {
            $scope.f = file;

            $scope.errFile = errFiles && errFiles[0];
            if (file) {
                file.upload = Upload.upload({
                    url: 'controller/upload',
                    //data: {file: file}
                    file: file
                });
                file.upload.then(function (response) {
                    console.log(response);
                    $timeout(function () {
                        file.result = response.data;
                    });
                }, function (response) {
                    if (response.status > 0)
                        $scope.errorMsg = response.status + ': ' + response.data;
                }, function (evt) {
                    file.progress = Math.min(100, parseInt(100.0 *
                                             evt.loaded / evt.total));
                });
            }
        }


    $http({
                 method: 'POST',
                 url: 'getColumnNames',
                 headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                 }).success(function(data){
                      $scope.columns = data;
                      $scope.labels = data;
                      $scope.searchTerm;
                      $scope.clearSearchTerm = function() {
                      $scope.searchTerm = '';
                      };
                      console.log("data".data);
          });
          // The md-select directive eats keydown events for some quick select
          // logic. Since we have a search input here, we don't need that logic.
          $element.find('input').on('keydown', function(ev) {
              ev.stopPropagation();
          });



//       $scope.getSelectedText = function() {
//                   if ($scope.selectedAlgo.label !== undefined) {
//                            return  $scope.selectedAlgo.label;
//                          } else {
//                            return "select the Label";
//                          }
//                };


        $scope.trainModel = function() {
            $scope.isLoading = true;
            trainObject = {'type'           : $scope.selectedAlgo.type,
                           'trees'          : $scope.trees.value,
                           'layer'          : $scope.nodes.value,
                           'option'         : $scope.selectedAlgo.option,
                           'blockSize'      : $scope.blocksize.value,
                           'maxIterations'  : $scope.maxIterations.value,
                           'folds'          : $scope.folds.value,
                           'columns'        : $scope.selectedAlgo.columns,
                           'label'          : $scope.selectedAlgo.label,
                           'partitions'     : $scope.selectedAlgo.partitions,
                           'seeds'          : $scope.seeds.value
                           }

             $http({
                        method: 'POST',
                        url: 'trainmodel',
                        data: Object.toParams(trainObject),
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                    }).success(function(data){
                        //console.log(data);
                        $scope.content      = data;
                        $scope.isCompleted  = true;
                        $scope.isLoading    = false;
//                       $http({
//                               method: 'POST',
//                               url: 'getaccuracy',
//                               data: Object.toParams(trainObject),
//                               headers: {'Content-Type': 'application/x-www-form-urlencoded'}
//                               }).success(function(datas){
//                                    $scope.content = datas;
//                                    $scope.isCompleted = true;
//                                    $scope.isLoading = false;
//                                    //console.log($scope.content);
//                               });

                    });

        }

        $scope.uploadFiles = function(file, errFiles, option) {
                $scope.f = file;
                $scope.errFile = errFiles && errFiles[0];
                if (file) {

                    uploadObject = {'file' : file,
                                    'type' : option
                                   }
                    $scope.urlCall = "controller/upload3";

                    file.upload = Upload.upload({
                        url: $scope.urlCall,
                        file: file
                    });

                    file.upload.then(function (response) {
                        $timeout(function () {
                            file.result = response.data;
                        });
                    }, function (response) {
                        if (response.status > 0)
                            $scope.errorMsg = response.status + ': ' + response.data;
                    }, function (evt) {
                        file.progress = Math.min(100, parseInt(100.0 *
                                                 evt.loaded / evt.total));
                    });

                          }
            }
}]);


angular.module('tasksList')
    .controller('taskCtr', function($http,$scope, dataUrl, dataService,$rootScope  ){

        console.log($scope.currentItem);
        console.log(oldata = window.var1);
        var id = window.var1;
        dataService.getData().then(function(data){
            var dataItem=data.data.filter(function(data){ return data.jobNumber==id;})
            $scope.currentItem=dataItem[0];

        });
    });
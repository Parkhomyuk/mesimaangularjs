angular.module('tasksService',[])
    /*.factory('dataTasks',[$http,function($http){
 return {
 getTasks: function($scope,$http,dataUrl){
 $http({
 method:'GET',
 /!*url:"data.json"*!/
 url:dataUrl
 }).then(function successCallback(data){
 $scope.data.products=data.data;
 console.log($scope.data.products);
 }, function errorCallback(error){
 console.log(JSON.stringify(error));
 $scope.data.error=error;
 });
 }
 }
 }])*/
angular.module('tasksList',['ngAnimate',"ngRoute","ui.bootstrap"])
    .config(['$locationProvider', function($locationProvider){
        $locationProvider.hashPrefix('');
    }])
    .config(function($routeProvider){
        $routeProvider.when("/complete", {
            templateUrl: "view/thankYou.html"
        });
        $routeProvider.when("/placeorder", {
            templateUrl: "view/placeOrder.html"
        });
        $routeProvider.when("/checkout", {
            templateUrl:"app/views/checkout.html"
        });
        $routeProvider.when("/products",{
            templateUrl:"view/productList.html"
        });
        $routeProvider.otherwise({
            templateUrl:"app/views/mesimaList.html"
        })
    })

    .factory('dataService', function($http, $q, dataUrl){
        return{
            getData: function(){
                var deferred = $q.defer();
                $http({method: 'GET', url: dataUrl}).
                then (function success(response) {
                        deferred.resolve(response.data);

                    },function error(response) {
                        deferred.reject(response.status);
                    }
                );
                console.log(deferred.promise);
                return deferred.promise;
            },
            /*getDataById: function(jobNumber){
                var deffered=$q.defer();
                $http({method:'GET', url:dataUrl}).
                    then(function success(responce){
                    deffered.resolve(responce.data);
                }, function error (responce){
                    deffered.reject(responce.status);
                }
                );
                return deffered.promise;
            },*/
            currentItem:null,
            currentCategory:null,
            currentSubCategory:[]

        }
    })
    .filter('pagesCount',function(){
        return function(data, size){
            if(angular.isArray(data)){
                var result=[];
                for (var i=0;i<Math.ceil(data.length/size);i++){
                    result.push(i);
                }
                return result;
            }else{
                return data;
            }

        }
    } )
    .filter('range', function($filter){
        return function(data, page, size){
            if(angular.isArray(data)&&angular.isNumber(page)&&angular.isNumber(size)){
                var start_index=(page-1)*size;
                if(start_index>data.length){
                    return [];
                }else{
                    return $filter('limitTo')(data.slice(start_index), size);
                }
            }else{
                return data;
            }
        }
    })
    .constant("dataUrl","data.json")
    .constant("pageCount",5);
angular.module('tasksList')
    .filter("unique",function(){
        return function(data, property){
            if (angular.isArray(data) && angular.isString(property)) {
                var result = [];
                var keys = {};
                for(var i=0;i<data.length;i++){
                    var val=data[i][property];
                    if(angular.isUndefined(keys[val])){
                        keys[val]=true;
                        result.push(val)
                    }
                }
                return result;
            }else{
                return data;
            }
        }
    });
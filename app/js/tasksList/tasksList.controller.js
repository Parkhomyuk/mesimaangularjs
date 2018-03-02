angular.module('tasksList')
    .controller('tasksListCtr', function($http,$scope, dataUrl, dataService, pageCount, $window, $rootScope){
        $scope.name='add to List a new task';
        $scope.data={};
        $scope.currentCategory=null;
        $scope.currentSubCategory=[];
        var selectedCategory = null;
        var selectedSubCategory = null;
        $scope.currentPage=1;
        $scope.countItemsOnPage=pageCount;
        $scope.currentItem='none';
        $scope.choosedType={name:'Открытые', style:{color:'green'}, type:'open'};
        $scope.searchWord=null;

        dataService.getData().then(function(data){

            if(dataService.currentCategory==null){
                $scope.data.mesimot=data.data;
                $scope.data.mesimotStart=data.data;
            }else{

                $scope.currentSubCategory=dataService.currentSubCategory;


               $scope.currentCategory=null;
               /* $scope.currentCategory=dataService.currentCategory;*/
                console.log(' current category '+dataService.currentCategory);
                dataService.currentSubCategory=[];
                $scope.data.mesimot=data.data.filter(function(data){return data.category==dataService.currentCategory});
                for(var i in $scope.data.mesimot){
                    if(($scope.data.mesimot[i].category==dataService.currentCategory)&&(dataService.currentSubCategory.indexOf($scope.data.mesimot[i].subCategory)==-1)){
                        /*$scope.currentSubCategory.push($scope.data.mesimot[i].subCategory);*/
                        dataService.currentSubCategory.push($scope.data.mesimot[i].subCategory);

                    }
                }
                $scope.currentSubCategory=dataService.currentSubCategory;
                $scope.currentCategory=null;
                console.log(' current Subcategory '+$scope.currentSubCategory);
            }

        });
        $scope.showHomeMenu=function(){
            selectedCategory=null;
            selectedSubCategory=null;
            dataService.getData().then(function(data){
                $scope.data.mesimot=data.data;
            });
        }

            $scope.showSubMenu=function(categ){

                if(categ==undefined){
                     selectedCategory=null;
                    dataService.getData().then(function(data){
                        $scope.data.mesimot=data.data;
                    });
                }
                console.log('categ '+categ);
                /*if($scope.currentCategory==null){*/
                if(categ!=undefined){
                    $scope.currentCategory=categ;
                    dataService.currentItem=categ;
                    dataService.currentCategory=categ;
                    dataService.currentSubCategory=[];
                    selectedCategory=categ;
                    for(var i in $scope.data.mesimot){
                        if(($scope.data.mesimot[i].category==categ)&&(dataService.currentSubCategory.indexOf($scope.data.mesimot[i].subCategory)==-1)){
                            dataService.currentSubCategory.push($scope.data.mesimot[i].subCategory);
                        }
                    }
                    $scope.currentSubCategory=dataService.currentSubCategory;
                    $scope.data.mesimot=$scope.data.mesimot.filter(function(data){return data.category==categ});

                } else{
                    $scope.currentCategory=null;        }

            }
        $scope.selectSubCategory=function(subCateg){
            $scope.currentPage=1;
             selectedSubCategory = subCateg;
            dataService.currentCategory=subCateg;

        }
        $scope.subCategoryFilterFn=function(mesima){
            return selectedSubCategory==null || mesima.subCategory==selectedSubCategory;
        }
        $scope.showMe=false;
        $scope.cType=[{name:'Открытые', style:{color:'green'}, type:'open'},{name:'Завершенные', style:{color:'red'}, type:'closure'},{name:'Выполняются', style:{color:'yellow'}, type:'performed'}];
        $scope.choosedType=$scope.cType[0];

        $scope.choosType=function(type){
            $scope.data.mesimot= $scope.data.mesimotStart;
            $scope.choosedType=type;
            $scope.showMe=false;
            $scope.data.mesimot=$scope.data.mesimot.filter(function(data){ return data.status==type.type});
            console.log(type);
        }
        $scope.openList=function(){
            if(!$scope.showMe){
            $scope.showMe=true;
            } else{
                $scope.showMe=false;
            }
        }

        $scope.showItem= function(item){
            dataService.currentItem=item;
              /*dataService.currentCategory=null;
            $scope.currentItem=item; */
                $rootScope.currentItem=item;
                 $window.open('index.html#/checkout', '_blank').var1=item.jobNumber;

            console.log($scope.currentItem);
            console.log(dataService.currentItem);
            console.log(dataService.currentCategory);
            console.log(dataService.currentSubCategory);

        }
        $scope.selectPage=function(page){
            $scope.currentPage=page;
            console.log($scope.currentPage)
        }
        $scope.searchByKeyWord=function(){
            console.log($scope.searchWord);
            var arraySearch=[];
            for(var i=0;i<$scope.data.mesimot.length;i++){
                if($scope.data.mesimot[i].description.indexOf($scope.searchWord)!=-1){
                    arraySearch.push($scope.data.mesimot[i]);
                }
            }
            $scope.data.mesimot=arraySearch;

        }
        $scope.canselSearchByKeyWord= function(){
            dataService.getData().then(function(data){
                $scope.data.mesimot=data.data;
            });
            $scope.searchWord='';
        }


           });
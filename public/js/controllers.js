angular.module("controllers",[])
.controller("index",["$scope","$http",function($scope,$http){
    $http({url:"/ajaxNews"}).then(function(data){
       $scope.data=data.data;
    })
}]).controller("show",["$scope","$http","$routeParams",function($scope,$http,$routeParams){
    var id=$routeParams.id
    $http({url:"/ajaxNewsCon?id="+id}).then(function(data){
        $scope.con=data.data.con;
    })
}])
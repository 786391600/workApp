angular.module("controllers",["services"])
.controller("index",["$scope","$http",function($scope,$http){
    $http({url:"/ajaxNews"}).then(function(data){
       $scope.data=data.data;
    })
}]).controller("show",["$scope","$http","$routeParams",function($scope,$http,$routeParams){
    var id=$routeParams.id
    $http({url:"/ajaxNewsCon?id="+id}).then(function(data){
        $scope.con=data.data.con;
    })
}]).controller("phone",["$scope","$http","$filter",function($scope,$http,$filter){
    $http({url:"/ajaxPhone"}).then(function(data){
        var data=data.data;
        var arr=[];
        for(var i=0;i<data.length;i++){
            var current=[];
            for(var j=1;j<data.length;j++){
                if((data[i].en==data[j].en)&&!data[j].flag){
                    data[j].flag=true;
                    current.push(data[i]);
                    current.en=data[i].en
                }
            }
            if(current.length>0) {
                arr.push(current);
                var arr=$filter("orderBy")(arr,"en")
            }
        }
        $scope.data=arr;
        console.log($scope.data);
        $scope.type="";
        $scope.filter=function(en){
            $scope.type=en;
        }
        $scope.show=function(){
            $scope.type="";
        }

        var placeholder = document.querySelector(".mui-placeholder");
        var input = document.querySelector(".mui-input-clear");
        placeholder.onclick = function () {
            this.style.width = "20px";
            input.focus();
        }

        input.onblur = function () {
            placeholder.style.width = "100%";
        }
    })/*在多个页面当中共享数据  serevices*/
}]).controller("todo",["$scope","todoData",function($scope,todoData){
    $scope.data=todoData;
    $scope.del=function(id){
        for(var i=0;i< $scope.data.length;i++){
            if($scope.data[i].id==id){
                $scope.data.splice(i,1);
            }
        }

        localStorage.todo=JSON.stringify($scope.data);
    }
}]).controller("todoadd",["$scope","todoData",function($scope,todoData){
        $scope.data=todoData;
        $scope.save=function(){
         var con=document.querySelector(".todocon").innerHTML;
         var conObj={con:con,id:getMaxId($scope.data)+1};
         $scope.data.push(conObj);
         localStorage.todo=JSON.stringify($scope.data);
         location.href="#!/todo"
        }

        function getMaxId(con){
            return con.length>0?con.sort(function(a,b){
                    return a.id>b.id;
                })[con.length-1].id:0;

        }
    }]);


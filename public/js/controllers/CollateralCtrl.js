angular.module('CollateralCtrl',[]).controller('CollateralController',function($scope,$window,Collateral,$http,$q,$rootScope,$routeParams,$location){
    console.log('COllateral initiated::');
    $scope.collateralList = [];
    $rootScope.accountId = $routeParams.accountId;

    $scope.getAccountMDL = {
        id : ''
    }

    $scope.getCollateral = function(){
        $scope.getAccountMDL.id = $rootScope.accountId;
        debugger;
        Collateral.getCollateral(JSON.stringify($scope.getAccountMDL))
        .then(function(response){
            console.log(response.data);
            $scope.collateralList = response.data
        })
    }

    $scope.reDirectCreateCollateral = function(){
        debugger;
        $location.path("view/createCollateral/"+$rootScope.accountId);
    }

    $scope.getCollateral();
})
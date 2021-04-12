angular.module('NewapplicationCtrl',[]).controller('NewapplicationController',function($scope,$window,$http,$q,$rootScope,Application,$routeParams){
    debugger;
    console.log('Newappliocation controller initiated');
    $scope.loanTypes = false;
    $scope.showProductList = false;
    $rootScope.retailProduct = [];
    $rootScope.accountId = $routeParams.accountId;
    $scope.enableLoanType = function(){
        $scope.loanTypes = true;
    }

    $scope.getRetailProducts = function(){
        debugger;
        Application.getRetailProducts()
        .then(function(response){
            console.log('response::'+response.data);
            $rootScope.retailProduct = response.data;
            console.log('Retail products'+$scope.retailProduct);
            $scope.showProductList = true;
            
        },function(err){
            console.log(err)
        })
    }

})
angular.module('ApplicationCtrl',[]).controller('ApplicationController',function($scope,$window,Application,$http,$q,$rootScope,$routeParams,$location){
    debugger;
    console.log('Application initiated');
    console.log('$rootScope.accId::'+$rootScope.accountId)
    $scope.applicationList = [];
    $rootScope.accountId = $routeParams.accountId;
    $scope.getApplicationsMDL = {
        id : ''
    }
    $scope.getApplicationsMDL.id = $rootScope.accountId;
    $scope.getAllapplication = function(){
        debugger;
        Application.getCustomerApplication(JSON.stringify($scope.getApplicationsMDL))
        .then(function(response){
            console.log('response::'+response.data);
            console.log('account score::'+response.data[0]);
            $scope.applicationList = response.data;
            console.log($scope.applicationList[0].Loan_Amount__c);
        },function(err){
            system.debug('Error::'+err);
        })
    }

    $scope.reDirectCreateApp = function(){
        debugger;
        $location.path("/view/newApplication/"+$rootScope.accountId);
    }

    $scope.reDirecttoDocumentSection = function(param){
        debugger;
        console.log('Param::'+param);
        $location.path("/view/Document/"+$rootScope.accountId+"/application/"+$scope.applicationList[param].Id);
    }

    $scope.getAllapplication();
});
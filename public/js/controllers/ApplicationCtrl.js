angular.module('ApplicationCtrl',[]).controller('ApplicationController',function($scope,$window,Application,$http,$q,$rootScope,$routeParams,$location){
    debugger;
    console.log('Application initiated');
    console.log('$rootScope.accId::'+$rootScope.accountId)
    $scope.applicationList = [];
    $scope.allContacts = [];
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

    $scope.getPartiesFromAccount = function(){
        debugger;
        Application.getPartiesFromAccount(JSON.stringify($scope.getApplicationsMDL))
        .then(function(response){
            console.log('$scope.allContacts ::'+$scope.allContacts);
            $scope.allContacts = response.data;
        },function(err){
            console.log('err::'+err);
        })
    }

    $scope.createPartiesUnderApplication = function(){
        debugger;
    if($scope.partyList.length > 0)
        for(var key in $scope.partyList){
            if($scope.partyList[key].hasOwnProperty('$$hashKey'))
                delete $scope.partyList[key]['$$hashKey'];
            if($scope.partyList[key].Contact__c != '' && $scope.partyList[key].Util_Application__c == '')
            $scope.partyList[key].Util_Application__c = $scope.applicationId;
        }
        Application.createPartiesUnderApplication(JSON.stringify($scope.partyList))
        .then(function(response){
            console.log('response::'+response);
            alert('Contact has been created under Application');
        },function(err){
            console.log('err::'+err)
        })
    }
    $scope.partyList = [{Contact__c:'',Util_Application__c:$scope.applicationId,Party_Type__c:''}];
    $scope.addParty = function(){
        debugger;
        $scope.partyList.push({Contact__c:'',Util_Application__c:$scope.applicationId,Party_Type__c:''});
        console.log('data::'+$scope.partyList);
    }

    $scope.deleteParty = function(index){
        $scope.partyList.splice(index,1);
    }

    $scope.getAllapplication();
    $scope.getPartiesFromAccount();
});
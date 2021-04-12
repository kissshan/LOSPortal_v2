angular.module('RegisterCtrl',[]).controller('RegisterController',function($scope,$q,$http,$window,$rootScope,Register){
    console.log('Register controller initiated::');

    $scope.registerData = {
		Name : '',
        Customer_Email__c:'',
        Phone:''
    };

    $scope.register = function(){
        debugger;
        console.log('register data::'+$scope.registerData);
        Register.createAccount(JSON.stringify($scope.registerData))
        .then(function(response){
            $rootScope.accId = response.data[0].id;
                console.log($rootScope.accId);
                $window.location.href = '/index.html';
        },function(err){

        })
    }
})
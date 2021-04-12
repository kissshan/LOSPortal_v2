angular.module('AccountCtrl',[]).controller('AccountController',function($scope,Account,$http,$q,$rootScope,$routeParams){
    console.log('AccountController initiated');
    debugger;
    $rootScope.accountDetails = [];
    $scope.saveDetail = false;
    console.log('visible varible::'+$rootScope.loginInScs);
    $rootScope.accountId = $routeParams.accountId;
    $scope.getAccountMDL = {
        id : ''
    }

    $scope.accountDetailsMDL = {
        Pan_Number__c : '',
		Name : '',
		Date_of_birth__c :'',
        Gender__c :'',
        Phone:'',
        Customer_Email__c:'',
        Marital_Status__c:'',
        BillingStreet : '',
        BillingCity : '',
        BillingState : '',
        BillingPostalCode : '',
        BillingCountry : ''
    }

    $scope.getAccountMDL.id = $rootScope.accountId;
    $scope.getCustomerDetails = function(){
        debugger;

        Account.getAccountDetails(JSON.stringify($scope.getAccountMDL))
        .then(function(response){
            $rootScope.accountDetails = response.data[0];
        },function(err){
            console.log('err::'+err);
        })
    }

    $scope.onChange = function(){
        console.log('Inside onchange::');
        $scope.saveDetail = true;
        console.log('$scope.saveDetail:'+$scope.saveDetail);
    }

    $scope.getCustomerDetails();

    $scope.updateAccountDetails = function(){
        
        debugger;
        $rootScope.accountDetails.Id = $rootScope.accountId;
        console.log('updated Value::'+JSON.stringify($rootScope.accountDetails));
        $scope.saveDetail = false;
        Account.updateAccount(JSON.stringify($rootScope.accountDetails))
        .then(function(response){
            console.log(response);
            Swal.fire({
                title: 'Account Details',
                text:'Account has been updated.',
                confirmButtonText: 'OK',
              }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    //$window.location.href = '/view/signin';
                }
              })
        },function(err){
            console.log(err);
        })
    }
})
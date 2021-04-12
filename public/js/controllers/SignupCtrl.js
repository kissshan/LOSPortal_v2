angular.module('SignupCtrl',[]).controller('signupController',function($scope,$rootScope,$q,$http,Register,$window, $location){
    debugger;
    console.log('signup controller initiated::');
    $rootScope.signup = true;
    $rootScope.accountId = '';
    $scope.reenterPassword = '';
    $scope.signupDetailsMDL = {
        Name : '',
        Phone : '',
        Customer_Email__c : '',
        Password__c : ''
    }
    $scope.getAccountMDL = {
        id : ''
    }
    $scope.signupDetails = function(){
        debugger;
        console.log('$scope.signupDetails::'+$scope.signupDetailsMDL);
        Register.createAccount(JSON.stringify($scope.signupDetailsMDL))
		.then(function(response){
			console.log(response.data);
            $rootScope.accountId = response.data[0].id;
            $scope.getAccountDetails();
		})
    }

    $scope.getAccountDetails = function(){
        debugger;
        $scope.getAccountMDL.id = $rootScope.accountId;
        Register.getAccountDetails(JSON.stringify($scope.getAccountMDL))
		.then(function(response){
            debugger;
			console.log(response.data);
            Swal.fire({
                title: 'Customer ID',
                text:'Please remember your customer id. Customer id is required for login into portal.Your customer id :' + response.data[0].Customer_Identification__c,
                confirmButtonText: 'OK',
              }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    $rootScope.signup = false;
                    $location.path("view/signin/");
                }
              })
		})
    }
})
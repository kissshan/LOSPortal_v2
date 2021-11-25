angular.module('CreatePartyCtrl',[]).controller('CreatePartyController',function($scope,$window,$q,$http,Parties,$rootScope,$routeParams,$location){
    console.log('Create Partyb controller initiated::');
    $scope.spinnerTag = false;
    $rootScope.accountId = $routeParams.accountId;
    $scope.partyDataMDL = {
		AccountId : '',
		firstname : '',
		lastname  :'',
        MobilePhone :'',
        Email:'',
        Secondary_Email__c:'',
        Party_Type__c:''
    };

    $scope.createParty = function(){
		debugger;
        $scope.partyDataMDL.AccountId = $rootScope.accountId;
		Parties.createParty(JSON.stringify($scope.partyDataMDL))
		.then(function(response){
            console.log(JSON.stringify(response));
			$scope.applications = response.data;
			console.log(response.data);
            $scope.spinnerTag = false;
            Swal.fire({
                title: 'Contact Added',
                text:'New Contact has been created under your account.',
                confirmButtonText: 'OK',
              }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                debugger;
                if (result.isConfirmed) {
                    //$rootScope.signup = false;
                    //$rootScope.loginInScs = true;
                    $location.path("view/parties/"+$rootScope.accountId);
                    $scope.$apply();
                }
              })
            //alert('Party has been created.');
            //$location.path("view/parties/"+$rootScope.accountId);
            
		},function(error){
			$scope.status = 'Unable to load data';
		})
    }

    $scope.reDirectToMain = function(){
        debugger;
        $window.location.href = '/view/parties';
        console.log($window.location.href);
    }
})
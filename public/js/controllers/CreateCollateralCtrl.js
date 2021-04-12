angular.module('CreateCollateralCtrl',[]).controller('CreateCollateralController',function($scope,$q,$http,Collateral,$window,$rootScope,$routeParams,$location){
    console.log('Collateral Initiated');
    $scope.spinnerTag = false;
    $rootScope.accountId = $routeParams.accountId;
    $scope.collateralDataMDL = {
		Account__c : '',
		Collateral_Type__c : '',
		Age_Of_Collateral__c :'',
        Market_Valuation__c :'',
        Name : '',
        Status__c : '',
        Coverage_Used__c : '',
        Coverage_Remaining__c : ''
    };
    
    $scope.createCollateral = function(){
		debugger;
        $scope.collateralDataMDL.Account__c = $rootScope.accountId;
		Collateral.createCollateral(JSON.stringify($scope.collateralDataMDL))
		.then(function(response){
            console.log(JSON.stringify(response));
			$scope.applications = response.data;
			console.log(response.data);
            console.log($scope.Name);
            $scope.spinnerTag = false;
            alert('Collateral has been created.');
            $location.path("view/collateral/"+$rootScope.accountId);
            //swal({title:'Application Created',text:'Application has been created. Please press ohk to go back Application Page.'},function(isConfirm) {$window.location.href = '/view/application';});
            
		},function(error){
			$scope.status = 'Unable to load data';
		})
    }
});
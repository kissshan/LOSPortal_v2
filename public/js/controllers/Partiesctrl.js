angular.module('Partiesctrl',[]).controller('PartiesController',function($scope,Parties,$http,$q,$window,$rootScope,$routeParams,$location){
    debugger;
    $scope.partiesList = [];
    console.log('Parties controller intiated');
    $rootScope.accountId = $routeParams.accountId;
    $scope.getAccountMDL = {
      id : ''
    }
    $scope.getParties = function(){
		debugger;
    $scope.getAccountMDL.id = $rootScope.accountId
		Parties.getParties(JSON.stringify($scope.getAccountMDL))
		.then(function(response){
            $scope.partiesList = response.data;
		},function(error){
			$scope.status = 'Unable to load data';
		});
    }

    $scope.reDirectCreateParty = function(){
      debugger;
      $location.path("view/createPartyContact/"+$rootScope.accountId);
    }
    
    $scope.getParties()
});
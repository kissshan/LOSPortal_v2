
angular.module('NerdCtrl', []).controller('NerdController', function($scope,Nerd, $http, $q,$rootScope,Signin,$location) {
	debugger;
	$scope.name ='Ajeet';
	console.log('Nerd initiated');
	console.log('$rootScope.accId::'+$rootScope.accId);
	console.log('$rootScope.loginInScs = true;::'+$rootScope.loginInScs);
	$rootScope.loginInScs = false;
	$rootScope.signup = false;
	$scope.url = $location.absUrl();
	
	if($scope.url.includes('view/signin'))
	$rootScope.loginInScs = false;
	else 
	$rootScope.loginInScs = true;
	if($scope.url.includes('view')){
		console.log('yes')
	}else{
		$rootScope.loginInScs = false;
	}
	console.log($scope.url);
	
	$scope.response = '';
	$scope.indexInitiate = false;
	if($rootScope.loginInScs)
		$scope.indexInitiate = true;
	$scope.appData = {
		Account__c : '0012v00002vLEvs',
		Application_Stage__c : '',
		Loan_Amount__c :'',
		Product__c :'a0U2v00001pbskw'
	};
	$scope.accountData = {
		Name:'',
		AccountNumber : '',
		Account_Score__c : '',
		Age_of_Company__c : ''
	};
	
	$scope.getApplication = function(){
		debugger;
		console.log('mydata::'+$scope.appData);
		Nerd.getApplication(JSON.stringify($scope.appData))
		.then(function(response){
			$scope.applications = response.data;
			console.log(response.data);
			console.log($scope.Name);
		},function(error){
			$scope.status = 'Unable to load data';
		});
	}

	$scope.Signin = function(){
        debugger;
        console.log('$scope.signinData::'+$scope.signinDataMDL);
        Signin.verifySignin(JSON.stringify($scope.signinDataMDL))
        .then(function(response){
            console.log('response::'+response)
            if(response.data.length > 0){
                $rootScope.unqAccId = response.data[0].Id;
                console.log($rootScope.unqAccId);
                $rootScope.loginInScs = true;
                $location.path("view/account/"+$rootScope.unqAccId);
                
            }else{
                alert('Please enter valid custid or number.')
            }
            
        },function(err){
            console.log('err::'+err)
        })
    }
	
});
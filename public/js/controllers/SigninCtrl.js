angular.module('SigninCtrl',[]).controller('SigninController',function($scope,$q,$window,$http,Signin,$rootScope,$location){
    debugger;
    console.log('Signin controller trigger');
    
    $rootScope.unqAccId = '';
    $scope.signinDataMDL = {
		Customer_Identification__c : '',
		Password__c:''
    };
    
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
})
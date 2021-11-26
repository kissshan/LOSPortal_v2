angular.module('CreateApplicationCtrl',[]).controller('CreateApplicationController',function($scope,Application,$window,$http,$q){
    console.log('Create Application Initiated::')
    console.log('Accc id::'+$rootScope.accId);
    $scope.spinnerTag = false;
    $scope.appTag = true;
    $scope.partyTag = false;
    $scope.collTag = false;
    $scope.contactId = '';
    $scope.employees = [];
    $scope.allContacts = [];
    $scope.allCollateral = [];
    $scope.allProduct = [];
    $scope.allLegalENtity = [];
    $scope.applicationId = ''
    $scope.appData = {
		Account__c : '0012v00003BVOm8',
		Application_Stage__c : 'Application Created',
		Loan_Amount__c :'',
        Loan_Purpose__c :'',
        Term__c:'',
        Type_of_Application__c:'',
        Product__c:'',
        Legal_Entity__c:'',
        active__c:true
    };


   // $scope.allContacts = [{Id:'1',Name:'Ajeet'},{Id:'1',Name:'Kishan'},{Id:'1',Name:'Prithvi'}];
    alert('AppId'+$scope.applicationId)
    $scope.partyList = [{Contact__c:'',Util_Application__c:$scope.applicationId,Party_Type__c:''}];
    $scope.collateralList = [{Collateral__c:'',ApplicationCollaterals__c:'',Collateral_Type__c:''}]
    $scope.addParty = function(){
        debugger;
        $scope.partyList.push({Contact__c:'',Util_Application__c:$scope.applicationId,Party_Type__c:''});
        console.log('data::'+$scope.partyList);
    }
    
    $scope.deleteParty = function(index){
        $scope.partyList.splice(index,1);
    }
    $scope.addCollateral = function(){
        debugger;
        $scope.collateralList.push({Collateral__c:'',ApplicationCollaterals__c:'',Collateral_Type__c:''});
        console.log('data::'+$scope.collateralList);
    }
    
    $scope.deleteCollateral = function(index){
        $scope.collateralList.splice(index,1);
    }
    
    $scope.getApplication = function(){
		debugger;
        console.log('mydata::'+$scope.appData);
        $scope.spinnerTag = true;
		Application.createApplication(JSON.stringify($scope.appData))
		.then(function(response){
            $scope.applications = response.data;
            $scope.applicationId = response.data[0].id
			console.log(response.data);
            console.log($scope.Name);
            $scope.spinnerTag = false;
            alert('Application has been created.');
            //$window.location.href = '/view/application';
            //swal({title:'Application Created',text:'Application has been created. Please press ohk to go back Application Page.'},function(isConfirm) {$window.location.href = '/view/application';});
            
		},function(error){
			$scope.status = 'Unable to load data';
		})
    }

    $scope.getPartiesFromAccount = function(){
        debugger;
        Application.getPartiesFromAccount()
        .then(function(response){
            console.log('$scope.allContacts ::'+$scope.allContacts);
            $scope.allContacts = response.data;
        },function(err){
            console.log('err::'+err);
        })
    }

    $scope.getCollateralFromAccount = function(){
        debugger;
        Application.getCollateralFromAccount()
        .then(function(response){
            console.log('$scope.allContacts ::'+$scope.allCollateral);
            $scope.allCollateral = response.data;
        },function(err){
            console.log('err::'+err);
        })
    }
    
    $scope.getAllProduct = function(){
        debugger;
        Application.getAllProduct()
        .then(function(response){
            
            $scope.allProduct = response.data;
            console.log('$scope.allProduct ::'+$scope.allProduct);
        },function(err){
            console.log('err::'+err);
        })
    }

    $scope.getAllLegalEntity = function(){
        debugger;
        Application.getAllLegalEntity()
        .then(function(response){
            
            $scope.allLegalENtity = response.data;
            console.log('$scope.allLegalENtity ::'+$scope.allLegalENtity);
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

    $scope.createCollateralUnderApplication = function(){
        debugger;
        if($scope.collateralList.length > 0){
            for(var key in $scope.collateralList){
                if($scope.collateralList[key].hasOwnProperty('$$hashKey'))
                delete $scope.collateralList[key]['$$hashKey'];
                if($scope.collateralList[key].Collateral__c != '' && $scope.collateralList[key].ApplicationCollaterals__c == '')
            $scope.collateralList[key].ApplicationCollaterals__c = $scope.applicationId;
            }
            Application.createApplicationCollateral(JSON.stringify($scope.collateralList))
        .then(function(response){
            console.log('response::'+response);
            alert('Collateral has been created under Application');
        },function(err){
            console.log('err::'+err)
        })
        }
        
    }
    
    $scope.testMethod = function(){
        debugger;
        $scope.appTag = true;
        $scope.partyTag = false;
        $scope.collTag = false;
        console.log('inside method call');
    }
    $scope.testMethod1 = function(){
        debugger;
        $scope.partyTag = true;
        $scope.appTag = false;
        $scope.collTag = false;
        console.log('inside method call');
    }
    $scope.testMethod2=function(){
        $scope.partyTag = false;
        $scope.appTag = false;
        $scope.collTag = true;
    }
    
    $scope.getPartiesFromAccount();
    $scope.getCollateralFromAccount();
    $scope.getAllProduct();
    $scope.getAllLegalEntity();
});




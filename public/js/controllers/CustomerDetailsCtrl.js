angular.module('CustomerDetailsCtrl',[]).controller('customerDetailsController',function($scope,$rootScope,$q,$http,Application,$routeParams){
    debugger;
    $rootScope.accountId = $routeParams.accountId;
    $rootScope.prodId = $routeParams.prodId;
    $rootScope.accId = '';
    $rootScope.appId = '';
    $scope.enableBankIncomeDetail = true;
    $scope.enableCustomerDetail = false;
    $scope.enableLoanDetail = false;
    $scope.enableOfferDetail = false;
    $scope.offersList = [];

    $scope.applicationId = {
        id : ''
    }
    $scope.getParties = {
        id : ''
    }
    $scope.partyList = [{Contact__c:'',Util_Application__c:'',Party_Type__c:'',Account__c:''}];
    $scope.getParties.id = $rootScope.accountId;
    $scope.offersMDL = {
        appId : '',
        isRetailApp : true
    }

    $scope.bankDetailsMDL = {
		Account__c : '',
		Application__c : '',
		Bank_Account_Number__c :'',
        Bank_Name__c :'',
        First_Name__c:'',
        IFSC_Code__c:'',
        Last_Name__c:'',
        Middle_Name__c:'',
        Proximity_Toward_Bank__c:'',
        Applicant_Locative_Situation__c:'',
        Banking_references__c:'',
        Loan_From_Other_Bank__c:''
    };

    $scope.incomeDetailsMDL = {
        Account__c : '',
        Application__c : '',
		Additional_Income__c : '',
		Application__c :'',
        Gross_Income__c:'',
        Income_Type__c:'',
        Monthly_Additional_Income__c:'',
        Monthly_Income__c:'',
        Source_of_Additional_Income__c : '',
        Taxable_Amount__c : ''
    }

    $scope.employmentDetailsMDL = {
        Account__c : '',
        Application__c : '',
		Name : '',
		Employment_Type__c :'',
        Employment_Status__c :'',
        Gross_Monthly_Income__c:'',
        Net_Monthly_Income__c:'',
        Net_Annual_Income__c:'',
        Designation__c:'',
        Mode_Of_Salary__c:'',
        Employment_Current_Tenure__c:'',
        Employment_Past_Tenure__c:''
    }

    $scope.applicationDetailsMDL = {
        Account__c : '',
		Product__c : '',
		Loan_Purpose__c :'',
        Applicant_Employment_Type__c:'',
        Primary_Applicant_Age__c:'',
        Primary_Applicant_Residence_Status__c:'',
        Security_Coverage__c : '80',
        Loan_Amount__c : '10000000'
        }

    $scope.facilityDetailsMDL = {
        Requested_Amount__c : '',
        Holiday_Period__c : '',
        Requested_Interest__c : '',
        Requested_Tenuer__c : '',
        Application__c : '',
        Loan_Product__c : ''
    }

    $scope.createBankDetail = function(){
		debugger;
        console.log('mydata::'+$scope.bankDetailsMDL);
        $scope.bankDetailsMDL.Account__c = $rootScope.accountId;
        $scope.bankDetailsMDL.Application__c = $scope.appId;
		Application.createBankDetailRecord(JSON.stringify($scope.bankDetailsMDL))
		.then(function(response){
			console.log(response.data);
		},function(error){
			$scope.status = 'Unable to load data';
		})
    }

    $scope.createIncomeDetail = function(){
		debugger;
        console.log('mydata::'+$scope.incomeDetailsMDL);
        $scope.incomeDetailsMDL.Account__c = $rootScope.accountId;
        $scope.incomeDetailsMDL.Application__c = $scope.appId;
		Application.createIncomeDetailRecord(JSON.stringify($scope.incomeDetailsMDL))
		.then(function(response){
			console.log(response.data);
		},function(error){
			$scope.status = 'Unable to load data';
		})
    }

    $scope.createEmploymentDetail = function(){
		debugger;
        console.log('mydata::'+$scope.employmentDetailsMDL);
        $scope.employmentDetailsMDL.Account__c = $rootScope.accountId;
        $scope.employmentDetailsMDL.Application__c = $scope.appId;
		Application.createEmploymentDetailRecord(JSON.stringify($scope.employmentDetailsMDL))
		.then(function(response){
			console.log(response.data);
		},function(error){
			$scope.status = 'Unable to load data';
		})
    }

    $scope.createFacilityDetails = function(){
        debugger;
        console.log('$scope.facilityDetailsMDL::'+$scope.facilityDetailsMDL);
        $scope.facilityDetailsMDL.Application__c = $scope.appId;
        $scope.facilityDetailsMDL.Loan_Product__c =  $rootScope.prodId;
		Application.createFacilityDetailRecord(JSON.stringify($scope.facilityDetailsMDL))
		.then(function(response){
			console.log(response.data);
		},function(error){
			$scope.status = 'Unable to load data';
		})
    }
    

    $scope.getOffers = function(){
        debugger;
        $scope.offersMDL.appId = $scope.appId;
        console.log('$scope.offersMDL::'+$scope.offersMDL);
        Application.getOffers(JSON.stringify($scope.offersMDL))
		.then(function(response){
			console.log(response.data);
            $scope.offersList = response.data;
            $scope.enableOfferDetail = true;
            $scope.enableLoanDetail = false;
		},function(error){
			$scope.status = 'Unable to load data';
		})
    }

    $scope.notifyApplicationNumber = function(){
        Application.getNewApplicationDetails(JSON.stringify($scope.applicationId))
		.then(function(response){
			console.log(response.data);
            Swal.fire({
                title: 'Application Successfully created',
                text:'Your application has been created successfully. Your application number is : '+ response.data[0].Name,
                confirmButtonText: 'OK',
              }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    //$window.location.href = '/view/signin';
                }
              })
		},function(error){
			$scope.status = 'Unable to load data';
		})
    }

    $scope.applyforLoan = function(){
        debugger;
        $scope.applicationDetailsMDL.Account__c = $rootScope.accountId;
        $scope.applicationDetailsMDL.Product__c = $rootScope.prodId;
		Application.createApplication(JSON.stringify($scope.applicationDetailsMDL))
		.then(function(response){
            if(response.data[0].success){
                console.log(response.data);
                $scope.appId = response.data[0].id;
                $scope.applicationId.id = $scope.appId;
                $scope.createFacilityDetails();
                $scope.createPartiesUnderApplication();
                $scope.createBankDetail();
                $scope.createIncomeDetail();
                $scope.createEmploymentDetail();
                $scope.getOffers();
                $scope.notifyApplicationNumber();
                document.getElementById('confirm').classList.add('active');
            document.getElementById("progressbarr").style="width: 100%";
            }
			
		},function(error){
			$scope.status = 'Unable to load data';
		})
    }

    $scope.enableBankIncomeDetail = true;
    $scope.enableCustomerDetail = false;
    $scope.enableLoanDetail = false;
    
    $scope.visibleCustomerDetail = function(){
        debugger;
        $scope.enableCustomerDetail = true;
        $scope.enableBankIncomeDetail = false;
        document.getElementById('personal').classList.add('active');
        document.getElementById("progressbarr").style="width: 50%";    
    }

    $scope.visibleLoanDetail = function(){
        debugger;
        $scope.enableLoanDetail = true;
        $scope.enableCustomerDetail = false;
        document.getElementById('payment').classList.add('active');
        document.getElementById("progressbarr").style="width: 75%";
    }
    $scope.backLoanDetail = function(){
        debugger;
        $scope.enableLoanDetail = false;
        $scope.enableCustomerDetail = true;
        document.getElementById('payment').classList.remove('active');
        document.getElementById("progressbarr").style="width: 50%";
    }

    $scope.backCustomerDetail = function(){
        debugger;
        $scope.enableCustomerDetail = false;
        $scope.enableBankIncomeDetail = true;
        document.getElementById('personal').classList.remove('active');
        document.getElementById("progressbarr").style="width: 25%"; 
    }

    $scope.getPartiesFromAccount = function(){
        debugger;
        Application.getPartiesFromAccount(JSON.stringify($scope.getParties))
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
            if($scope.partyList[key].Contact__c != '' && $scope.partyList[key].Util_Application__c == ''){
                $scope.partyList[key].Util_Application__c = $scope.appId;
                $scope.partyList[key].Account__c =  $rootScope.accountId;
            }
            
        }
        Application.createPartiesUnderApplication(JSON.stringify($scope.partyList))
        .then(function(response){
            console.log('response::'+response);
        },function(err){
            console.log('err::'+err)
        })
    }
    
    $scope.addParty = function(){
        debugger;
        $scope.partyList.push({Contact__c:'',Util_Application__c:$scope.applicationId,Party_Type__c:''});
        console.log('data::'+$scope.partyList);
    }

    $scope.deleteParty = function(index){
        $scope.partyList.splice(index,1);
    }

    $scope.getPartiesFromAccount();
})
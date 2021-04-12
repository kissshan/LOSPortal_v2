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
        Middle_Name__c:''
    };

    $scope.incomeDetailsMDL = {
        Account__c : '',
        Application__c : '',
		Additional_Income__c : '',
		Application__c :'',
        Expiration_Date__c :'',
        Gross_Income__c:'',
        Income_Type__c:'',
        Issued_By__c:'',
        Issued_Date__c:'',
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
        Mode_Of_Salary__c:''
    }

    $scope.applicationDetailsMDL = {
        Account__c : '',
		Product__c : '',
		Loan_Purpose__c :'',
        Requested_Amount__c	 :'',
        Requested_Term__c:'',
        Requested_Rate__c:'',
        Holiday_Period__c:'',
        Applicant_Employment_Type__c:'',
        Primary_Applicant_Age__c:'',
        Primary_Applicant_Residence_Status__c:'',
        Security_Coverage__c : '80',
        Loan_Amount__c : ''
    }

    $scope.createBankDetail = function(){
		debugger;
        console.log('mydata::'+$scope.bankDetailsMDL);
        $scope.bankDetailsMDL.Account__c = $rootScope.accountId;
        $scope.bankDetailsMDL.Application__c = $scope.appId;
		Application.createBankDetailRecord(JSON.stringify($scope.bankDetailsMDL))
		.then(function(response){
			console.log(response.data);
            console.log($scope.Name);
            alert('Application has been created.');
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
            alert('Application has been created.');
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
            alert('Application has been created.');
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

    $scope.applyforLoan = function(){
        debugger;
        $scope.applicationDetailsMDL.Loan_Amount__c =  $scope.applicationDetailsMDL.Requested_Amount__c;
        $scope.applicationDetailsMDL.Account__c = $rootScope.accountId;
        $scope.applicationDetailsMDL.Product__c = $rootScope.prodId;
		Application.createApplication(JSON.stringify($scope.applicationDetailsMDL))
		.then(function(response){
            if(response.data[0].success){
                console.log(response.data);
                $scope.appId = response.data[0].id;
                $scope.createBankDetail();
                $scope.createIncomeDetail();
                $scope.createEmploymentDetail();
                $scope.getOffers();
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
})
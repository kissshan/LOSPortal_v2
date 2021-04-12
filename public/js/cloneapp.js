
    angular.module('GeekService', []).factory('Geek', ['$http', function($http) {

        var urlBase = '/api/';
        var dataFactory = {};

        dataFactory.getCustomers = function() {
            return $http.get(urlBase + 'list_user');
        };


        dataFactory.insertCustomer = function(cust) {
            return $http.post(urlBase, cust);
        };

        dataFactory.updateCustomer = function(cust) {
            return $http.put(urlBase + '/' + cust.ID, cust)
        };

        dataFactory.deleteCustomer = function(id) {
            return $http.delete(urlBase + '/' + id);
        };

        dataFactory.getOrders = function(id) {
            return $http.get(urlBase + '/' + id + '/orders');
        };

        return dataFactory;

    }]);

    angular.module('NerdService', []).factory('Nerd', ['$http', function($http) {

        var urlBase = '/api/';
        var dataFactory = {};
        dataFactory.getApplication = function() {
            return $http.get(urlBase + 'getApplicationDetails');
        };
        dataFactory.createApplication = function(data) {
            debugger;
            return $http.post(urlBase + 'createApplication',data);
        };
        /* dataFactory.createAccount = function(data) {
            debugger;
            return $http.post(urlBase + 'createAccount',data);
        };*/
        return dataFactory;

    }]);

        angular.module('NerdCtrl', []).controller('NerdController', function($scope,Nerd, $http, $q) {
        debugger;
        console.log('Nerd initiated');
        /*$scope.appData = {
            Account__c : '0012v00002vLEvs',
            Application_Stage__c : '',
            Loan_Amount__c :'',
            Product__c :'a0U2v00001pbskw'
        };
        $scope.accountData = {
            Name = '',
            AccountNumber = '',
            Account_Score__c = '',
            Age_of_Company__c = ''
        };*/
        $scope.appData = {
                Account__c : '0012v00002vLEvs',
                Application_Stage__c : '',
                Loan_Amount__c :'',
                Product__c :'a0U2v00001pbskw'
            };
        $scope.getApplication = function(){
            debugger;
            //console.log('mydata::'+$scope.appData);
            
            Nerd.createApplication(JSON.stringify($scope.appData))
            .then(function(response){
                $scope.applications = response.data;
                console.log(response.data);
                console.log($scope.Name);
            },function(error){
                $scope.status = 'Unable to load data';
            });
            /*Nerd.createApplication(JSON.stringify($scope.appData))
            .then(function(response){
                $scope.applications = response.data;
                console.log(response.data);
                console.log($scope.Name);
            },function(error){
                $scope.status = 'Unable to load data';
            })*/
        }
        /*$scope.tagline = 'Nothing beats a pocket protector!';
        $scope.applications;
        $scope.isvisible = false;
        $scope.appData = {
            Account__c : '0012v00002vLEvs',
            Application_Stage__c : '',
            Loan_Amount__c :'',
            Product__c :'a0U2v00001pbskw'
        };
        $scope.accountData = {
            Name = '',
            AccountNumber = '',
            Account_Score__c = '',
            Age_of_Company__c = ''
        };

        $scope.getApplication = function(){
            debugger;
            console.log('mydata::'+$scope.appData);
            Nerd.createApplication(JSON.stringify($scope.appData))
            .then(function(response){
                $scope.applications = response.data;
                console.log(response.data);
                console.log($scope.Name);
            },function(error){
                $scope.status = 'Unable to load data';
            })
        }

        /*$scope.createnewAccount = function(){
            debugger;
            console.log('mydata::'+$scope.accountData);
            Nerd.createAccount(JSON.stringify($scope.accountData))
            .then(function(response){
                $scope.applications = response.data;
                console.log(response.data);
                $scope.isvisible = true;
            },function(error){
                $scope.status = 'Unable to load data';
            })
        }*/
        //$scope.getApplication();
    });

    angular.module('GeekCtrl', []).controller('GeekController', function($scope, Geek, $http, $q) {
        console.log('geek intiated');
        $scope.tagline = 'The square root of life is pi!';
        $scope.customers;


        $scope.getCustomers = function() {
            debugger;
            Geek.getCustomers()
                .then(function(response) {
                    $scope.customers = response.data;
                    console.log(response.data);
                    debugger;
                }, function(error) {
                    $scope.status = 'Unable to load customer data: ' + error.message;
                });
        }
        $scope.getCustomers();


    });

    angular.module('MainCtrl', []).controller('MainController', function($scope) {

     $scope.tagline = 'To the moon and back!';	

    });

    angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

            $routeProvider

                // home page
                .when('/view/', {
                    templateUrl: '/views/home.html',
                    controller: 'MainController'
                })

                .when('/view/nerds', {
                    templateUrl: '/views/nerd.html',
                    controller: 'NerdController'
                })

                .when('/view/geeks', {
                    templateUrl: '/views/geek.html',
                    controller: 'GeekController'	
                });

            $locationProvider.html5Mode(true);

    }]);
    angular.module('mysampleApp', ['ngRoute', 'appRoutes', 'MainCtrl', 'NerdCtrl', 'NerdService', 'GeekCtrl', 'GeekService']);

angular.module('ApplicationService',[]).factory('Application',['$http',function($http){
    var urlBase = '/api/';
    var dataFactory = {};
    dataFactory.getCustomerApplication = function(data) {
        return $http.post(urlBase + 'getApplicationDetails',data);
    };
    dataFactory.createApplication = function(data) {
        debugger;
        return $http.post(urlBase + 'createApplication',data);
    };
    dataFactory.getPartiesFromAccount = function() {
        debugger;
        return $http.get(urlBase + 'getPartiesFromAccount');
    };
    dataFactory.createPartiesUnderApplication = function(data){
        return $http.post(urlBase + 'createParties',data);
    }
    dataFactory.createApplicationCollateral = function(data){
        return $http.post(urlBase + 'createAppcollateral',data);
    }
    dataFactory.getCollateralFromAccount = function() {
        debugger;
        return $http.get(urlBase + 'getAllCollateralFromAccount');
    }
    dataFactory.getAllProduct = function() {
        debugger;
        return $http.get(urlBase + 'getAllProducts');
    }
    dataFactory.getAllLegalEntity = function() {
        debugger;
        return $http.get(urlBase + 'getAllLegalEntity');
    }
    dataFactory.getRetailProducts = function() {
        debugger;
        return $http.get(urlBase + 'getRetailProducts');
    }
    dataFactory.createBankDetailRecord = function(data){
        return $http.post(urlBase + 'createBankDetailRecord',data);
    }
    dataFactory.createIncomeDetailRecord = function(data){
        return $http.post(urlBase + 'createIncomeDetailRecord',data);
    }
    dataFactory.createCustomerDetailRecord = function(data){
        return $http.post(urlBase + 'createAccount',data);
    }
    dataFactory.createEmploymentDetailRecord = function(data){
        return $http.post(urlBase + 'createEmploymentDetailRecord',data);
    }
    dataFactory.getOffers = function(data){
        return $http.post(urlBase + 'getOffers',data);
    }
    return dataFactory;
}])
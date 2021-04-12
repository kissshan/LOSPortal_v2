angular.module('AccountService',[]).factory('Account',['$http',function($http){
    var urlBase = '/api/';
    var dataFactory = {};
    dataFactory.getCustomers = function() {
        return $http.get(urlBase + 'getAllAccounts');
    };
    dataFactory.updateAccount = function(data) {
        return $http.post(urlBase + 'updateAccount',data);
    };
    dataFactory.getAccountDetails = function(data) {
        return $http.post(urlBase + 'getCustomerDetails',data);
    };

    return dataFactory;
}
])
angular.module('RegisterService',[]).factory('Register',['$http',function($http){
    var urlBase = '/api/';
    var dataFactory = {};

    dataFactory.createAccount = function(data) {
        return $http.post(urlBase + 'createAccount',data);
    };

    dataFactory.getAccountDetails = function(data) {
        return $http.post(urlBase + 'getAccountDetails',data);
    };
    return dataFactory;
}])
angular.module('SigninService',[]).factory('Signin',['$http', function($http,$rootScope){
    var urlBase = '/api/';
    var dataFactory = {};
    this.flag = false;
    dataFactory.verifySignin = function(cust) {
        return $http.post(urlBase + 'verifySignin', cust);
    };

    return dataFactory;
}])
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
    dataFactory.uploadSingleFile = function(data) {
        debugger;
        return $http.post(urlBase + 'uploadAttachment',data);
    };
   /* dataFactory.createAccount = function(data) {
        debugger;
        return $http.post(urlBase + 'createAccount',data);
    };*/
    return dataFactory;

}]);
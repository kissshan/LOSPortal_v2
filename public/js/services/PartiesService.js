angular.module('PartiesService',[]).factory('Parties',['$http',function($http){
    var urlBase = '/api/';
    var dataFactory = {};

    dataFactory.getParties = function(data) {
        return $http.post(urlBase + 'getPartiesFromAccount',data);
    };
    dataFactory.createParty = function(data) {
        return $http.post(urlBase + 'createContact',data);
    };

    return dataFactory;
}])
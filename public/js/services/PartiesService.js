angular.module('PartiesService',[]).factory('Parties',['$http',function($http){
    var urlBase = '/api/';
    var dataFactory = {};

    dataFactory.getParties = function(data) {
        debugger;
        return $http.post(urlBase + 'getPartiesFromAccount',data);
    };
    dataFactory.createParty = function(data) {
        debugger;
        return $http.post(urlBase + 'createContact',data);
    };

    return dataFactory;
}])
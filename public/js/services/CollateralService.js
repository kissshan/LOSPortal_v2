angular.module('CollateralService',[]).factory('Collateral',['$http',function($http){
    var urlBase = '/api/';
    var dataFactory = {};

    dataFactory.getCollateral = function(data) {
        return $http.post(urlBase + 'getAllCollateralFromAccount',data);
    };
    dataFactory.createCollateral = function(data) {
        return $http.post(urlBase + 'createCollateral',data);
    };

    return dataFactory;
}])
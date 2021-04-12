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
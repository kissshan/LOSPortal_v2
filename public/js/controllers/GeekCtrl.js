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
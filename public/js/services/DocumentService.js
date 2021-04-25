angular.module('DocumentService',[]).factory('Document',['$http',function($http){
    var urlBase = '/api/';
    var dataFactory = {};
    
    dataFactory.getDocumentCategory = function(data) {
        debugger;
        return $http.post(urlBase + 'getDocumentCategory',data);
    };
    dataFactory.uploadSingleFile = function(data) {
        debugger;
        return $http.post(urlBase + 'uploadDocument',data);
    };

    return dataFactory;
}])
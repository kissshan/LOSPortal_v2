angular.module('DocumentService',[]).factory('Document',['$http',function($http){
    var urlBase = '/api/';
    var dataFactory = {};
    
    dataFactory.getDocumentCategory = function() {
        return $http.get(urlBase + 'getDocumentCategory');
    };
    dataFactory.uploadSingleFile = function(data) {
        debugger;
        return $http.post(urlBase + 'uploadAttachment',data);
    };

    return dataFactory;
}])
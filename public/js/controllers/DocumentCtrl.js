angular.module('DocumentCtrl',['naif.base64']).controller('DocumentController',function($scope,$http,$q,Document,$window,$rootScope,$routeParams,$location){
    debugger;
	console.log('Document Initiated');
	$scope.documetParentId = '';
	$scope.documentName = '';
	$rootScope.accountId = $routeParams.accountId;
	$scope.appId = $routeParams.appId;
	$scope.getDocumentCategoryMDL = {
        parentId : ''
    }
    $scope.getDocumentCategory = function(){
        debugger;
		$scope.getDocumentCategoryMDL.parentId = $scope.appId;
        Document.getDocumentCategory(JSON.stringify($scope.getDocumentCategoryMDL))
        .then(function(response){
            console.log('response::'+response.data);
            $scope.documentCategory = response.data;
        },function(err){
            console.log('Err::'+err);
        })

    }

	$scope.documentUpload = function(param){
		debugger;
		$scope.documetParentId = $scope.documentCategory[param].Id;
		$scope.documentName = $scope.documentCategory[param].Name;
	}

    $scope.getDocumentCategory();
})
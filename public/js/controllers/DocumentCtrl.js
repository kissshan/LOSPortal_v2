angular.module('DocumentCtrl',[]).controller('DocumentController',function($scope,$http,$q,Document,$window){
    console.log('Document Initiated');

	$scope.testMethod = function(param){
		debugger;
		uploadFile(param)
	}


    //$scope.documentCategory = [];
    //$scope.documentId = '123';
    //var base64 = new FileReader();
    //var reader = new FileReader();
    /*$scope.getDocumentCategory = function(){
        debugger;
        Document.getDocumentCategory()
        .then(function(response){
            console.log('response::'+response.data);
            $scope.documentCategory = response.data;
        },function(err){
            console.log('Err::'+err);
        })

    }

    $scope.filesChanged = function(elm){
		debugger;
		console.log('elm::'+elm);
		$scope.files = elm.files;
        console.log('files::'+elm.files);
        
        //reader.readAsDataURL($scope.files); 
        
		/*$scope.getBase64(elm).then(
			data => console.log(data)
		  );*/
		  //$scope.getBase641($scope.files[0]);
		  //console.log(base64.encodeToString($scope.files[0]));
	//}
    
    /*reader.onloadend = function(){
        var file = {
            fileName: $scope.files.name,
            fileDescription: $scope.files.type,
            parentId: results.Id,
            body: reader.result
        };   
        
        console.log('file::'+file);
    }*/

    /*$scope.getBase641 = function(file){
		debugger;
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => {
			$scope.response = reader.result;
            console.log(reader.result);
            $scope.response = payload.toString().replace("[BASE64]", convert_bitmap($scope.response));
		};
	}*/
    
   /* $scope.uploadFiles= function(){
        debugger;
        console.log('documentId::'+$scope.documentId)
		console.log('files::'+$scope.files);
		//var fd = new FormData();
		$scope.fullbody= {
    
			"attachments": [{
				"objectId":$scope.documentId,
				"Body": $scope.files,
				"ContentType": "image/png",
				"Name": "picture.png"
			}]
		};
		
		Document.uploadSingleFile(JSON.stringify($scope.fullbody))
		.then(function(response){
			$scope.applications = response.data;
			console.log(response.data);
			console.log($scope.Name);
		},function(error){
			$scope.status = 'Unable to load files';
		});
	}

    $scope.getDocumentCategory();*/
})
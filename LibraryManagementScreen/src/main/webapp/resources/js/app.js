var taskManagerModule = angular.module('taskManagerApp', ['ngAnimate']);
var urlHolder = new Object();

angular.isUndefinedOrNull = function(val) {
    return angular.isUndefined(val) || val === null
}


taskManagerModule.controller('taskManagerController', function ($scope,$http, $timeout) {

    $scope.addToggle=true;
    $scope.editToggle=true;
    $scope.infoGif=true;
    $scope.addSuccess=true;
    $scope.updateSuccess=true;
    $scope.deleteSuccess=true;

    $scope.viewAllAddressBook = function viewAllAddressBook(){
        $http.post(urlHolder.records).
            success(function(response){
            $scope.books = response;
        })
    }

    $scope.viewAllAddressBook();

    $scope.cancelAddBook = function(book) {
        $scope.addToggle='!addToggle';
        Recaptcha.reload();
        book.name = null;
        book.author = null;

    }

    $scope.addBook = function(book) {
        if(angular.isUndefinedOrNull(book.name)  || angular.isUndefinedOrNull(book.author) || $('#recaptcha_response_field').val() == ""){
            if($('#recaptcha_response_field').val() == "")
                alert("Fill the captcha field");
        }
        else{
            Recaptcha.reload();
            var data = {
                'name': book.name,
                'author': book.author,
                'responseField' : $('#recaptcha_response_field').val(),
                'challangeField': $('#recaptcha_challenge_field').val()
            };
            $scope.infoGif=false;
            $http.post(urlHolder.add, data).
                success(function(response){
                    $scope.infoGif=true;
                    if(response == "wrongCaptcha"){
//                        alert("Captcha is invalid");
                        $scope.addToggle=false;
                    }
                    else if(response == "failSave"){
                        $scope.addToggle=false;
                        alert("Book Name or Auther is empty");
                    }
                    else if(response == "successSave"){
                        $scope.addSuccess = false;
                        $timeout(function () { $scope.addSuccess = true; }, 3000);
                        $scope.addToggle=true;
                        book.name = null;
                        book.author = null;
                        $scope.viewAllAddressBook();
                    }
                }).
                error(function(response){
                    console.log(response);
                    $scope.infoGif=true;
                })
        }
    }


    // Archive Completed Tasks
    $scope.deleteBook = function() {

        if(angular.isUndefinedOrNull($scope.id)){
            alert("Please Select A Book!");
        }
        else{

                var book =
                {
                    'id':$scope.id
                };
                 $http.post(urlHolder.del, book).
                        success(function(response){

                            if(response == "true"){
                                $scope.deleteSuccess = false;
                                $timeout(function () { $scope.deleteSuccess = true; }, 3000);
                                $scope.viewAllAddressBook();
                            }
                            else{
                                alert("Cannot Find Data!");
                            }
                        }).
                        error(function(response){
                            console.log(response);
                        })

        };
        $scope.id = null;
        }

    // Archive Completed Tasks
    $scope.editBook = function() {
        if(angular.isUndefinedOrNull($scope.id)){
            alert("Please Select A Book!");
        }
        else if (angular.isUndefinedOrNull($scope.name)  || angular.isUndefinedOrNull($scope.author)){

        }
        else{
            $scope.infoGif=false;
            var book =
            {
                'id':$scope.id,
                'name':$scope.name,
                'author':$scope.author
            };
            $http.post(urlHolder.edit, book).
                success(function(response){
                    $scope.editToggle=true;
                    if(response == "true"){

                        $scope.updateSuccess = false;
                        $timeout(function () { $scope.updateSuccess = true; }, 3000);
                        $scope.viewAllAddressBook();
                        $scope.infoGif=true;

                    }
                    else{
                        alert("Cannot Find Data!");
                        $scope.infoGif=true;
                        $scope.editToggle=false;
                    }

                }).
                error(function(response){
                    console.log(response);
                    $scope.infoGif=true;
                })

            $scope.editToggle=true;
        }
    }

    $scope.checkRadioisSelectedForEditBook = function() {
        if(angular.isUndefinedOrNull($scope.id)){
            alert("Please Select A Book!");
        }
        else{

            var book =
            {
                'id':$scope.id
            };
            $http.post('books/find', book).
                success(function(response){
                    $scope.name = response.name;
                    $scope.author = response.author;
                    $scope.editToggle=false;
                }).
                error(function(response){
                    console.log(response);
                })
        }
    }


});



//Angularjs Directive for confirm dialog box
taskManagerModule.directive('ngConfirmClick', [
    function(){
        return {
            link: function (scope, element, attr) {
                var msg = attr.ngConfirmClick || "Are you sure?";
                var clickAction = attr.confirmedClick;
                element.bind('click',function (event) {
                    if ( window.confirm(msg) ) {
                        scope.$eval(clickAction);
                    }
                });
            }
        };
}]);
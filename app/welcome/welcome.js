'use strict';

angular.module('myApp.welcome', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/welcome', {
        templateUrl: 'welcome/welcome.html',
        controller: 'WelcomeCtrl'
    });
}])

.controller('WelcomeCtrl', ['$scope', '$firebase','$location', 'CommonProp', function($scope, $firebase, $location ,CommonProp) {
    $scope.username = CommonProp.getUser();
    if(!$scope.username){
        $location.path('/home');
    }

    var firebaseObj = new Firebase("https://blazing-torch-2087.firebaseio.com/Articles/");
    var sync = $firebase(firebaseObj.startAt($scope.username).endAt($scope.username));

    var query = firebaseObj.orderByKey;

    $scope.articles = sync.$asArray();
	console.log(sync);

    $scope.logout = function(){
    CommonProp.logoutUser();
}

    $scope.addComment = function(id) {
        console.log(id);
        var firebaseObj = new Firebase("https://blazing-torch-2087.firebaseio.com/Comment/" + id);
        var syn = $firebase(firebaseObj);
        $scope.saveCom = syn.$asObject();
        $('#addCommentModal').modal();
    }

    $scope.saveComment = function() {
        var name = $scope.article.name;
        var comment = $scope.article.comment;

        var fb = new Firebase("https://blazing-torch-2087.firebaseio.com/Comment/");
        var article = $firebase(fb);
        var user = CommonProp.getUser();
        article.$push({ name: name,comment: comment,emailId: user,'.priority': user}).then(function(ref) {
            login.loading = false;
        }, function(error) {
            login.loading = false;
            console.log("Error:", error);
        });
        $('#addCommentModal').modal('hide');
    }

    $scope.like = function(){
        var count = $scope.article.count = 0;
        count = count + 1;
        var fb = new Firebase("https://blazing-torch-2087.firebaseio.com/Likes/");
        var article = $firebase(fb);
        var user = CommonProp.getUser();
        article.$push({ count: count, emailId: user, '.priority': user}).then(function(ref){
            login.loading = false;
        }, function(error){
            login.loading = false;
            console.log("Error:", error);
        });

    }

    $scope.editPost = function(id) {
        console.log(id);
        var firebaseObj = new Firebase("https://blazing-torch-2087.firebaseio.com/Articles/" + id);


        var syn = $firebase(firebaseObj);
        $scope.postToUpdate = syn.$asObject();

        $('#editModal').modal();
    }

    $scope.update = function() {
        console.log($scope.postToUpdate.$id);
        var fb = new Firebase("https://blazing-torch-2087.firebaseio.com/Articles/" + $scope.postToUpdate.$id);
        var article = $firebase(fb);
        article.$update({
            title: $scope.postToUpdate.title,
            post: $scope.postToUpdate.post,
            emailId: $scope.postToUpdate.emailId
        }).then(function(ref) {
            console.log(ref.key()); // bar
            $('#editModal').modal('hide')
        }, function(error) {
            console.log("Error:", error);
        });

    }


    $scope.confirmDelete = function(id) {
        var fb = new Firebase("https://blazing-torch-2087.firebaseio.com/Articles/" + id);
        var article = $firebase(fb);
        $scope.postToDelete = article.$asObject();
        $('#deleteModal').modal();
    }

    $scope.deletePost = function() {
        var fb = new Firebase("https://blazing-torch-2087.firebaseio.com/Articles/" + $scope.postToDelete.$id);
        var article = $firebase(fb);
        article.$remove().then(function(ref) {
            $('#deleteModal').modal('hide');
        }, function(error) {
            console.log("Error:", error);
        });
    }
  
  
    $scope.deleteItem = function(){
        if ($scope.selectedItem >= 0) {
            $scope.data.splice($scope.selectedItem,1);
        }
    }

    $scope.companies = [
                    { 'name':'Ajla',
                        'comment': 'Komentar'},
                    ];
    $scope.addRow = function(){     
        $scope.companies.push({ 'name':$scope.name, 'comment': $scope.comment});
        $scope.name='';
        $scope.comment='';
    };

}]);


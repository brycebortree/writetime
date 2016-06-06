angular.module('WriteCtrls', ['WriteServices'])
.controller('HomeCtrl', ['$scope', 'Post', 'Auth', function($scope, Post, Auth) {
  $scope.posts = [];
  $scope.Auth = Auth;

  Post.query(function success(data) {
    $scope.posts = data;
  }, function error(data) {
    console.log(data);
  });

  $scope.deletePost = function(id, postsIdx) {
    Post.delete({id: id}, function success(data) {
      $scope.posts.splice(postsIdx, 1);
    }, function error(data) {
      console.log(data);
    });
  }
}])
.controller('ShowCtrl', ['$scope', '$stateParams', 'Post', function($scope, $stateParams, Post) {
  $scope.post = {};

  Post.get({id: $stateParams.id}, function success(data) {
    $scope.post = data;
  }, function error(data) {
    console.log(data);
  });
}])
.controller('NewCtrl', ['$scope', '$location', 'Post', function($scope, $location, Post) {
  $scope.post = {
    title: '',
    description: '',
    image: ''
  };

  $scope.createPost = function() {
    Post.save($scope.post, function success(data) {
      $location.path('/');
    }, function error(data) {
      console.log(data);
    });
  }
}])
.controller('NavCtrl', ['$scope', '$location', 'Auth', function($scope, $location, Auth) {
  $scope.Auth = Auth;
  $scope.logout = function() {
    Auth.removeToken();
    console.log('My token:', Auth.getToken());
    $location.path('/');
  }
}])
.controller('AlertsCtrl', ['$scope', 'Alerts', function($scope, Alerts) {
  $scope.Alerts = Alerts;
}])
.controller('SignupCtrl', ['$scope', '$http', '$location', function($scope, $http, $location) {
  $scope.user = {
    name: '',
    email: '',
    password: ''
  };
  $scope.userSignup = function() {
    console.log('signup clicked');
    console.log(user);
    $http.post('/api/users', $scope.user).then(function success(res) {
      $location.path('/');
    }, function error(res) {
      console.log(data);
    });
  }
}])
.controller('LoginCtrl', ['$scope', '$http', '$location', 'Auth', 'Alerts', function($scope, $http, $location, Auth, Alerts) {
  $scope.user = {
    email: '',
    password: ''
  };
  $scope.userLogin = function() {
    console.log('signup clicked');
    $http.post('/api/auth', $scope.user).then(function success(res) {
      Auth.saveToken(res.data.token);
      console.log('Token:', res.data.token)
      $location.path('/');
    }, function error(res) {
      console.log(res);
      Alerts.add('warning', 'Login failure: ' + res.statusText);
    });
  }
}])



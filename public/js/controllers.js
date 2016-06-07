angular.module('WriteCtrls', ['WriteServices'])
.controller('HomeCtrl', ['$scope', 'Post', 'Auth', 
  function($scope, Post, Auth) {
}])
.controller('ShowCtrl', ['$scope', '$location', '$stateParams', 'Post', 'Auth',
  function($scope, $location, $stateParams, Post, Auth) {
  $scope.post = {};
  $scope.Auth = Auth;

  Post.get({id: $stateParams.id}, function success(data) {
    $scope.post = data;
  }, function error(data) {
    console.log(data);
  })

  $scope.deletePost = function(id, postsIdx) {
    Post.delete({id: $stateParams.id}, function success(data) {
      $location.path('/allposts');
      $scope.posts.splice(postsIdx, 1);
      $location.path('/allposts');
    }, function error(data) {
      console.log(data);
    });
  }

  $scope.editPost = function(id, postsIdx) {
    Post.delete({id: $stateParams.id}, function success(data) {
      $location.path('/allposts');
      $scope.posts.splice(postsIdx, 1);
      $location.path('/allposts');
    }, function error(data) {
      console.log(data);
    });
  }


}])
.controller('NewCtrl', ['$scope', '$location', 'Post', 'Auth', 
  function($scope, $location, Post, Auth) {
  $scope.post = {
    title: '',
    description: ''
  };

  $scope.createPost = function() {
    Post.save($scope.post, function success(data) {
      $location.path('/allposts');
    }, function error(data) {
      console.log(data);
    });
  }
}])
.controller('AllCtrl', ['$scope', '$location', 'Posts', 'Auth', 
  function($scope, $location, Posts, Auth) {
  $scope.posts = [];
  $scope.Auth = Auth;

  Posts.query(function success(data) {
    console.log(data);
    $scope.posts = data;
  }, function error(data) {
    console.log(data);
  });
}])
.controller('NavCtrl', ['$scope', '$location', 'Auth', 
  function($scope, $location, Auth) {
  $scope.Auth = Auth;
  $scope.logout = function() {
    Auth.removeToken();
    console.log('My token:', Auth.getToken());
    $location.path('/');
  }
}])
.controller('AlertsCtrl', ['$scope', 'Alerts', 
  function($scope, Alerts) {
  $scope.Alerts = Alerts;
}])
.controller('SignupCtrl', ['$scope', '$http', '$location', 
  function($scope, $http, $location) {
  $scope.user = {
    name: '',
    email: '',
    password: ''
  };
  $scope.userSignup = function() {
      $scope.user = {
        name: $scope.user.name,
        email: $scope.user.email,
        password: $scope.user.password
      };
    $http.post('/api/users', $scope.user).then(function success(res) {
      $location.path('/login');
    }, function error(res) {
      console.log(res.data);
    });
  }
}])
.controller('LoginCtrl', ['$scope', '$http', '$location', 'Auth', 'Alerts', 
  function($scope, $http, $location, Auth, Alerts) {
  $scope.user = {
    email: '',
    password: ''
  };
  $scope.userLogin = function() {
    $http.post('/api/auth', $scope.user).then(function success(res) {
      Auth.saveToken(res.data.token);
      console.log('Token:', res.data.token);
      $location.path('/newPost');
    }, function error(res) {
      console.log(res);
      Alerts.add('warning', 'Login failure: ' + res.statusText);
    });
  }
}])



angular.module('WriteCtrls', ['WriteServices'])

.controller('HomeCtrl', ['$scope', 'Post', 'Auth', 
  function($scope, Post, Auth) {
}])


// P O S T S  C O N T R O L L E R S
.controller('NewCtrl', ['$scope', '$location', 'Post', 'Auth', 
  function($scope, $location, Post, Auth) {
  $scope.post = {
    title: '',
    description: ''
  };

  $scope.createPost = function() {
    Post.save($scope.post, function success(data) {
      $location.path('/myposts');
    }, function error(data) {
      console.log(data);
    });
  }
}])

.controller('ShowCtrl', ['$scope', '$location', '$stateParams', '$state', 'Comment', 'Post', 'Auth', 
  function($scope, $location, $stateParams, $state, Comment, Post, Auth){
  $scope.post = {};
  $scope.Auth = Auth;


  Post.get({id: $stateParams.id}, function success(data) {
    $scope.post = data.post;
    $scope.user = data.user;
    $scope.comments = data.comments;
    console.log(data);
  }, function error(data) {
    console.log(data);
  })

  $scope.deletePost = function(id, postsIdx) {
    Post.delete({id: $stateParams.id}, function success(data) {
      $scope.posts.splice(postsIdx, 1);
    }, function error(data) {
      console.log(data);
    });
  }

  $scope.comment = {
    content: '',
    postId: $stateParams.id
  };
  $scope.comments = [];
  $scope.Auth = Auth;

  Post.get({id: $stateParams.id}, function success(data){
    console.log(data);
    $scope.post = data.post;
    $scope.comments = data.comments;
  }, function error(data){
    console.log(data)
  });

  $scope.createComment = function() {
  Comment.save($scope.comment, function success(data) {
    $state.go($state.current, {}, {reload: true});    
  }, function error(data) {
    console.log(data);
  });
}

  $scope.deleteComment = function(id, commentsIdx) {
  Comment.delete({id: $stateParams.id}, function success(data) {
    $scope.comments.splice(commentsIdx, 1);
  }, function error(data) {
    console.log(data);
  });
  }
}])

// Note that all is POSTS PLURAL
.controller('AllCtrl', ['$scope', '$location', 'Posts', 'Auth', 
  function($scope, $location, Posts, Auth) {
  $scope.posts = [];
  $scope.Auth = Auth;

  Posts.query(function success(data) {
    console.log("data:", data);
    // console.log("user?", data[0].user.name);
    $scope.posts = data.posts;
    // $scope.user = data[0].user.name;
  }, function error(data) {
    console.log(data);
  });
}])
.controller('MyCtrl', ['$scope', '$location', 'MyPosts', 'Auth', 
  function($scope, $location, MyPosts, Auth) {
  $scope.posts = [];
  $scope.Auth = Auth;

  MyPosts.query(function success(data) {
    console.log(data);
    $scope.posts = data.posts;
    $scope.user = data.user;
  }, function error(data) {
    console.log(data);
  });
}])
.controller('EditCtrl', ['$scope', '$stateParams', '$location', 'Post', 'Auth', '$http',
  function($scope, $stateParams, $location, Post, Auth, $http) {
  $scope.posts = [];
  $scope.Auth = Auth;

  Post.get({id: $stateParams.id}, function success(data) {
    $scope.post = data.post;

  }, function error(data) {
    console.log(data);
  })
  $scope.updatePost = function(id) {
    $scope.post = {
      title: $scope.post.title,
      content: $scope.post.content
    };
    console.log("post:", $scope.post);
    $http.post('api/posts/' + id, $scope.post).then(function success(res) {
      $location.path('/posts/' + id);
    }, function error(res) {
      console.log(res.data);
    })
  }
  $scope.deletePost = function(id, postsIdx) {
    Post.delete({id: $stateParams.id}, function success(data) {
      $scope.posts.splice(postsIdx, 1);
    }, function error(data) {
      console.log(data);
    });
  }
}])

// U S E R S   C O N T R O L L E R S
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

.controller('SignupCtrl', ['$scope', '$http', '$location', 'Auth',
  function($scope, $http, $location, Auth) {
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
      Auth.saveToken(res.data.token);
      $location.path('/newpost');
    }, function error(res) {
      console.log(res.data);
    });
  }
}])

.controller('LoginCtrl', ['$scope', '$http', '$location', 'Auth', 'Alerts', 
  function($scope, $http, $location, Auth, Alerts) {
  $scope.loginBody = true;
  $scope.user = {
    email: '',
    password: ''
  };
  $scope.userLogin = function() {
    $http.post('/api/auth', $scope.user).then(function success(res) {
      Auth.saveToken(res.data.token);
      console.log('Token:', res.data.token);
      $location.path('/newpost');
    }, function error(res) {
      console.log(res);
      Alerts.add('warning', 'Login failure: ' + res.statusText);
    });
  }
}])



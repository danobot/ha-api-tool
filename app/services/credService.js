app.service('CredentialService', ['$localStorage', function($localStorage) {
  authToken = "";
  api_url = "";
  $storage = $localStorage;

  // Observers
  var observerCallbacks = [];

  //register an observer
  this.subscribe = function(callback) {
    observerCallbacks.push(callback);
    console.log('added subscriber');
  };

  //call this when you know 'foo' has been changed
  var notify = function() {
    angular.forEach(observerCallbacks, function(callback) {
      callback();
    });
  };
  console.log($storage.cred);
  if ($storage.api_url || $storage.authToken) {
    console.log("Setting credentials from Local Storage", $storage.api_url, $storage.authToken);
    authToken = $storage.authToken;
    api_url = $storage.api_url;
    notify();
  }
  this.saveAuthToken = function(token) {
    $storage.authToken = token;
    authToken = token;
    notify();
  };

  this.hasCredentials = function() {
    return $storage.api_url && $storage.authToken;
  }

  this.saveApiUrl = function(url) {
    $storage.api_url = url;
    api_url = url;
    notify();
  };

  this.getAuthToken = function() {
    return authToken;
  };

  this.getApiUrl = function() {
    return api_url;
  };

  this.getHeaders = function() {
    return {
      authToken: authToken
    };
  };

  this.remove = function() {
    delete $storage.api_url;
    delete $storage.authToken;
  }


}]);

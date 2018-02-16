app.service('CredentialService', ['$localStorage', function($localStorage) {

  $storage = $localStorage;
  this.saveAuthToken = function(tokent) {
    $storage.api_password = tokent;

    notify();
  };
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
  if ($storage.api_url || $storage.api_password) {
    console.log("Setting credentials from Local Storage", $storage.api_url, $storage.api_password);

    notify();
  }


  this.hasCredentials = function() {
    return $storage.api_url && $storage.api_password;
  };

  this.saveCredentials = function(url, pw) {
    $storage.api_password = pw;
    $storage.api_url = url;

    notify();
  };

  this.getAuthToken = function() {
    return $storage.api_password;
  };

  this.getApiUrl = function() {
    return $storage.api_url;
  };

  this.getHeaders = function() {
    return {
      authToken: $storage.api_password
    };
  };

  this.remove = function() {
    delete $storage.api_url;
    delete $storage.api_password;
  }


}]);

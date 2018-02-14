app.service('hass', function($http, CredentialService) {

this.updateEntity = function (entity) {

      var data = $.param(entity);

      return  $http.post('https://'+CredentialService.getApiUrl()+'/states/'+entity.entity_id, data, getConfig());

}

this.getStates = function() {
  return $http.get('https://'+CredentialService.getApiUrl()+'/states', getConfig());
};



function getConfig() {
  return {
      headers: {
          'Content-Type': 'application/json',
          'api_password': CredentialService.getAuthToken(),
          'Access-Control-Allow-Origin': '*',
          // "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
      }
  }
};
});

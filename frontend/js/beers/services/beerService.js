define([
    'angularAMD',
], function(angularAMD) {
  'use strict';

  angularAMD.factory('beerService', [
    '$resource',
    function($resource) {

      this.resource = function() {
          return $resource(
            'api/beers/:_id',
            { _id: '@_id' },
            {
              update: {
                method: 'PUT'
              }
            }
          );
      };

      return this;
    }
  ]);

});

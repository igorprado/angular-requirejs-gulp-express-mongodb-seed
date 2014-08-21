define([
  'app'
  ], function(app) {
  'use strict';

  app.controller('beersController', function ($scope, beers, beerService, flash){
    $scope.beers = beers;
    var $state = $scope.$state;

    // This method will be available to any state child
    $scope.delete = function(_id) {
      // TODO: Check wich state the delete was called
      beerService.resource().delete({ _id: _id }).$promise.then(function(response){
        flash.success = response.message;
        if ($state.current.name === 'beers.detail') {
          $state.go('beers', null, {reload: true});
          return;
        }
        $state.reinit();

      });
    }
  });
});
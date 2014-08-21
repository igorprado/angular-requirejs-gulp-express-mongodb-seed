define([
  'app',
  'directives/appDisableOnSubmit'
  ], function(app) {
  'use strict';

  app.controller('beersFormController', function ($scope, beer, beerService, flash) {
    var $state = $scope.$state;

    $scope.beer = {};

    if (beer) {
      $scope.beer = beer;
    }
    
    $scope.types = [
      'Pilsen',
      'Ale',
      'IPA',
      'Corn beer',
      'Lager',
      'Mal beer',
      'Smoked beer'
    ];

    $scope.save = function() {
      if (beer) {
        beerService.resource().update(this.beer).$promise.then(function(response){
          flash.success = response.message;
          $state.go('beers.detail', {_id: beer._id}, {reload: true});
        });
        return;
      }

      beerService.resource().save(this.beer).$promise.then(function(response){
        flash.success = response.message;
        $state.go('beers.add', null, {reload: true});
      });
    };
  });
});
define([
  'app',
  ], function(app) {
  'use strict';

  app.controller('beersDetailController', function ($scope, beer) {
    // Update the state title with the beer name
    $scope.$state.current.data.title = beer.name;

    $scope.beer = beer;
  });
});
define([
  'angularAMD',
  'beers/services/beerService',
  ], function (angularAMD) {
    'use strict';

  var beers = angular.module('App.beers', []);

  // App Config
  beers.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('beers', angularAMD.route({
            url: '/beers',
            templateUrl: 'partials/beers/list',
            controller: 'beersController',
            data: {
              title: 'Beers',
            },
            controllerUrl: 'beers/controllers/beersController',
            resolve: {
              beers: ['beerService', function(beerService) {
                return beerService.resource().query().$promise;
              }]
            }
          })
      )
      .state('beers.add', {
            url: '/add',
            data: {
              title: 'Add beers',
            },
            views: {
              'beer': angularAMD.route({
                templateUrl: 'partials/beers/form',
                controller: 'beersFormController',
                controllerUrl: 'beers/controllers/beersFormController',
                resolve: {
                  beer: function() {
                    return false;
                  }
                }
              })
            }
          }
      )
      .state('beers.edit', {
            url: '/:_id/edit',
            data: {
              title: 'Edit beer',
            },
            views: {
              'beer': angularAMD.route({
                templateUrl: 'partials/beers/form',
                controller: 'beersFormController',
                controllerUrl: 'beers/controllers/beersFormController',
                resolve: {
                  beer: ['$stateParams', 'beerService', function($stateParams, beerService) {
                    var _id = $stateParams._id;
                    return beerService.resource().get({ _id: _id }).$promise;
                  }]
                }
              })
            }
          }
      )
      .state('beers.detail', {  
            url: '/:_id',
            views: {
              'beer': angularAMD.route({
                templateUrl: 'partials/beers/detail',
                controller: 'beersDetailController',
                controllerUrl: 'beers/controllers/beersDetailController',
                resolve: {
                  beer: ['$stateParams', 'beerService', function($stateParams, beerService) {
                    var _id = $stateParams._id;
                    return beerService.resource().get({ _id: _id }).$promise;
                  }]
                }  
              })
            }
          }
      );
  });

  return beers;
});
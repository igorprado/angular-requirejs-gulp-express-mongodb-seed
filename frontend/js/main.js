require.config({
    baseUrl : 'js',
    paths : {
        // AngularJS
        'angular'               : '//ajax.googleapis.com/ajax/libs/angularjs/1.2.22/angular.min',
        'angular.resource'    : '//ajax.googleapis.com/ajax/libs/angularjs/1.2.22/angular-resource.min',
        'angular.animate'     : '//ajax.googleapis.com/ajax/libs/angularjs/1.2.22/angular-animate.min',
        'angular.sanitize'    : '//ajax.googleapis.com/ajax/libs/angularjs/1.2.22/angular-sanitize.min',
        'angular.pt-br'       : '//cdnjs.cloudflare.com/ajax/libs/angular-i18n/1.2.15/angular-locale_pt-br',

        // AngularAMD
        'angularAMD'          : '../lib/angularAMD/angularAMD.min',
        'ngload'              : '../lib/angularAMD/ngload.min',

        // Other libs
        'ngProgress'          : '../lib/ngprogress/build/ngProgress.min',
        'angular-ui-router'   : '../lib/angular-ui-router/release/angular-ui-router.min',
        'checklist-model'     : '../lib/checklist-model/checklist-model',
        'angular-flash'       : '../lib/angular-flash/dist/angular-flash.min',

        // jQuery
        'jquery'              : '//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min',
    },

    shim : {
        'angular' : {
            deps : ['jquery'],
            exports : 'angular'
        },
        'angular.route' : {
            deps : ['angular']
        },
        'angular.resource' : {
            deps : ['angular']
        },
        'angular.animate' : {
            deps : ['angular']
        },
        'angular.sanitize' : {
            deps : ['angular']
        },
        'angular.pt-br' : {
            deps : ['angular']
        },
        'ngProgress': {
            deps : ['angular']
        },
        'angular-ui-router': {
            deps : ['angular']
        },
        'checklist-model': {
            deps : ['angular']
        },
        'angular-flash': {
            deps : ['angular']
        },
        'angularAMD': {
            deps : ['angular'],
        },
        'ngload': {
            deps : ['angularAMD']
        },
        'jquery': {
            exports: '$'
        }
    },
    deps: ['app']
});
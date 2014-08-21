define([
    'app'
], function(app) {
  'use strict';

  app.directive('appDisableOnSubmit', function() {
    return {
      restrict: 'A',
      compile: function(element) {
        // Adds a listener to submit function
        element.on('submit', function(e) {
          element.fadeTo('fast', 0.5);
          element.find('.btn-submit').text('Wait...').attr('disabled', 'disabled');
        });
      }
    }
  });

});

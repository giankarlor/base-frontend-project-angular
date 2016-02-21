(function(){
  'use strict';

  angular
    .module('baseApp')
    .value('exampleNum', 12)
    .factory('baseFactory', ['exampleNum', baseFactory]);

    function baseFactory(exampleNum) {

      var city = 'Chicago';

      return {
        location: function(){
          return city;
        }
      };

    }

})();

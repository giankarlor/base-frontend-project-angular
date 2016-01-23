angular.module('baseApp')

  .value('exampleNum', 12)

  .factory('baseFactory', ['exampleNum', function (exampleNum) {

    var city = 'Chicago';

    return {
      location: function(){
        return city;
      }
    };

  }]);

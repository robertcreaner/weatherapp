app.factory('weather', ['$http', function($http) {
  return $http.get('http://api.openweathermap.org/data/2.5/forecast/city?id=524901&APPID=e35dbf5e36e3b807f06a392f0fe5c261&q=Dublin,ie')
         .success(function(data) {
           return data;
         })
         .error(function(data) {
           return data;
         });
}]);
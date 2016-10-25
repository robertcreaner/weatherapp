app.controller("mainCtrl", [ '$scope', 'photos', '$http', function($scope, photos, $http){

		photos.success(function(data){
			$scope.photos = data;
		});

		$scope.check = function() {
		    document.getElementById("defaultTime").checked = true;
		}

		 $scope.method = 'GET';
		 $scope.city = '';
		 var weekdays = new Array(7);
		 weekdays[0]=  "Sunday";
	     weekdays[1] = "Monday";
		 weekdays[2] = "Tuesday";
	     weekdays[3] = "Wednesday";
	     weekdays[4] = "Thursday";
	     weekdays[5] = "Friday";
	     weekdays[6] = "Saturday";

	     $scope.weatherTime = 'morning';
	     $scope.fetch = function() {
	       $scope.code = null;
	       $scope.response = null;
	       $scope.mainWeather = [];
	       $scope.url = "http://api.openweathermap.org/data/2.5/forecast/daily?id=524901&APPID=e35dbf5e36e3b807f06a392f0fe5c261&cnt=7&"+$scope.city;
	       $http({method: $scope.method, url: $scope.url}).
	         then(function(response) {
	           $scope.status = response.status;
	           $scope.data = response.data;	
			    $.each($scope.data.list, function(index, element){
			    	if($scope.weatherTime=="evening"){
					      $scope.mainWeather.push({
					      	main:element.weather[0].main,
					      	iconId:element.weather[0].icon,
					      	date:element.dt,
					      	icon:'',
					      	day:'',
					      	time:'',
					      	date2:'',
					      	temper:element.temp.eve - 273.15,
					      	bkgrnd:''
					      });
					  } else if ($scope.weatherTime=="morning"){
					      $scope.mainWeather.push({
					      	main:element.weather[0].main,
					      	iconId:element.weather[0].icon,
					      	date:element.dt,
					      	icon:'',
					      	day:'',
					      	time:'',
					      	date2:'',
					      	temper:element.temp.morn - 273.15,
					      	bkgrnd:''
					      });
					  } else {
					      $scope.mainWeather.push({
					      	main:element.weather[0].main,
					      	iconId:element.weather[0].icon,
					      	date:element.dt,
					      	icon:'',
					      	day:'',
					      	time:'',
					      	date2:'',
					      	temper:element.temp.night - 273.15,
					      	bkgrnd:''
					      });
					  }
			   });
				
				for(i=0;i<$scope.mainWeather.length;i++){
					// Generate logo
			    	if($scope.mainWeather[i].iconId=='10d'){
				    	$scope.mainWeather[i].icon = 'wi wi-rain';
				    } else if ($scope.mainWeather[i].iconId=='10n') {
				    	$scope.mainWeather[i].icon = 'wi-night-alt-rain';
				    } else if ($scope.mainWeather[i].iconId=='01d') {
				    	$scope.mainWeather[i].icon = 'wi wi-day-sunny-overcast';
				    } else if ($scope.mainWeather[i].iconId=='01n') {
				    	$scope.mainWeather[i].icon = 'wi-night-clear';
				    } else if ($scope.mainWeather[i].iconId=='13d') {
				    	$scope.mainWeather[i].icon = 'wi wi-snow';
				    } else if ($scope.mainWeather[i].iconId=='13n') {
				    	$scope.mainWeather[i].icon = 'wi-night-alt-snow';
				    }

				    // Generate day
				    var unixDate = new Date($scope.mainWeather[i].date * 1000);
				    var	timeString = unixDate.toString();
				    var time = timeString.substring(11, 16);
				    var date2 = timeString.substring(8, 10);
				    var date3 = timeString.substring(4,7);
				    $scope.mainWeather[i].date2 = date2+' '+date3;
				    
				    switch (unixDate.getDay()) {
					    case 0:
					        $scope.mainWeather[i].day = "Sunday";
					        break;
					    case 1:
					        $scope.mainWeather[i].day  = "Monday";
					        break;
					    case 2:
					        $scope.mainWeather[i].day  = "Tuesday";
					        break;
					    case 3:
					        $scope.mainWeather[i].day  = "Wednesday";
					        break;
					    case 4:
					        $scope.mainWeather[i].day  = "Thursday";
					        break;
					    case 5:
					        $scope.mainWeather[i].day  = "Friday";
					        break;
					    case 6:
					        $scope.mainWeather[i].day  = "Saturday";
					        break;
					}
			    }
	         }, function(response) {
	           $scope.data = response.data || "Request failed";
	           $scope.status = response.status;
	           alert($scope.status);
	           alert($scope.data);
	       });
	     };

		$scope.values = [
		{number:1, output:"First input", display:true},
		{number:2, output:"Second input", display:true},
		{number:3, output:"Third input", display:true}, 
		{number:4, output:"Fourth input", display:true}
		];

		$scope.inputNum = null;

		$scope.showOutput = function(){
			var num = $scope.inputNum;
			if(num.length==0){
				for(i=0;i<$scope.values.length;i++){
					$scope.values[i].display = true;
				}
			} else {
				for(i=0;i<$scope.values.length;i++){
					if(num!=$scope.values[i].number){
						$scope.values[i].display = false;
					}
				}
			}
		}
		
	}
]);
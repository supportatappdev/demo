
var baseUrl = 'http://localhost:8080/nfi/api/', isDebugEnabled = true;
var app = angular.module('DemoApp',['ngRoute','ngResource','ChartsApp']);

app.config(['$provide', function ($provide) {
	$provide.decorator('$sniffer', ['$delegate', function ($delegate) {
		if (!$delegate.transitions||!$delegate.animations) {
			$delegate.transitions = (typeof document.body.style.webkitTransition=== 'string');
			$delegate.animations = (typeof document.body.style.webkitAnimation === 'string');
		}
		return $delegate;
	}]);  
}]);

app.config(function ($routeProvider) {
	$routeProvider
	.when('/', {
		controller: 'IndexCtrl'
	})
	.when('/charts',{
	    templateUrl: 'charts.html',
		controller: 'ChartsCtrl'
	})
	.when('/tasklist',{
	    templateUrl: 'tasks.html',
		controller: 'TaskListCtrl'
	})
	.when('/tasklist/:projId',{
	    templateUrl: 'tasks.html',
		controller: 'TaskListCtrl'
	})/*
	.when('/editTask/:taskId',{
	    templateUrl: 'tasks.html',
		controller: 'TaskListCtrl'
	})*/
	.when('/login', {
		templateUrl: 'views/login.html',
		controller: 'LoginCtrl'
	})
	.otherwise({
		redirectTo: '/'
	});
});

app.service('Cache', function () {
	var map;
	this.init = function(){
		if (map) {
			return;
		}
		if (localStorage.getItem('Cache')){
			map = angular.fromJson(localStorage.getItem('Cache'));
		} else {
			map = {};
		}
	};
	this.get = function (k) {
		this.init();
		return map[k];
	};
	this.put = function (k, v) {
		this.init();
		map[k] = v;
		localStorage.setItem('Cache', angular.toJson(map));
		return map[k];
	};
	this.remove = function (k) {
		this.init();
		delete map[k];
		localStorage.setItem('Cache', angular.toJson(map));
	};
});

app.config(['$routeProvider', '$locationProvider', '$httpProvider',
function ($routeProvider, $locationProvider, $httpProvider) {
	$httpProvider.defaults.useXDomain = true;
	delete $httpProvider.defaults.headers.common['X-Requested-With'];
	var interceptor = ['$rootScope', '$q', function ($rootScope, $q) {
		function success(response) {
			return response;
		}
		function error(response) {
			//debug('http request error:');
			//debug(angular.toJson(response));
			var status = response.status;
			if (status === 0) {
				console.log('There seems to be some network issue. Please make sure you are connected to the internet.', 'Connection issue');
			}
			if (status === 401 && status === 404) {
				console.log('Page not found', 'Page not found');
			} else {
				console.log(response.message);
			}
			// otherwise
			return $q.reject(response);
		}
		return function (promise) {
			return promise.then(success, error);
		};
	}];
	$httpProvider.responseInterceptors.push(interceptor);
}]);

app.factory('DropDownFactory', ['RESTService',function(RESTService,Logger) {
    return {
        loadDropDown: function(ds,valueAttribute,displayAttribute,whereClause,callback) {
        	//alert(Session.get().userId);  
        	//var whereClauseParams = [Session.get().userId];
        	//'whereClause': whereClause,'whereClauseParams':whereClauseParams,
        	//alert(Session.get().userId+"****"+whereClause);
        	//console.log("***In load drop down******");
        	//var dsoptions =	{};     
        	var  options =	{'ds':ds,'limit':100,'offset':0, 
        	 				 'executeCountSql': 'N',  
        	 				 'select': valueAttribute+","+displayAttribute,
        	 				 'orderBy': '#creationDate# DESC'};
			RESTService.query({'method':'data'},options ,callback);
			}
    };
}]);

app.factory('RESTService', function($resource) {
	return $resource(baseUrl + ':method', {'8180':':8180'}, {
		query: {
			method: 'POST',
			params: {},
			isArray: false
		},
		save: {
			method: 'POST',
			params: {},
			isArray: false  
		},
		invoke: {
			method: 'POST',
			params: {},
			isArray: false
		},
		saveAll: {
			method: 'POST',
			params: {},
			isArray: true
		}
	});
});


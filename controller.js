
	'use strict';
	var app = angular.module('DemoApp');

	app.controller('IndexCtrl', ['$rootScope','$scope', '$location', 'DropDownFactory','RESTService',  'Cache',  function ($rootScope,$scope, $location,DropDownFactory,RESTService,  Cache) {
	    $rootScope.selection = 'MainPage';
	}]);
	
	
	app.controller('ChartsCtrl', ['ChartAPI','$rootScope','$scope', '$location', 'DropDownFactory','RESTService',  'Cache',  function (ChartAPI,$rootScope,$scope, $location,DropDownFactory,RESTService,  Cache) {
	    $rootScope.selection = 'MainPage1';
	    //load chart
		ChartAPI.columnChart('chart_div');
		ChartAPI.areaChart('chart_div1');
		ChartAPI.barChart('chart_div2');
			ChartAPI.candleStick('chart_div3');
		ChartAPI.gaugeChart('chart_div4');
		ChartAPI.geoChart('chart_div5');
		ChartAPI.lineChart('chart_div6');
ChartAPI.pieChart('chart_div7');
		
	}]);
	  
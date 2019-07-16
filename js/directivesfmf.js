var fmfdirectives = angular.module('fmfdirectives', ['ngQuill','ui.bootstrap']);

fmfdirectives.directive('tableFmf', [function () {
	return{
		restrict:'E',
		scope:{
			"headerlist":"=",
			"ngModel":"=",
			"list":"=",
			"delete":"&onDelete",
			"edit":"&onEdit",
			"ifInteractive":"="
        },
		templateUrl:pack.sdurl+"/js/templatesjs/tablefmf.html",
		link: function (scope, iElement, iAttrs) {
			scope.itemlist = [];
			scope.$watch('ngModel', function(newValue, oldValue) {
				if (newValue === oldValue) {
				  return;
				}
				scope.ngModel.forEach(element => {
					var obj = {};
					scope.headerlist.forEach(item => {
						obj[item.value] = element[item.value];
					});
					scope.itemlist.push(obj);
				});
				
			});
		}
	}
}]);

fmfdirectives.directive('formFmf', [function () {
	return{
		restrict:'E',
		scope:{
			control:"=",
			form:"=",
			dataform:"=",
			send:"&onSend",
			btndisabled:"="
        },
		templateUrl:pack.sdurl+"/js/templatesjs/formfmf.html",
		link: function (scope, iElement, iAttrs) {
			
			scope.internalControl = scope.control || {};

			scope.internalControl.getmodelform = function(){
				return scope.elemform;
			}
 
			scope.elemform={};

			scope.popup1 = {
				opened: false
			  };
			
			scope.inlineOptions = {
				customClass: getDayClass,
				minDate: new Date(),
				showWeeks: true
			};
			
			scope.dateOptions = {
				dateDisabled: disabled,
				formatYear: 'yy',
				minDate: new Date(),
				startingDay: 1
			};

			scope.open1 = function() {
				scope.popup1.opened = true;
			};

			scope.changeelement = function(item){
				if(typeof scope.elemform[item] === "boolean"){
					scope.elemform[item] = !scope.elemform[item];
				}else{
					scope.elemform[item]=true;
				}
			}

			scope.$watch('dataform', function(newValue, oldValue) {
				if (newValue === oldValue) {
				  return;
				}
				scope.elemform=scope.dataform;
			});

			function getDayClass(data) {
				var date = data.date,mode = data.mode;
				if (mode === 'day') {
					var dayToCheck = new Date(date).setHours(0,0,0,0);
					for (var i = 0; i < $scope.events.length; i++) {
						var currentDay = new Date(scope.events[i].date).setHours(0,0,0,0);
						if (dayToCheck === currentDay) {
							return scope.events[i].status;
						}
					}
				}
				return '';
			}
			
			function disabled(data) {
				var date = data.date, mode = data.mode;
				return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
			}
		},
		controller:'AppCtrl'
	}
}]);

fmfdirectives.directive('multiTextInput', [function () {
	return{
		restrict:'E',
		scope:{
			ngModel:"=",
			text:"="
        },
		templateUrl:pack.sdurl+"/js/templatesjs/multitextinput.html",
		link: function (scope, iElement, iAttrs) {
			
			scope.add = function(){
				if(Array.isArray(scope.ngModel)){
					scope.ngModel.push("");	
				}else{
					scope.ngModel=[];
					scope.ngModel.push("");	
				}
			}

			scope.delete = function(index){
				scope.ngModel.splice(index,1);
			}
		}
	}
}]);

fmfdirectives.directive('multiCheckbox', [function () {
	return{
		restrict:'E',
		scope:{
			ngModel:"=",
			text:"=",
			list:"="
        },
		templateUrl:pack.sdurl+"/js/templatesjs/multicheckbox.html",
		link: function (scope, iElement, iAttrs) {
			
		}
	}
}]);

fmfdirectives.directive('tableDataFmf', [function () {
	return{
		restrict:'E',
		scope:{
			ngModel:"=",
			text:"=",
			headerlist:"=",
			list:"=",
			template:"=",
			form:"="
        },
		templateUrl:pack.sdurl+"/js/templatesjs/tabledatafmf.html",
		link: function (scope, iElement, iAttrs) {
			scope.dialogStyle = {};
			scope.modalShown = false;
			scope.title = "Date for location";
			scope.btnFalse = true;
			scope.btnTrue = true;
			scope.textActionFalse = "close";
			scope.textActionTrue = "Add";
			scope.btndisabled = true;

			scope.fndata = {};

			scope.toggleModal = function(){
				scope.modalShown = !scope.modalShown;
			}

			scope.delete = function(index){
				scope.ngModel.splice(index,1);
			}

			scope.actionFalse = function() {
				scope.modalShown = false;
			};

			scope.actionTrue = function(){
				var params = scope.fndata.getmodelform();
				if(Array.isArray(scope.ngModel)){
					scope.ngModel.push(params);	
				}else{
					scope.ngModel=[];
					scope.ngModel.push(params);	
				}
				scope.modalShown = !scope.modalShown;
			}

			
		}
	}
}]);

fmfdirectives.directive('modalDialog', function($window, $templateCache, $compile, $http) {
	return {
		restrict: 'E',
		scope: {
			ngModel:"=",
			show: '=',
			modal: '=',
			form:"=",
			save: '&',
			template: '='
		},
		replace: true,
		templateUrl:pack.sdurl+"/js/templatesjs/modalfmf.html",
		link: function(scope, element, attrs) {
			scope.dialogStyle = {};
			if (attrs.width) {
				scope.dialogStyle.width = attrs.width + '%';
				scope.dialogStyle.left = ( ( 100 - attrs.width ) / 2 ) + '%';
			}
			if (attrs.height) {
				scope.dialogStyle.height = attrs.height + '%';
				scope.dialogStyle.top = ( ( 100 - attrs.height ) / 2 ) + '%';
			}
			
			scope.clone = function(obj) {
				if (obj === null || typeof obj !== 'object') {
					return obj;
				}
				var temp = obj.constructor(); // give temp the original obj's constructor
				for (var key in obj) {
					temp[key] = scope.clone(obj[key]);
				}
				return temp;
			};
		}
	};
});

fmfdirectives.config(['ngQuillConfigProvider', function (ngQuillConfigProvider) {
	ngQuillConfigProvider.set();
}]);

fmfdirectives.controller('AppCtrl', [
	'$scope',
	'$timeout',
	function($scope, $timeout) {
		$scope.title = '';
		$scope.changeDetected = false;

		$scope.editorCreated = function (editor) {
			
		};
		$scope.contentChanged = function (editor, html, text) {
			  $scope.changeDetected = true;
			
		};
	}
]);
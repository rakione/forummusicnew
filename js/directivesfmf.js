var fmfdirectives = angular.module('fmfdirectives', ['ngQuill']);

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
				console.log(scope.itemlist);
			});
		}
	}
}]);

fmfdirectives.directive('formFmf', [function () {
	return{
		restrict:'E',
		scope:{
			form:"=",
			dataform:"=",
			send:"&onSend"
        },
		templateUrl:pack.sdurl+"/js/templatesjs/formfmf.html",
		link: function (scope, iElement, iAttrs) {
			scope.elemform={};
			
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
				scope.ngModel.push("");
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
			console.log(scope.list);
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
			scope.modalShown = false;
			scope.toggleModal = function(){
				scope.modalShown = !scope.modalShown;
			}
			scope.updatedate = function (params) {
				
				if(Array.isArray(scope.ngModel)){
					scope.ngModel.push(params);	
					console.log(scope.ngModel);
				}else{
					scope.ngModel=[];
					scope.ngModel.push(params);
					console.log(scope.ngModel);
				}
				scope.modalShown = !scope.modalShown;
			}
			scope.delete = function(index){
				scope.ngModel.splice(index,1);
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
			scope.hideModal = function() {
				scope.show = false;
			};
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
			console.log(editor);
		};
		$scope.contentChanged = function (editor, html, text) {
			  $scope.changeDetected = true;
			console.log('editor: ', editor, 'html: ', html, 'text:', text);
		};
	}
]);
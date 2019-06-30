var fmfdirectives = angular.module('fmfdirectives', ['ngQuill']);

fmfdirectives.directive('tableFmf', [function () {
	return{
		restrict:'E',
		scope:{
            "headerlist":"=",
			"list":"=",
			"delete":"&onDelete",
			"edit":"&onEdit"
        },
		templateUrl:pack.sdurl+"/js/templatesjs/tablefmf.html",
		link: function (scope, iElement, iAttrs) {
			scope.itemlist = [];
			scope.$watch('list', function(newValue, oldValue) {
				if (newValue === oldValue) {
				  return;
				}
				scope.list.forEach(element => {
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
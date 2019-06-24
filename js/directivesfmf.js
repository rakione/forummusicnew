var fmfdirectives = angular.module('fmfdirectives', []);

fmfdirectives.directive('tableFmf', [function () {
	return{
		restrict:'E',
		scope:{
            "headerlist":"=",
			"list":"=",
			"delete":"&onDelete",
			"edit":"&onEdit"
        },
		templateUrl:"https://forumnew.wpengine.com/wp-content/themes/forumtravel/js/templatesjs/tablefmf.html",
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

var firebaseConfig = {
    apiKey: "AIzaSy Ae9bLQazcjRNSe1Xu8KxiSv_uaEFwkjd4",
    authDomain: "reservation-travel.firebaseapp.com",
    databaseURL: "https://reservation-travel.firebaseio.com",
    projectId: "reservation-travel",
    storageBucket: "reservation-travel.appspot.com",
    messagingSenderId: "960239215457",
    appId: "1:960239215457:web:b471123486e00585"
};

firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

var fmfreservation = angular.module('fmfreservation', ['ngAnimate', 'ngSanitize','ui.bootstrap','fmfdirectives']);

fmfreservation.controller('packagectrl', ['$scope','$http','$sce','$q','$window', function($scope,$http,$sce,$q,$window) {
    
    $scope.package=[];
    
    $scope.list=[
        {value:"id",name:"ID"},
        {value:"title",name:"Title"},
        {value:"extract",name:"Extract"},
        {value:"locking_day",name:"Locking Day"},
        {value:"overnight",name:"Overnight"}
    ];

    $scope.deletepackage = function(index){
        db.collection("packages").doc($scope.package[index].id).delete().then(function() {
            console.log("Document successfully deleted!");
            $scope.updatetable();
        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });
    }

    $scope.editpackage = function(index){
        console.log(index);
    }

    $scope.updatetable = function(){
        db.collection("packages").get().then((querySnapshot) => {
            $scope.package = [];
            var docs = [];
            querySnapshot.forEach((doc) => {
                var obj = doc.data();
                obj.id = doc.id;
                docs.push(obj);
            });
            $scope.package = angular.copy(docs); 
            $scope.$apply();
        });
    }

}]);

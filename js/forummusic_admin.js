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
        {value:"content",name:"Content"},
        {value:"shortdescription",name:"Short Description"},
        {value:"overnight",name:"Overnight"},
        {value:"onlypark",name:"Only a park"},
        {value:"lockingday",name:"Locking Day"}
    ];

    $scope.formpackage=[
        {type:"text",text:"Title",slug:"title"},
        {type:"textarea",text:"Content",slug:"content"},
        {type:"text",text:"Short description",slug:"shortdescription"},
        {type:"switch",text:"Overnight",slug:"overnight"},
        {type:"switch",text:"Only a park",slug:"onlypark"},
        {type:"text",text:"Locking day",slug:"lockingday"},
        
    ]

    $scope.deletepackage = function(index){
        db.collection("packages").doc($scope.package[index].id).delete().then(function() {
            console.log("Document successfully deleted!");
            $window.location.href = pack.url+"/wp-admin/admin.php?page=packages";
        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });
    }

    $scope.editpackage = function(index){
        $window.location.href = pack.url+"/wp-admin/admin.php?page=packages&action=edit&id="+$scope.package[index].id;
    }

    $scope.getpackage = function(id){
        db.collection("packages").doc(id).get().then(function(doc) {
            if (doc.exists) {
                console.log("Document data:", doc.data());
                $scope.packagedata = doc.data();
                $scope.packagedata.id = doc.id;
                $scope.$apply();
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
    }

    $scope.updatepackage = function(dataform){
        var id = angular.copy(dataform.id);
        console.log(id);
        delete dataform.id;
        console.log(id);
        
        db.collection("packages").doc(id).update(dataform)
        .then(function() {
            alert("Document successfully updated!");
            $window.location.href = pack.url+"/wp-admin/admin.php?page=packages";
        })
        .catch(function(error) {
            // The document probably doesn't exist.
            alert("Error updating document: ", error);
        });
        
    }

    $scope.createpackage = function(dataform) {
        db.collection("packages").add(dataform)
        .then(function(docRef) {
            alert("Document written with ID: ", docRef.id);
        })
        .catch(function(error) {
            alert(error);
        });
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
    /*
    db.collection("packages").add({
        extract: 'Gold-rated performing groups from previous festival seasons are invited to perform in a "best of the best" competition. including lodging and breakfast.',
        overnight: true,
        locking_day: 60
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
    */




}]);

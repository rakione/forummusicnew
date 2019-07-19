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

fmfreservation.controller('reservationctrl', ['$scope','$http','$sce','$q','$window', function($scope,$http,$sce,$q,$window) {
    $scope.users = [];
    $scope.packages = [];

    $http({
        method : 'POST',
        url : pack.ajaxurl,
        data:  jQuery.param({'action':'users'}),
        headers : {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}  
    }).success(function(res){ 
        $scope.users = angular.copy(res);
    }).error(function(error){
        alert(error);
    });

    db.collection("packages").get().then((querySnapshot) => {    
        var docs = [];
        querySnapshot.forEach((doc) => {
            var obj = doc.data();
            obj.id = doc.id;
            docs.push(obj);
        });
        $scope.packages = angular.copy(docs); 
        $scope.$apply();
    });
    
}]);


fmfreservation.controller('packagectrl', ['$scope','$http','$sce','$q','$window', function($scope,$http,$sce,$q,$window) {
    
    $scope.package=[];
    
    $scope.list=[
        {value:"id",name:"ID"},
        {value:"title",name:"Title"},
        {value:"content",name:"Content"},
        {value:"shortdescription",name:"Short Description"},
        {value:"overnight",name:"Overnight"},
        {value:"onlypark",name:"Only a park"},
        {value:"lockingday",name:"Locking Day"},
        {value:"dates",name:"dates"}
    ];
    
    $scope.formpackage=[
        {type:"text",text:"Title",slug:"title"},
        {type:"textarea",text:"Content",slug:"content"},
        {type:"text",text:"Short description",slug:"shortdescription"},
        {type:"switch",text:"Overnight",slug:"overnight"},
        {type:"switch",text:"Only a park",slug:"onlypark"},
        {type:"text",text:"Locking day",slug:"lockingday"}
    ]

    $scope.deletepackage = function(index){
        db.collection("packages").doc($scope.package[index].id).delete().then(function() {
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
                $scope.packagedata = doc.data();
                $scope.packagedata.id = doc.id;
                $scope.$apply();
            } else {
                console.log("No such document!");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
    }

    $scope.updatepackage = function(dataform){
        var id = angular.copy(dataform.id);
        delete dataform.id;
        
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
            $window.location.href = pack.url+"/wp-admin/admin.php?page=packages";
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

    $scope.getlocation = function(){
        db.collection("locations").get().then((querySnapshot) => {
            var docs = [];
            querySnapshot.forEach((doc) => {
                var obj = doc.data();
                obj.id = doc.id;
                docs.push(obj);
            });
            var locations = {
                type:"multicheckbox",
                text:"Locations",slug:"locations",
                list:angular.copy(docs)
            }
            $scope.formpackage.push(locations);
            console.log($scope.formpackage);
            $scope.$apply();
        });
    }
    $scope.getlocation();
}]);

fmfreservation.controller('locationctrl', ['$scope','$http','$sce','$q','$window', function($scope,$http,$sce,$q,$window) {
    
    $scope.location = [];
    $scope.parks = [];
    
    $scope.list=[
        {value:"id",name:"ID"},
        {value:"title",name:"Title"},
        {value:"dates",name:"dates"}
    ];

    $scope.formlocation=[
        {type:"text",text:"Title",slug:"title"},
        {type:"tabledatafmf",
            text:"Dates",slug:"dates",headerlist:[
                {value:"title",name:"Title"},
                {value:"date",name:"Date"},
                {value:"amorpm",name:"AM or PM"},
                {value:"addinfo",name:"Additional Information"},
                {value:"public",name:"Public"},
                {value:"allowres",name:"Allow Reservation"},
                {value:"forumsa",name:"Forum Select Availble"},
                {value:"lockingday",name:"Locking Day"},
                {value:"unselectable",name:"Unselectable"},
                {value:"tdbboolean",name:"show TDB text"},
                {value:"tdbtext",name:"TDB text"}
            ],
            template:pack.sdurl+"/js/templatesjs/formdatefmf.html",
            form:[
                {type:"text",text:"Title",slug:"title"},
                {type:"datepicker",text:"Date",slug:"date"},
                {type:"select",text:"AM or PM",slug:"amorpm",list:[{value:"am",text:"AM"},{value:"pm",text:"PM"}]},
                {type:"text",text:"Additional Information",slug:"addinfo"},
                {type:"switch",text:"Public",slug:"public"},
                {type:"switch",text:"Allow Reservation",slug:"allowres"},
                {type:"switch",text:"Forum Select Availble",slug:"forumsa"},
                {type:"text",text:"Locking Day",slug:"lockingday"},
                {type:"switch",text:"Unselectable",slug:"unselectable"},
                {type:"switch",text:"show TDB text",slug:"tdbboolean"},
                {type:"text",text:"TDB text",slug:"tdbtext"}
            ]
        }
    ]

    $scope.deletelocation = function(index){
        db.collection("locations").doc($scope.location[index].id).delete().then(function() {
            console.log("Document successfully deleted!");
            $window.location.href = pack.url+"/wp-admin/admin.php?page=locations";
        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });
    }

    $scope.editlocation = function(index){
        $window.location.href = pack.url+"/wp-admin/admin.php?page=locations&action=edit&id="+$scope.location[index].id;
    }

    $scope.getlocation = function(id){
        db.collection("locations").doc(id).get().then(function(doc) {
            if (doc.exists) {
                $scope.locationdata = doc.data();
                $scope.locationdata.id = doc.id;
                $scope.$apply();
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
    }

    $scope.updatelocation = function(dataform){
        var id = angular.copy(dataform.id);
        delete dataform.id;
        
        db.collection("locations").doc(id).update(dataform)
        .then(function() {
            alert("Document successfully updated!");
            $window.location.href = pack.url+"/wp-admin/admin.php?page=locations";
        })
        .catch(function(error) {
            // The document probably doesn't exist.
            alert("Error updating document: ", error);
        });
        
    }

    $scope.createlocation = function(dataform) {
        db.collection("locations").add(dataform)
        .then(function(docRef) {
            alert("Document written with ID: ", docRef.id);
            $window.location.href = pack.url+"/wp-admin/admin.php?page=locations";
        })
        .catch(function(error) {
            alert(error);
        });
    }

    $scope.updatetable = function(){
        db.collection("locations").get().then((querySnapshot) => {
            $scope.location = [];
            var docs = [];
            querySnapshot.forEach((doc) => {
                var obj = doc.data();
                obj.id = doc.id;
                docs.push(obj);
            });
            $scope.location = angular.copy(docs); 
            $scope.$apply();
        });
    }
    $scope.getparks = function(){
        db.collection("parks").get().then((querySnapshot) => {
            var docs = [];
            querySnapshot.forEach((doc) => {
                var obj = doc.data();
                obj.id = doc.id;
                docs.push(obj);
            });
            var parks = {
                type:"multicheckbox",
                text:"Parks",slug:"parks",
                list:angular.copy(docs)
            }
            $scope.formlocation.push(parks);
            $scope.$apply();
        });
    }
    $scope.getparks();
}]);

fmfreservation.controller('parkctrl', ['$scope','$http','$sce','$q','$window', function($scope,$http,$sce,$q,$window) {
    
    $scope.park=[];
    
    $scope.list=[
        {name:"ID",value:"id"},
        {name:"Title",value:"title"},
        {name:"Price per Student",value:"ppstudent"},
        {name:"Price Per Chaperone",value:"ppchaperone"},
        {name:"Additional Information",value:"addinfo"},
        {name:"Special Package",value:"specialpackage"},
        {name:"Unselectable",value:"unselectable"},
        {name:"Add text area",value:"addtext"},
        {name:"Meal option prices",value:"mealsprice"}
    ];

    $scope.formpark=[
        {type:"text",text:"Title",slug:"title"},
        {type:"text",text:"Price per Student",slug:"ppstudent"},
        {type:"text",text:"Price Per Chaperone",slug:"ppchaperone"},
        {type:"textarea",text:"Additional Information",slug:"addinfo"},
        {type:"switch",text:"Special Package",slug:"specialpackage"},
        {type:"switch",text:"Unselectable",slug:"unselectable"},
        {type:"switch",text:"Add text area",slug:"addtext"},
        {type:"multitextinput",text:"Meal option prices",slug:"mealsprice"}
    ]

    $scope.deletepark = function(index){
        db.collection("parks").doc($scope.park[index].id).delete().then(function() {
            $window.location.href = pack.url+"/wp-admin/admin.php?page=parks";
        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });
    }

    $scope.editpark = function(index){
        $window.location.href = pack.url+"/wp-admin/admin.php?page=parks&action=edit&id="+$scope.park[index].id;
    }

    $scope.getpark = function(id){
        db.collection("parks").doc(id).get().then(function(doc) {
            if (doc.exists) {
                $scope.parkdata = doc.data();
                $scope.parkdata.id = doc.id;
                $scope.$apply();
            } else {
                console.log("No such document!");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
    }

    $scope.updatepark = function(dataform){
        var id = angular.copy(dataform.id);
        delete dataform.id;
        
        db.collection("parks").doc(id).update(dataform)
        .then(function() {
            alert("Document successfully updated!");
            $window.location.href = pack.url+"/wp-admin/admin.php?page=parks";
        })
        .catch(function(error) {
            // The document probably doesn't exist.
            alert("Error updating document: ", error);
        });
    }

    $scope.createpark = function(dataform) {
        db.collection("parks").add(dataform)
        .then(function(docRef) {
            alert("Document written with ID: ", docRef.id);
            $window.location.href = pack.url+"/wp-admin/admin.php?page=parks";
        })
        .catch(function(error) {
            alert(error);
        });
    }

    $scope.updatetable = function(){
        db.collection("parks").get().then((querySnapshot) => {
            $scope.park = [];
            var docs = [];
            querySnapshot.forEach((doc) => {
                var obj = doc.data();
                obj.id = doc.id;
                docs.push(obj);
            });
            $scope.park = angular.copy(docs); 
            $scope.$apply();
        });
    }
}]);
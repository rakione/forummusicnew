<div class="wrap" ng-app = "fmfreservation" ng-controller = "packagectrl">
    <h1 class="wp-heading-inline"> Packages</h1>
    <table-fmf headerlist="list" list="package" on-delete="deletepackage(index)" on-edit="editpackage(index)" ng-init="updatetable()" ></table-fmf>
</div>

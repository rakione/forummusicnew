<?php
    switch ($_GET['action']) {
        case 'edit':
            ?>
            <div class="wrap" ng-app = "fmfreservation" ng-controller = "locationctrl" ng-init="getlocation('<?php echo $_GET['id']?>')">
                <h1 class="wp-heading-inline"> Location edit</h1>
                <form-fmf form="formlocation" on-send="updatelocation(dataform)" dataform="locationdata" ></form-fmf>
            </div>
            <?php    
            break;

        case 'create':
            ?>
            <div class="wrap" ng-app = "fmfreservation" ng-controller = "locationctrl">
                <h1 class="wp-heading-inline"> Location New</h1>
                <form-fmf form="formlocation" on-send="createlocation(dataform)"></form-fmf>
            </div>
            <?php    
            break;
        
        default:
            ?>
            <div class="wrap" ng-app = "fmfreservation" ng-controller = "locationctrl">
                <h1 class="wp-heading-inline">Locations</h1>
                <a href="<?php echo get_bloginfo('url')."/wp-admin/admin.php?page=locations&action=create"?>" class="page-title-action">Add New</a>
                <table-fmf headerlist="list" ng-model="location" on-delete="deletelocation(index)" on-edit="editlocation(index)" ng-init="updatetable()" if-interactive="false"></table-fmf>
            </div>
            <?php 
            break;
    } 
?>


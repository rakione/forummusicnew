<?php
    switch ($_GET['action']) {
        case 'edit':
            ?>
            <div class="wrap" ng-app = "fmfreservation" ng-controller = "packagectrl" ng-init="getpackage('<?php echo $_GET['id']?>')">
                <h1 class="wp-heading-inline"> Package edit</h1>
                <form-fmf form="formpackage" on-send="updatepackage(dataform)" dataform="packagedata" ></form-fmf>
            </div>
            <?php    
            break;

        case 'create':
            ?>
            <div class="wrap" ng-app = "fmfreservation" ng-controller = "packagectrl">
                <h1 class="wp-heading-inline"> Package New</h1>
                <form-fmf form="formpackage" on-send="createpackage(dataform)"></form-fmf>
            </div>
            <?php    
            break;
        
        default:
            ?>
            <div class="wrap" ng-app = "fmfreservation" ng-controller = "packagectrl">
                <h1 class="wp-heading-inline">Packages</h1>
                <a href="<?php get_bloginfo('url')."wp-admin/admin.php?page=reservation_fmf&action=create"?>" class="page-title-action">Add New</a>
                <table-fmf headerlist="list" list="package" on-delete="deletepackage(index)" on-edit="editpackage(index)" ng-init="updatetable()" ></table-fmf>
            </div>
            <?php 
            break;
    } 
?>


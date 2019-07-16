<?php
    switch ($_GET['action']) {
        case 'edit':
            ?>
            <div class="wrap" ng-app = "fmfreservation" ng-controller = "parkctrl" ng-init="getpark('<?php echo $_GET['id']?>')">
                <h1 class="wp-heading-inline">Park edit</h1>
                <form-fmf form="formpark" on-send="updatepark(dataform)" dataform="parkdata" ></form-fmf>
            </div>
            <?php    
            break;

        case 'create':
            ?>
            <div class="wrap" ng-app = "fmfreservation" ng-controller = "parkctrl">
                <h1 class="wp-heading-inline">New Park</h1>
                <form-fmf form="formpark" on-send="createpark(dataform)"></form-fmf>
            </div>
            <?php    
            break;
        
        default:
            ?>
            <div class="wrap" ng-app = "fmfreservation" ng-controller = "parkctrl">
                <h1 class="wp-heading-inline">Parks</h1>
                <a href="<?php echo get_bloginfo('url')."/wp-admin/admin.php?page=parks&action=create"?>" class="page-title-action">Add New</a>
                <table-fmf headerlist="list" ng-model="park" on-delete="deletepark(index)" on-edit="editpark(index)" ng-init="updatetable()" ></table-fmf>
            </div>
            <?php 
            break;
    } 
?>


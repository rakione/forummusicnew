<?php
    switch ($_GET['action']) {
        case 'edit':
            ?>
            
            <?php    
            break;

        case 'create':
            ?>
            <div class="wrap" ng-app = "fmfreservation" ng-controller = "reservationctrl">
                <h1 class="wp-heading-inline">New Reservation</h1>
                <form-reservation-fmf 
                    users="users"
                    packages="packages"
                    >
                </form-reservation-fmf> 
            </div>
            <?php    
            break;
        default:
            ?>
            <?php 
            break;
    } 
?>


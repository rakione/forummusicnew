<?php 
add_action( 'admin_menu', 'add_menu_items_reservation' );

function add_menu_items_reservation(){

    $hook = add_menu_page(
        'Reservations',
        'Reservations',
        'manage_options',
        'reservation_fmf',
        'reservation',
        'dashicons-palmtree',
        6
    );
    add_submenu_page( 'reservation_fmf', 'Packages', 'Packages','manage_options','packages', 'packages_fmf_func');
    add_submenu_page( 'reservation_fmf', 'Locations', 'Locations','manage_options','locations', 'locations_fmf_func');
    add_submenu_page( 'reservation_fmf', 'Parks', 'Parks','manage_options','parks', 'parks_fmf_func');
}

function reservation(){

}

function packages_fmf_func(){
    include "package_fmf.php";
}

function locations_fmf_func(){
    include "location_fmf.php";
}

function parks_fmf_func(){
    include "park_fmf.php";
}


?>
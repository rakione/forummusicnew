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
    add_submenu_page( 'reservation_fmf', 'Package', 'Package','manage_options','packages', 'package_fmf_func');
    //add_submenu_page( 'reservation_fmf', 'Hotel', 'Hotel','manage_options','hotel', 'hotel_func');
}

function reservation(){

}

function package_fmf_func(){
    include "package_fmf.php";
}

/*
function roomlist_func(){
    if(!empty( $_GET["reservationid"]) && isset($_GET["reservationid"])){
        include "templates/room_list.php";
    }else{
        //include "templates/schools.php";
    }
}

function hotel_func(){
    include "templates/hotel.php";
}
*/
?>
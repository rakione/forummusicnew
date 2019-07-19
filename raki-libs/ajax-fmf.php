<?php 

add_action( 'wp_ajax_users', 'users_callback' );

function users_callback(){
    if(current_user_can('administrator')){
        $users = get_users();
        die(json_encode($users));
    }
}


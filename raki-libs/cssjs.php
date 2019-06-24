<?php

/***************************
*
* Javascript & ccs dashboard
*
***/

function forummusic_css_admin() {
	if(get_current_screen()->base=="toplevel_page_reservation_fmf"  || get_current_screen()->base=="reservations_page_packages"){	
		wp_register_style( 'bootstrap', "https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css", false, '3.3.6' );
		wp_register_style('datepicker', get_bloginfo('stylesheet_directory')."/libs-raki/js/datepicker/css/datepicker.css", false, '1.0.0');
		wp_register_style('packsmusicadmin', get_bloginfo('stylesheet_directory')."/libs-raki/css/packsmusicadmin.css", false, '1.0.0');
        wp_enqueue_style( 'bootstrap' );
        wp_enqueue_style('datepicker');
        wp_enqueue_style('packsmusicadmin');
        
	}
}

function forummusic_js_admin() {
	
	if(get_current_screen()->base=="toplevel_page_reservation_fmf" || get_current_screen()->base=="reservations_page_packages" ){
	    wp_register_script("firebase-app","https://www.gstatic.com/firebasejs/6.1.0/firebase-app.js", false, "1");
	    wp_register_script("firebase-firestore","https://www.gstatic.com/firebasejs/6.1.0/firebase-firestore.js", false, "1");
        wp_register_script('angularjs', "https://ajax.googleapis.com/ajax/libs/angularjs/1.5.8/angular.min.js", false, "1");
        wp_register_script('angular-animate', "https://ajax.googleapis.com/ajax/libs/angularjs/1.5.8/angular-animate.js", false, "1");
        wp_register_script('angular-sanitize', "https://ajax.googleapis.com/ajax/libs/angularjs/1.5.8/angular-sanitize.js", false, "1");
        wp_register_script('angular-ui-bootstrap', "https://cdnjs.cloudflare.com/ajax/libs/angular-ui-bootstrap/2.2.0/ui-bootstrap-tpls.min.js", false, "1");
        wp_register_script('directivesfmf', get_bloginfo('stylesheet_directory')."/js/directivesfmf.js", false);
        wp_register_script('forummusic_admin', get_bloginfo('stylesheet_directory')."/js/forummusic_admin.js", false);
        wp_enqueue_script('firebase-app');
        wp_enqueue_script('firebase-firestore');
        wp_enqueue_script('angularjs');
        wp_enqueue_script('angular-animate');
        wp_enqueue_script('angular-sanitize');
        wp_enqueue_script('angular-ui-bootstrap');
        wp_enqueue_script('directivesfmf');
        wp_enqueue_script('forummusic_admin');
    }

}

add_action( 'admin_enqueue_scripts', 'forummusic_css_admin' );
add_action( 'admin_enqueue_scripts', 'forummusic_js_admin' );
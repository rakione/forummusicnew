<?php

/***************************
*
* Javascript & ccs dashboard
*
***/

function forummusic_css_admin() {
	if(get_current_screen()->base=="toplevel_page_reservation_fmf"  || 
    get_current_screen()->base=="reservations_page_packages" ||
    get_current_screen()->base=="reservations_page_locations" ||
    get_current_screen()->base=="reservations_page_parks"
        ){	
		wp_register_style( 'bootstrap', "https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css", false, '3.3.6' );
        wp_register_style('quill_snow', "https://cdn.quilljs.com/1.3.6/quill.snow.css", false, '1.0.0');
        wp_register_style('quill_bubble', "https://cdn.quilljs.com/1.3.6/quill.bubble.css", false, '1.0.0');
        wp_register_style('font-awesome', "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.8.2/css/all.css", false, '1.0.0');
        wp_register_style('style', get_bloginfo('stylesheet_url'), false, '1.0.0');
        wp_enqueue_style( 'bootstrap' );
        wp_enqueue_style('quill_snow');
        wp_enqueue_style('quill_bubble');
        wp_enqueue_style('font-awesome');
        wp_enqueue_style('style');        
	}
}

function forummusic_js_admin() {
    
    if(get_current_screen()->base=="toplevel_page_reservation_fmf"  || 
    get_current_screen()->base=="reservations_page_packages" ||
    get_current_screen()->base=="reservations_page_locations" ||
    get_current_screen()->base=="reservations_page_parks"
    ){
	    wp_register_script("firebase-app","https://www.gstatic.com/firebasejs/6.1.0/firebase-app.js", false, "1");
	    wp_register_script("firebase-firestore","https://www.gstatic.com/firebasejs/6.1.0/firebase-firestore.js", false, "1");
        wp_register_script('angularjs', "https://ajax.googleapis.com/ajax/libs/angularjs/1.5.8/angular.min.js", false, "1");
        wp_register_script('angular-animate', "https://ajax.googleapis.com/ajax/libs/angularjs/1.5.8/angular-animate.js", false, "1");
        wp_register_script('angular-sanitize', "https://ajax.googleapis.com/ajax/libs/angularjs/1.5.8/angular-sanitize.js", false, "1");
        wp_register_script('angular-ui-bootstrap', "https://cdnjs.cloudflare.com/ajax/libs/angular-ui-bootstrap/2.2.0/ui-bootstrap-tpls.min.js", false, "1");        
        wp_register_script('quill', "https://cdn.quilljs.com/1.2.0/quill.js", false, "1");
        wp_register_script('ng-quill', "https://cdnjs.cloudflare.com/ajax/libs/ng-quill/2.2.1/ng-quill.min.js", false);
        wp_register_script('directivesfmf', get_bloginfo('stylesheet_directory')."/js/directivesfmf.js", false);
        wp_register_script('forummusic_admin', get_bloginfo('stylesheet_directory')."/js/forummusic_admin.js", false);
        wp_enqueue_script('firebase-app');
        wp_enqueue_script('firebase-firestore');
        wp_enqueue_script('angularjs');
        wp_enqueue_script('angular-animate');
        wp_enqueue_script('angular-sanitize');
        wp_enqueue_script('angular-ui-bootstrap');
        wp_enqueue_script('quill');
        wp_enqueue_script('ng-quill');
        wp_enqueue_script('directivesfmf');
        wp_enqueue_script('forummusic_admin');

        wp_localize_script(
            'directivesfmf',
            'pack',
            array( 
                'ajaxurl' => admin_url( 'admin-ajax.php' ) ,
                'sdurl' => get_bloginfo('stylesheet_directory'),
                'url' => get_bloginfo('url')
            ) 
        );
    }

}

add_action( 'admin_enqueue_scripts', 'forummusic_css_admin' );
add_action( 'admin_enqueue_scripts', 'forummusic_js_admin' );
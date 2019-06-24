<?php
error_reporting(E_ALL);

class ReservationForum{
    
    public static $single_instance = null;

    public function __construct(){
        require get_template_directory().'/raki-libs/reservation-fmf/render.php';         
    }

    public function init(){
        if ( null === self::$single_instance ) {
			self::$single_instance = new self();
		}

		return self::$single_instance;

    }

}
if (is_admin()){
    ReservationForum::init();
}


?>
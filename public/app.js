'use strict';

var app = angular.module('meanApp', ['ngSanitize', 'toggle-switch', 'ngRoute', 'UsersModule', 'SliderModule', 'AlbumsModule', 'ContactModule']);

app.config(['$compileProvider', function ($compileProvider) {
	$compileProvider.debugInfoEnabled(false);
}]);

app.run(['$rootScope', '$location', '$document', '$route',function($rootScope, $location, $document, $route) {
    $rootScope.user = false;
    $rootScope.userLogged = null;
    $rootScope.contact = null;

    switch($location.url()) {
	    case '/':
	    	$('#inicio').addClass('active');
	        $('slider').show();
	        $('#layerslider').layerSlider('start'); 
			$('#layerslider').layerSlider('next');
	        break;
	    case '':
	    	$('#inicio').addClass('active');
	        $('slider').show();
	        $('#layerslider').layerSlider('start'); 
			$('#layerslider').layerSlider('next');
	        break;
	    case '/albums/15':
			$('#15').addClass('active');
	        $('#layerslider').layerSlider('stop'); 
	        $('slider').hide();
	        break;	
		case '/albums/bodas':
			$('#boda').addClass('active');
	        $('#layerslider').layerSlider('stop'); 
	        $('slider').hide();
	        break;
		case '/albums/otros-eventos':
			$('#otro').addClass('active');
	        $('#layerslider').layerSlider('stop'); 
	        $('slider').hide();
			break;
		case '/covers/edit':
			$('#inicio').addClass('active');
	        $('#layerslider').layerSlider('stop'); 
	        $('slider').hide();
			break;	
		case '/contact':
			$('#contacto').addClass('active');
	        $('#layerslider').layerSlider('stop'); 
	        $('slider').hide();
			break;
		case '/login':
	        $('#layerslider').layerSlider('stop'); 
	        $('slider').hide();
			break;	
	    default:
	    	$location.path('/');  
	};
	
	$document.ready(function() {
	    $document.on('click','#inicio a',function(){
	        $('#layerslider').layerSlider('start');
	        $('#layerslider').layerSlider('next');
	        $('slider').show();
	        return true;        
	    });
	    $document.on('click','#15 a',function(){
	        $('#inicio').removeClass('active');
	        $('#layerslider').layerSlider('stop'); 
	        $('slider').hide();
	        return true;        
	    });
	    $document.on('click','#boda a',function(){
	        $('#inicio').removeClass('active');
	        $('#layerslider').layerSlider('stop'); 
	        $('slider').hide();
	        return true;        
	    });
	    $document.on('click','#otro a',function(){
	        $('#inicio').removeClass('active');
	        $('#layerslider').layerSlider('stop'); 
	        $('slider').hide();
	        return true;        
	    });
	    $document.on('click','#contacto a',function(){
	        $('#inicio').removeClass('active');
	        $('#layerslider').layerSlider('stop'); 
	        $('slider').hide();
	        return true;        
	    });
	    $document.on('click','#edit-covers a',function(){
	        $('#inicio').removeClass('active');
	        $('#layerslider').layerSlider('stop'); 
	        $('slider').hide();
	        return true;        
	    });
	});

}]);






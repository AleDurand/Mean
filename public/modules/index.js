$(document).on('ready',function(){
     $(document).on('click','#inicio a',function(){
        $('a.ls-nav-start').click();
        $('slider').show();
        localStorage.setItem('active','inicio');
        return true;        
    });
    $(document).on('click','#15 a',function(){
        $('#inicio').removeClass('active');
        $('a.ls-nav-stop').click();
        $('slider').hide();
        localStorage.setItem('active','15');
        return true;        
    });
    $(document).on('click','#boda a',function(){
        $('#inicio').removeClass('active');
        $('a.ls-nav-stop').click();
        $('slider').hide();
        localStorage.setItem('active','boda');
        return true;        
    });
    $(document).on('click','#otro a',function(){
        $('#inicio').removeClass('active');
        $('a.ls-nav-stop').click();
        $('slider').hide();
        localStorage.setItem('active','otro');
        return true;        
    });
    $(document).on('click','#contacto a',function(){
        $('a.ls-nav-stop').click();
        $('slider').hide();
        localStorage.setItem('active','contacto');
        return true;        
    });
    $(document).on('click','#edit-covers a',function(){
        $('a.ls-nav-stop').click();
        $('slider').hide();
        return true;        
    });
    jQuery(window).load(function() {
        var active = localStorage.getItem('active');
        $('#'+active).addClass('active');
    });
});
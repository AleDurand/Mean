$(document).on('ready',function(){
     $(document).on('click','#inicio a',function(){
        $('a.ls-nav-start').click();
        $('#layerslider').show();
        return true;        
    });
    $(document).on('click','#15 a',function(){
        $('#inicio').removeClass('active');
        $('a.ls-nav-stop').click();
        $('#layerslider').hide();
        return true;        
    });
    $(document).on('click','#boda a',function(){
        $('#inicio').removeClass('active');
        $('a.ls-nav-stop').click();
        $('#layerslider').hide();
        return true;        
    });
    $(document).on('click','#otro a',function(){
        $('#inicio').removeClass('active');
        $('a.ls-nav-stop').click();
        $('#layerslider').hide();
        return true;        
    });
    $(document).on('click','#contacto a',function(){
        $('a.ls-nav-stop').click();
        $('#layerslider').hide();
        return true;        
    });
})
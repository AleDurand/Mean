$.fn.flexymenu = function (options) {
    var settings = {
        speed: 300,     				// dropdown speed (ms)
        type: "horizontal",     	// menu type arrangement
        align: "right",    			// menu alignment (horizontal type)
        indicator: true     			// indicator that indicates a submenu
    }
    $.extend(settings, options);

    var bigScreen = false;

    if (settings.type == "vertical") {
        $(".flexy-menu").addClass("vertical");
        if (settings.align == "right") {
            $(".flexy-menu").addClass("right");
        }

    }

    if (settings.indicator == true) {
        $(".flexy-menu").find("li").each(function () {
            if ($(this).children("ul").length > 0) {
                $(this).append("<span class='indicator'>+</span>");
            }
        });
    }

    $(".flexy-menu").prepend("<li class='showhide'><span class='title'>MENU</span><span class='icon'><em></em><em></em><em></em><em></em></span></li>");

    screenSize();

    $(window).resize(function () {
        screenSize();
    });

    function screenSize() {
        $(".flexy-menu").find("li, a").unbind();
        $(".flexy-menu").find("ul").hide(0);
        if (window.innerWidth <= 984) {
            showCollapse();
            bindClick();
            if (bigScreen == true) {
                rightAlignMenu();
                bigScreen = false;
            }
        }
        else {
            hideCollapse();
            bindHover();
            bindClick();
            if (settings.type == "horizontal" && settings.align == "right" && bigScreen == false) {
                rightAlignMenu();
                bigScreen = true;
            }
        }
    }

    function bindHover() {
        $(".flexy-menu li").bind("mouseover", function () {
            $(this).children("ul").stop(true, true).fadeIn(settings.speed);
        }).bind("mouseleave", function () {
            $(this).children("ul").stop(true, true).fadeOut(settings.speed);
        });
    }

    function bindClick() {
        $(".flexy-menu li:not(.showhide)").each(function () {
            if ($(this).children("ul").length > 0) {
                $(this).children("a").bind("click", function () {
                    if ($(this).siblings("ul").css("display") == "none") {
                        $(this).siblings("ul").slideDown(300);
                    }
                    else {
                        $(this).siblings("ul").slideUp(300);
                    }
                });
            }
        });

        $('.flexy-menu li').on('click', function () {
            $('.flexy-menu li.active').removeClass('active');
            $(this).addClass('active');
        });
    }

    function showCollapse() {
        $(".flexy-menu > li:not(.showhide)").hide(0);
        $(".flexy-menu > li.showhide").show(0);
        $(".flexy-menu > li.showhide").bind("click", function () {
            if ($(".flexy-menu > li").is(":hidden")) {
                $(".flexy-menu > li").slideDown(300);
            }
            else {
                $(".flexy-menu > li:not(.showhide)").slideUp(300);
                $(".flexy-menu > li.showhide").show(0);
            }
        });
    }

    function hideCollapse() {
        $(".flexy-menu > li").show(0);
        $(".flexy-menu > li.showhide").hide(0);
    }

    function rightAlignMenu() {
        $(".flexy-menu > li").addClass("right");
        var menuWidth = $(".flexy-menu").width();
        var menuItems = $(".flexy-menu").children("li");
        $(".flexy-menu").children("li:not(.showhide)").detach();
        for (var i = menuItems.length; i >= 1; i--) {
            $(".flexy-menu").append(menuItems[i]);
        }
    }
}








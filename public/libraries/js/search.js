$(document).on('click', '#search-nav button[type="reset"]', function (event) {
    $('.search-field').val('');
    $('.search-field').hide();
    $('#search-nav').removeClass('active');
    $('#search-nav button[type="reset"]').hide();
});

function openSearch() {
    $('#search-nav').addClass('active');
    $('.search-field').show();
    $('.search-field').css({ display: "inline-flex" });
    $('#search-nav button[type="reset"]').show();
    $('#search-nav button[type="reset"]').css({ display: "inline-flex" });
}

// Show Search if form is not active or input search empty
$(document).on('click', '#search-nav button[type="submit"]', function (event) {
    if (!$("#search-nav").hasClass("active") || $('.search-field').val() === '') {
        event.preventDefault();
        openSearch();
    }
});
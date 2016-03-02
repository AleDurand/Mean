$(document).on('click', '#search-nav button[type="reset"]', function (event) {
    $('.search-field').val('');
    $('.search-field').hide();
    $('#search-nav').removeClass('active');
    $('#search-nav button[type="reset"]').hide();
});

function openSearch() {
    $('#search-nav').addClass('active');
    $('.search-field').show();
    $('#search-nav button[type="reset"]').show();
}

// Show Search if form is not active or input search empty
$(document).on('click', '#search-nav button[type="submit"]', function (event) {
    if (!$("#search-nav").hasClass("active") || $('.search-field').val() === '') {
        event.preventDefault();
        openSearch();
    }
});
/*-----------------------------------------------------------------------------------*/
/* MAIN
/*-----------------------------------------------------------------------------------*/
$(document).ready(function () {
    $('[data-bs-toggle="tooltip"]').tooltip();
 
    $('.toggle-sidebar,.bg-overly').on('click', function (e) {
        $('.bg-overly,.toggle-sidebar,body,.main-header').toggleClass('is-visible');
        e.preventDefault();
    });
    $('.filter-btn').on('click', function (e) {
        $('.filter-dropdown').toggleClass('is-open');
        e.preventDefault();
    });

    if ($('.main-header').length) {
        $(window).scroll(function () {
            if (jQuery(this).scrollTop() > 10) {
                $(".main-header").addClass("fixed-header");
            } else {
                $(".main-header").removeClass("fixed-header");
            }
        });
    }
  
    new WOW().init();
});


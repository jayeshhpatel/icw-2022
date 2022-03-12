/******* New Design ******** */

$('[data-toggle="tooltip"]').tooltip({
    container: '.main-content-wrapper',
    boundary: 'window'
});

var t = {duration: 270,easing: "easeOutSine"};
/* main-sidebar */
if ($('.main-dashboard-header').length) {
    $('.main-dashboard-header .bar-icon').click(function(t) {
        $('.main-dashboard-header .bar-icon').toggleClass('toggle');
        $('.main-icon-sidebar').toggleClass('open');
    })    
}

$('body').click(function(e) {
    if ($('.main-icon-sidebar').hasClass('open')) {
        $('.main-icon-sidebar').toggleClass('open')
    }
    if ($('.main-dashboard-header .bar-icon').hasClass('toggle')) {
        $('.main-dashboard-header .bar-icon').toggleClass('toggle');
        $('.main-icon-sidebar').toggleClass('open')
    }
})

$(".input-dropdown .dropdown-menu li .dropdown-item").click(function(){
    $('.input-dropdown .dropdown-menu li .dropdown-item ').removeClass('active');
    $(this).addClass('active');
    $(this).parents(".input-dropdown").find('.dropdown-input span').html($(this).text() );
    $(this).parents(".input-dropdown").find('.dropdown-input span').html($(this).data('value'));
});

if($('.stepflow-content').length) {
    $('.steoflow-steps li').click(function () {
        $('.steoflow-steps li.active').removeClass('active');
        $(this).addClass('active').removeClass('done');
        $(this).prevAll().addClass('done');
        $(this).nextAll().removeClass('done');
    });
    $('.help span').click(function () {
        $(this).addClass('d-none');
        $(this).parents('.step-info').find('#description').removeClass('d-none');
    });
    $('.upload-file').on('click', function() {               
        $(this).hide();
        $('.alert-success').css('display', 'inline-flex');
        $('.btn-action .info').css('display', 'block');
    })
}

$('.btn-hash').bind('click',function(event){
    var $anchor = $(this);
    var $hoffset = '90'//$("#_mainHeader").height();
    $('.btn-hash').removeClass("active-hash");
    $anchor.addClass("active-hash");
    $('html, body').stop().animate({
        scrollTop: $($anchor.attr('href')).offset().top-$hoffset
    }, 1000,'easeInOutExpo');
    event.preventDefault();
});

/* menu-wise scroll body */
if (jQuery('.btn-hash-id').length) {
    jQuery(window).scroll(function() {
        var scrollDistance = jQuery(window).scrollTop();
        jQuery('.btn-hash-id').each(function(i) {
            if (jQuery('.nav-sub-item').length) {
                if (jQuery(this).position().top <= scrollDistance+90) {            
                    var getid = jQuery(this).attr('id');                        
                    jQuery('.nav-sub-item a').removeClass('active-hash');
                    jQuery('.show .nav-sub-item a[href^="#'+getid+'"]').addClass('active-hash');
                }
            }
        });
    }).scroll();
}
var t = {duration: 270,easing: "easeOutSine"};
/* main-sidebar */
if ($('.main-sidebar').length) {
    $(".close-sidebar").click(function(t) {
        $(".main-sidebar").removeClass("open");
        $('body').removeClass ('overflow-hidden');
    })
}
if ($('.website .main-header').length) {
    $(".toggle-sidebar").click(function(t) {
        $(".main-header .navbar-collapse").toggleClass("open");
        if ($('.main-sidebar').length) {
            $('.main-sidebar').toggleClass("open");
        }
        $('body').toggleClass('overflow-hidden');
        $(this).toggleClass('toggle');
    })
    if($('.website .main-header .nav-dropdown').length){
        $(".main-header .nav-dropdown").click(function() {
            $(this).toggleClass('show');
        });
    }
    $(window).scroll(function(){
        if ($(window).scrollTop() >= 10) {
            $('.website .main-header').addClass('bg-white');
        }
        else {
            $('.website .main-header').removeClass('bg-white');
        }
    });
}
jQuery('body').bind('click', function(e) {
    if(jQuery(e.target).closest('.navbar').length == 0) {
        // click happened outside of .navbar, so hide
        var opened = jQuery('.navbar-collapse').hasClass('open');
        if ( opened === true ) {
            jQuery('.navbar-collapse').removeClass('open');
            jQuery('.bar-icon').removeClass('toggle');
            $('body').removeClass('overflow-hidden');
        } 
    }
});
/* WOW Animation - Init */
try{
    new WOW().init();
}
catch(e){
    //
};


$(document).ready(function() {
    $('[data-toggle="tooltip"]').tooltip({
        container: '.content-wrapper'
    });
    var input = $('.form-control');   
    var dropdown_input = $('.customDropdown-input');    
    if(input.length) {
        input.focus(function(){
            $(this).parent('.form-group').addClass('focused').removeClass('has-data');
        });
        input.focusout(function(){
            $(this).parent('.form-group').removeClass('focused');
            if(this.value == "") {
                $(this).parent('.form-group').removeClass('focused');
                $(this).parent('.form-group').removeClass('has-data');
            } else {
                $(this).parent('.form-group').removeClass('focused').addClass('has-data');
            }
        });
    }
    if(dropdown_input.length) {
        dropdown_input.focus(function(){
            $(this).parents('.form-group').addClass('focused').removeClass('has-data');
        });
        dropdown_input.focusout(function(){
            $(this).parents('.form-group').removeClass('focused').addClass('has-data');
            if(this.value == "") {
                $(this).parents('.form-group').removeClass('focused');
            } else {
                $(this).parents('.form-group').removeClass('focused').addClass('has-data');
            }
        });
    }
    
    if($('.paymeny-method-type').length) {
        $(".paymeny-method-type .method-type").on('click', function() {
            var type = $(this).data('method');
            $(".form-block .paymentForm:not('.d-none')").stop().fadeOut('fast', function() {
                $(this).addClass('d-none');
                $('.paymeny-method-type .method-type').removeClass('active');
                $('.form-block .paymentForm[id="'+type+'"]').fadeIn('fast').removeClass('d-none');
                $('.paymeny-method-type .method-type[data-method="'+type+'"]').addClass('active');
            });
        });
    }

    $(".custom-html-dropdown .dropdown-menu li button").click(function(){
        $('.custom-html-dropdown .dropdown-menu li button').removeClass('active');
        $(this).addClass('active');
        $(this).parents(".custom-html-dropdown").find('.dropdown-input').html($(this).text() );
        $(this).parents(".custom-html-dropdown").find('.dropdown-input').val($(this).data('value'));
    });
    
    $(".custom-html-dropdown .dropdown-menu li .dropdown-item").click(function(){
        $('.custom-html-dropdown .dropdown-menu li .dropdown-item').removeClass('active');
        $(this).addClass('active');
        $(this).parents(".custom-html-dropdown").find('.dropdown-input').html($(this).text() );
        $(this).parents(".custom-html-dropdown").find('.dropdown-input').val($(this).data('value'));
    });

    $(".bug-dropdown .dropdown-menu li .dropdown-item").click(function(){
        $('.bug-dropdown .dropdown-menu li .dropdown-item').removeClass('active');
        $(this).addClass('active');
        var active = $(this).attr('data-report');
        $(this).parents(".bug-dropdown").find('.dropdown-input').html($(this).html() );
        $(this).parents(".bug-dropdown").find('.dropdown-input').attr('data-active', active);
        $(this).parents(".contactForm").find('.support-report-block').removeClass('active')
        $(this).parents(".contactForm").find('#'+active).addClass('active');
    });

    if($('.close-all-collapse').length) {
        $(".close-all-collapse").on("click", function() {
            $(this).parents('.content-wrapper').find('.customCollapse .collapse').collapse('hide');
            $(this).parent('.hide-desc-info').slideUp();
        });
    }
    if($('.view-more-card').length) {
        $(".view-more").on("click", function() {
            $(this).parents('.most-recent-block').find('.view-more-card').slideDown();
        });
    }    
    if($('.customCollapse').length) {
        $('.card-header').on('click', function () {
            $(".hide-desc-info").slideDown();
        })
    }
    if ($(".fixed-content-block").length) {
        checkWidth();
    }
});

function validateLoginForm() {
    var valid = true;	
    $('.form-group').removeClass('error');
    if(!$('#email').val()) {
        console.log($('#email').parents('.form-group'));
        $('#email').parents('.form-group').addClass('error');
        $('#email').parents('.form-group').find('.error-text').show(); 
        valid = false;
    }
    if(!$('#email').val().match(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/)) {
        console.log($('#email').parents('.form-group'));
        $('#email').parents('.form-group').addClass('error');
        $('#email').parents('.form-group').find('.error-text').show(); 
        valid = false;
    }
    if(!$('#password').val()) {
        $('#password').parents('.form-group').addClass('error');
        $('#password').parents('.form-group').find('.error-text').show(); 
        valid = false;
    }
    return valid;
}

$('.btn-hash').bind('click',function(event){
    var $anchor = $(this);
    var $hoffset = '80'
    $('.btn-hash').removeClass("active");
    $anchor.addClass("active");
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
            if (jQuery('.menu-items').length) {
                if (jQuery(this).position().top <= scrollDistance+90) {            
                    var getid = jQuery(this).attr('id');                        
                    jQuery('.menu-item a').removeClass('active');
                    jQuery('.menu-item a[href^="#'+getid+'"]').addClass('active');
                }
            }
            if (jQuery('.nav-sub-item').length) {
                if (jQuery(this).position().top <= scrollDistance+90) {            
                    var getid = jQuery(this).attr('id');                        
                    jQuery('.nav-sub-item a').removeClass('active');
                    jQuery('.show .nav-sub-item a[href^="#'+getid+'"]').addClass('active');
                }
            }
        });
    }).scroll();
}

/* fixed left-side-content */
if (jQuery(".fixed-content-block").length) {
    jQuery(window).resize(checkWidth);
}
if (jQuery(".fixed-content-block").length) {
    function checkWidth() {
        var $window = jQuery(window);
        var windowsize = $window.width();
        if (windowsize > 767) {
            var sidebar = new StickySidebar('#fixed-content-block', {
                containerSelector: '.fixed-desc-block',
                innerWrapperSelector: '.fixed-menu-block',
                topSpacing: 100,
                bottomSpacing: 300
            }); 
        } 
    }
}
/*-----------------------------------------------------------------------------------*/
/* MAIN
/*-----------------------------------------------------------------------------------*/
$(document).ready(function () {
  $('[data-bs-toggle="tooltip"]').tooltip();
  $('.toggle-sidebar,.bg-overly').on('click', function (e) {
    $('.navbar-collapse,.bg-overly,.toggle-sidebar,body,.main-header').toggleClass('is-visible');
    e.preventDefault();
  });

    /* scroll page to top */
    if ($('.scroll-to-top').length) {
      var scrollTop = $(".scroll-to-top");
      $(window).scroll(function () {
        var topPos = $(this).scrollTop();
        if (topPos > 600) {
          $(scrollTop).addClass("is-visible");
        } else {
          $(scrollTop).removeClass("is-visible");
        }
  
      });
      //Click event to scroll to top
      $(scrollTop).click(function () {
        $('html, body').animate({
          scrollTop: 0
        }, 600);
        return false;
      });
    }


    // About & Roadmap Scroll 
    $('.scrollToDiv').on('click',function(event){
        var $anchor = $(this);
        var $hoffset = '100';
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top-$hoffset
        }, 800,'easeInOutExpo');
        event.preventDefault();
    });
    
    // $(window).scroll(function(){
    //   if ($(window).scrollTop() >= 10) {
    //       $('.main-header').addClass('fixed-header');
    //   }
    //   else {
    //       $('.main-header').removeClass('fixed-header');
    //   }
    // });

    $(".custom-html-dropdown .dropdown-menu li .dropdown-item").click(function(){
      // $('.custom-html-dropdown .dropdown-menu li .dropdown-item').removeClass('active');
      $(this).addClass('active');
      $(this).parents(".custom-html-dropdown").find('.dropdown-input').html($(this).text() );
      $(this).parents(".custom-html-dropdown").find('.dropdown-input').val($(this).data('value'));
      $(this).parents(".custom-html-dropdown").find('.dropdown-input').addClass('active');
    });

    // filter-page-action
    if ($('.filter-page-action').length) {
      $(window).scroll(function() {
        if ($(window).scrollTop() > 1400) {
            $('.filter-page-action').addClass('show');
        } else {
            $('.filter-page-action').removeClass('show');
        }
      });

      $('.back-top').on('click', function(e) {
        e.preventDefault();
        $('html, body').animate({scrollTop:0}, '300');
      });
    }

   

    $('.toggle-filter').on('click', function (e) {
      $('.filter-collapse').toggleClass('is-visible');
      $('.filter-collapse').slideToggle();
      e.preventDefault();
    });

    if ($('#frmNewsletter').length) {
      $("#frmNewsletter").submit(function(e) {
        e.preventDefault();
        var femail = $("#femail").val();
        
        if(femail == "") {
            $("#error_message").show().html("The Fields are Required");
        } else {
            $("#error_message").html("").hide();
            $("#frmNewsletter").slideUp();
            $(".msg-thanks").slideDown();
                /*
            $.ajax({
                type: "POST",
                // url: "post-form.php",
                data: "femail="+femail,
                error: function (request, error) {
                    // console.log(arguments);
                    // alert(" Can't do because: " + error);
                    $("#error_message").slideUp();
                    $("#msg-thanks").slideDown();
                },
                success: function(data){
                    $('#success_message').fadeIn().html(data);
                    setTimeout(function() {
                        $('#success_message').fadeOut("slow");
                    }, 2000 );
                }
            });
            */
        }
    });
  }

});
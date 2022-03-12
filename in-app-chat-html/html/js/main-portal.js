var t = {duration: 270,easing: "easeOutSine"};
/* main-sidebar */
if ($('.main-sidebar').length) {
    $(".toggle-sidebar").click(function(t) {
        $(".main-sidebar").toggleClass("open");
        $('body').toggleClass('overflow-hidden')
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
$('[data-toggle="tooltip"]').tooltip({
    container: '.main-content-wrapper',
    boundary: 'window'
});
$(document).ready(function() {
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
    if ($('.profile-block').length) {
        $("#imageUpload").change(function(data){
            var imageFile = data.target.files[0];
            var reader = new FileReader();
            reader.readAsDataURL(imageFile);    
            reader.onload = function(evt){
            $('#imagePreview').attr('src', evt.target.result);
            $('#imagePreview').hide();
            $('#imagePreview').fadeIn(650);
            }
        });
    }
    $(".custom-html-dropdown .dropdown-menu li .dropdown-item").click(function(){
        $('.custom-html-dropdown .dropdown-menu li .dropdown-item ').removeClass('active');
        $(this).addClass('active');
        $(this).parents(".custom-html-dropdown").find('.dropdown-input').html($(this).text() );
        $(this).parents(".custom-html-dropdown").find('.dropdown-input').val($(this).data('value'));
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
    $('#check-all').click(function() {
        var checked = $(this).prop('checked');
        $('#table-users').find('input:checkbox').prop('checked', checked);
    }); 
    if($(".user-checkbox").length) {    
        $(".user-checkbox").change(function () {
            //Reference the CheckBoxes and determine Total Count of checked CheckBoxes.
            var checked = $(".message-box input[type=checkbox]:checked").length;
            if (checked > 1) {
                $(this).parents('.message-box').find('#delete-btn-icon').addClass('active').removeClass('disabled');
                $(this).parents('.message-box').find('#deactive-btn-icon').addClass('active').removeClass('disabled');                
                $(this).parents('.message-box').find('#reactive-btn-icon').removeClass('active').addClass('disabled');
                $(this).parents('.message-box').find('#delete-btn-icon').removeAttr('disabled');
                $(this).parents('.message-box').find('#deactive-btn-icon').removeAttr('disabled');
                $(this).parents('.message-box').find('#reactive-btn-icon').attr("disabled", true);
                // $(this).parents('.message-box').find('#delete-btn-icon i').addClass('ri-delete-bin-7-fill').removeClass('ri-delete-bin-7-line');
                if (checked >= 2) {
                    $(this).parents('body').find('#deactivate-user h3.title').text('Are you sure you want to deactivate '+ checked +' users?');
                } else {
                    $(this).parents('body').find('#deactivate-user h3.title').text('re you sure you want to deactivate user?');
                }
                return true;
            } else if (checked == 0) {
                $(this).parents('.message-box').find('#delete-btn-icon').removeClass('active').addClass('disabled');
                $(this).parents('.message-box').find('#deactive-btn-icon').removeClass('active').addClass('disabled');
                $(this).parents('.message-box').find('#reactive-btn-icon').removeClass('active').addClass('disabled');
                $(this).parents('.message-box').find('#delete-btn-icon').attr("disabled", true);
                $(this).parents('.message-box').find('#deactive-btn-icon').attr("disabled", true);
                $(this).parents('.message-box').find('#reactive-btn-icon').attr("disabled", true);
                // $(this).parents('.message-box').find('#delete-btn-icon i').removeClass('ri-delete-bin-7-fill').addClass('ri-delete-bin-7-line');
            } else if (checked == 1) {
                $(this).parents('.message-box').find('#delete-btn-icon').addClass('active').removeClass('disabled');
                $(this).parents('.message-box').find('#deactive-btn-icon').removeClass('active').addClass('disabled');
                $(this).parents('.message-box').find('#reactive-btn-icon').addClass('active').removeClass('disabled');
                $(this).parents('.message-box').find('#delete-btn-icon').removeAttr('disabled');
                $(this).parents('.message-box').find('#deactive-btn-icon').attr("disabled", true);
                $(this).parents('.message-box').find('#reactive-btn-icon').removeAttr('disabled');
                // $(this).parents('.message-box').find('#delete-btn-icon i').removeClass('ri-delete-bin-7-fill').addClass('ri-delete-bin-7-line');
            }
        });
    }
    $('#channel-check-all').click(function() {
        var checked = $(this).prop('checked');
        $('#table-channels').find('input:checkbox').prop('checked', checked);
    }); 
    if($(".channel-checkbox").length) {    
        $(".channel-checkbox").change(function () {
            //Reference the CheckBoxes and determine Total Count of checked CheckBoxes.
            var checked = $(".message-box input[type=checkbox]:checked").length;
            if (checked > 0) {
                $(this).parents('.message-box').find('#channel-delete-btn-icon').addClass('active').removeClass('disabled');
                $(this).parents('.message-box').find('#channel-delete-btn-icon').removeAttr('disabled');
                $(this).parents('.message-box').find('#channel-delete-btn-icon i').addClass('ri-delete-bin-7-fill').removeClass('ri-delete-bin-7-line');
                if (checked >= 2) {
                    $(this).parents('body').find('#delete-channels h3.title').text('Remove '+ checked +' channels?');
                } else {
                    $(this).parents('body').find('#delete-channels h3.title').text('Remove channel?');
                }
                return true;
            } else if (checked == 0) {
                $(this).parents('.message-box').find('#channel-delete-btn-icon').removeClass('active').addClass('disabled');
                $(this).parents('.message-box').find('#channel-delete-btn-icon').attr("disabled", true);
                $(this).parents('.message-box').find('#channel-delete-btn-icon i').removeClass('ri-delete-bin-7-fill').addClass('ri-delete-bin-7-line');
            }
        });
    }
});
if($('#userTable').length) {
    $('.less-data').on('click', function(){
        $(this).hide();
        $(this).parents('.message-box').find('#userTable').animate({height:'320px'}, 10);
        $('.more-data').show();
    });
    $('.more-data').on('click', function(){
        $(this).hide();
        $(this).parents('.message-box').find('#userTable').animate({height:'100%'}, 10);
        $('.less-data').show();
    });    
}
if($('.arrow-collapse').length) {
    $('.arrow-collapse').on('click', function(){
        $(this).toggleClass('active');
        $(this).parents('.image-details-box').find('.details-content').slideToggle();
    }); 
}
if($('.add-field-action').length) {
    $('.add-field-action').on('click', function() {
        $(this).parent().find('.field-block').eq(0).clone().insertAfter(".field-block:last");
    })
}
if($('.delete-field').length) {
    $(document).delegate('.delete-field', 'click', function() { 
        $(this).parent('.field-block').remove();
    })
}
if($('.edit-action').length) {
    $(document).delegate('.edit-action', 'click', function() { 
        if ($(this).text() == "BULK EDIT") { 
            $(this).text("EDIT KEY/VALUE"); 
            $(this).addClass('edit-value').removeClass('bulk-edit');
            $(this).parents('.custom-lebal-group').find('.bulk-edit-block').hide();
            $(this).parents('.custom-lebal-group').find('.bulk-css-block').show();
        } else { 
            $(this).text("BULK EDIT"); 
            $(this).addClass('bulk-edit').removeClass('edit-value');
            $(this).parents('.custom-lebal-group').find('.bulk-edit-block').show();
            $(this).parents('.custom-lebal-group').find('.bulk-css-block').hide();
        }; 
    })
}
if($('.moderation-links').length) {
    $(".moderation-links a").on("click", function() {
        $(".moderation-block").removeClass("active");
        $('.moderation-links a').removeClass('active');
        $(this).addClass('active');
        $(".moderation-block[id=" + $(this).attr("data-id") + "]").addClass("active");
    });
}
$(".filter-method-dropdown .dropdown-menu li .dropdown-item").click(function(){
    $('.filter-method-dropdown .dropdown-menu li .dropdown-item').removeClass('active');
    $(this).addClass('active');
    var active = $(this).attr('data-value');
    $(this).parents(".filter-method-block").find('.method-text p').removeClass('active')
    $(this).parents(".filter-method-block").find('#'+active).addClass('active');
});
if($('.table-responsive').length) {
    $('.table-responsive').on('show.bs.dropdown', function () {
        $('.table-responsive').css( "overflow", "inherit" );
    });
    $('.table-responsive').on('hide.bs.dropdown', function () {
        $('.table-responsive').css( "overflow", "hidden" );
    });
}
// if($('.table-with-row').length) {
//     $('.table-with-row .inner').on('show.bs.dropdown', function () {
//         $('.table-with-row .inner').css( "overflow", "inherit" );
//     });
//     $('.table-with-row .inner').on('hide.bs.dropdown', function () {
//         $('.table-with-row .inner').css( "overflow", "hidden" );
//     });
// }

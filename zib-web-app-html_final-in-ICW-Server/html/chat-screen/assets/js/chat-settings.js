if ($('.main-header').length) {
    $('.menu-btn').click(function(t) {
        $('.main-content-wrapper .menu-sidebar-block').toggleClass('open');
        $('body').toggleClass('overflow-hidden');
        $(this).toggleClass('is-active');
    })
}
if ($('.custom-dropdown').length) {
    $(".custom-dropdown .dropdown-menu .item").click(function() {
        var selected_value = $(this).html();
        var first_li = $(this).parents('.custom-dropdown').find('.input-dropdown .select-item').html(); 
        console.log(selected_value);
        console.log(first_li);
        $(this).parents('.custom-dropdown').find('.item').removeClass('selected');
        $(this).addClass('selected');
        $(this).parents('.custom-dropdown').find('.input-dropdown .select-item').html(selected_value);
    });
}

// Model Popup
if(document.querySelector(".modal")){
    const openEls = document.querySelectorAll("[data-popup]"); 
    const closeEls = document.querySelectorAll(".closer"); 
    for (const el of openEls) {
        el.addEventListener("click", function() {
            const modalId = this.dataset.popup;            
            document.getElementById(modalId).classList.add('is-show');
        });
    }  
    for (const el of closeEls) {
        el.addEventListener("click", function() {
            document.querySelector(".modal.is-show").classList.remove('is-show');
        });
    }  
}
/*-----------------------------------------------------------------------------------*/
/* MAIN
/*-----------------------------------------------------------------------------------*/
function toggleSidebar(){
    let hmbButton = document.querySelector('.menu-icon');
    if(hmbButton.classList.contains('is-active')){
        document.querySelector('.main-sidebar').classList.remove("open");
        document.querySelector('.bg-overlay').classList.remove("is-visible");
        hmbButton.classList.remove('is-active');
    } else {
        document.querySelector('.main-sidebar').classList.add("open");
        document.querySelector('.bg-overlay').classList.add("is-visible");
        hmbButton.classList.add('is-active');
    }
}

let currentDropper;
window.addEventListener('load', function () {
    let dropdowns = document.querySelectorAll('.custom-dropdown');
    for(let i= 0; i < dropdowns.length; i++) {
        dropdowns[i].addEventListener('click', function(e) {
            if( !this.classList.contains('open')) {
                currentDropper= this;
                this.classList.add('open');
                e.stopImmediatePropagation();
            } else {
                this.classList.remove('open');
            }
        });
    }
});

document.addEventListener('click', function () {
    document.querySelectorAll(".custom-dropdown.open").forEach(function(elem) {
        elem.classList.remove('open');
    })
}, false);

function autoGrow (oField) {
    var textareaMaxHeight = 300;
    if (oField.scrollHeight > oField.clientHeight) {
        if(oField.scrollHeight < textareaMaxHeight) {
            oField.style.height = (oField.scrollHeight+2) + "px";
        } else {
            oField.style.height = (textareaMaxHeight+2) + "px";
        }
    }
    else {
        oField.style.height = 0 +"px";
        oField.style.height = (oField.scrollHeight+2) + "px";
    }
}

// collapseCard
window.addEventListener('load', function () {
    let resultTabs = document.querySelectorAll(".collaspe-header .collapse-action");
    for(let i=0; i < resultTabs.length; i++){
        resultTabs[i].addEventListener('click', function(){
            if( !this.parentNode.classList.contains('active')){ 
                this.parentNode.classList.add('active');
                document.querySelector('#'+ this.dataset.collapse).classList.add('show');                            
            } 
            else if( this.parentNode.classList.contains('active')) { 
                this.parentNode.classList.remove('active');
                document.querySelector('#'+ this.dataset.collapse).classList.remove('show');
            }
        });
    }

    // Get DropDown Text
    let getTextList = document.querySelectorAll(".input-dropdown .custom-dropdown-menu li");
    for(let i=0; i < getTextList.length; i++){
        getTextList[i].addEventListener('click', function(){
            var text = this.textContent ;
            this.parentNode.parentNode.querySelector('.input-block span').innerHTML = text;
            console.log(this.parentNode.parentNode.querySelector('.input-block span').innerHTML = text);
        })
    }
});

// Model Popup
if(document.querySelector(".popup")){
    const openEls = document.querySelectorAll("[data-popup]"); 
    const closeEls = document.querySelectorAll(".close-popup"); 
    for (const el of openEls) {
        el.addEventListener("click", function() {
            const modalId = this.dataset.popup;
            document.getElementById(modalId).classList.add('show');
        });
    }  
    for (const el of closeEls) {
        el.addEventListener("click", function() {
            document.querySelector(".popup.show").classList.remove('show');
        });
    } 
}

// Chat Info Popup
if(document.querySelector(".chat-info-bar")){
    const openEls = document.querySelectorAll("[data-chatbar]"); 
    const closeEls = document.querySelectorAll(".close-info-bar"); 
    for (const el of openEls) {
        el.addEventListener("click", function() {
            const modalId = this.dataset.chatbar;
            document.getElementById(modalId).classList.add('show');
        });
    }  
    for (const el of closeEls) {
        el.addEventListener("click", function() {
            document.querySelector(".chat-info-bar.show").classList.remove('show');
        });
    } 
}

function showPreview(event){
    if(event.target.files.length > 0){
        var src = URL.createObjectURL(event.target.files[0]);
        var preview = document.getElementById("profile-img");
        preview.src = src;
    }
}

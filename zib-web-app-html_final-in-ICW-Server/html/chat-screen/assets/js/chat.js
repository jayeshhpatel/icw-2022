! function(t, e) {
    "use strict";

    function n() {
        this.dispatchEvent(new CustomEvent("long-press", {
            bubbles: !0,
            cancelable: !0
        })), clearTimeout(o), console && console.log && console.log("long-press fired on " + this.outerHTML)
    }
    var o = null,
        u = "ontouchstart" in t || navigator.MaxTouchPoints > 0 || navigator.msMaxTouchPoints > 0,
        s = u ? "touchstart" : "mousedown",
        i = u ? "touchcancel" : "mouseout",
        a = u ? "touchend" : "mouseup",
        c = u ? "touchmove" : "mousemove";
    "initCustomEvent" in e.createEvent("CustomEvent") && (t.CustomEvent = function(t, n) {
        n = n || {
            bubbles: !1,
            cancelable: !1,
            detail: void 0
        };
        var o = e.createEvent("CustomEvent");
        return o.initCustomEvent(t, n.bubbles, n.cancelable, n.detail), o
    }, t.CustomEvent.prototype = t.Event.prototype), e.addEventListener(s, function(t) {
        var e = t.target,
            u = parseInt(e.getAttribute("data-long-press-delay") || "1000", 10);
        o = setTimeout(n.bind(e), u)
    }), e.addEventListener(a, function(t) {
        clearTimeout(o)
    }), e.addEventListener(i, function(t) {
        clearTimeout(o)
    }), e.addEventListener(c, function(t) {
        clearTimeout(o)
    })
}(this, document);


let currentDropper;
window.addEventListener('load', function () {
    let dropdowns = document.querySelectorAll('.has-dropdown');
    for(let i= 0; i < dropdowns.length; i++){
        dropdowns[i].addEventListener('click', function(e){
            if(e.target.id != "new-status"){
                if( !this.classList.contains('open')){
                    if(! this.classList.contains('set-status')){
                        closeOpenedDropdown();
                    }
                    currentDropper= this;
                    this.classList.add('open');
                    if(this.classList.contains('msgOptions')){
                        document.querySelector('#messageboard').classList.add('more-options-opened');
                    }
                    e.stopImmediatePropagation();
                }else{
                    this.classList.remove('open');
                    if(this.classList.contains('msgOptions')){
                        document.querySelector('#messageboard').classList.remove('more-options-opened');
                    }
                }
            }
        });
    }

    document.body.addEventListener('click', function(e){
        let nearestDropdown = getClosest(e.target, '.has-dropdown');
        if(nearestDropdown){
            if(nearestDropdown.classList.contains('open') && nearestDropdown != currentDropper){
                nearestDropdown.classList.remove('open');
                if(nearestDropdown.classList.contains('msgOptions')){
                    document.querySelector('#messageboard').classList.remove('more-options-opened');
                }
                
            }else{
                
            }
        }else{
            if(e.target.id !="new-status"){
                closeOpenedDropdown();
            }
        }
        let nearestTooltip = getClosest(e.target, '.has-tooltip');
        if(nearestTooltip){
            if(nearestTooltip.classList.contains('open')){
                nearestTooltip.classList.remove('open');
            }
        }else{
            closeOpenedTooltip();
        }
        let avatar= getClosest(e.target, ".avatar");
        if( avatar ){
            if( getClosest(avatar, '.message-row')){
                
                document.querySelectorAll('.sidebar-popup').forEach(function(elm, indx){
                    elm.classList.remove('open');
                });
                document.querySelectorAll('.open-sidebar-by-id').forEach(function(elm, indx){
                    elm.classList.remove('active');
                }); 
                document.querySelector('#member-profile-popup-bar').classList.add('open');
                document.querySelector('.new-message-content-block').classList.add('active'); 
                document.querySelector('.mob-menu').classList.add('active');
            }else{
                
            }
        }else{
            
        }
    });

    document.querySelector('#messageboard').addEventListener("click", function(e){
        let item = e.target;
        // Menu item clicked under more-options
        if(getClosest(item, ".popup")){
            if(item.classList.contains('edit-message')){
                let msgRow = getClosest(item, ".message-row");
                let textItem = msgRow.querySelector('.message-content .text-item');
                let optionsBox = textItem.querySelector('.options-box');
                if( optionsBox ){
                    optionsBox.parentNode.removeChild(optionsBox);
                }
                textItem.classList.add('edit-mode');
                msgRow.classList.add('edit-mode');
                let msgEditBox = document.createElement('div');
                msgEditBox.classList.add('msgEditBox');
                msgEditBox.innerHTML= 
                '<div class="editor">'+
                    '<textarea oninput="autoGrow(this)"></textarea>'+
                    '<div class="edit-option-block">'+                                                                      
                        '<div class="message-options">'+
                            '<span class="msg-option-button"><span class="icon icon-gray"><em class="ico bold"></em></span></span>'+
                            '<span class="msg-option-button"><span class="icon icon-gray"><em class="ico italic"></em></span></span>'+
                            '<span class="msg-option-button"><span class="icon icon-gray"><em class="ico icon-text-underline"></em></span></span>'+
                            '<span class="msg-option-button"><span class="icon icon-gray"><em class="ico icon-list-menu"></em></span></span>'+
                            '<span class="msg-option-button"><span class="icon icon-gray"><em class="ico icon-number-list"></em></span></span>'+
                            '<span onclick="toggleMentionBox(this)" class="msg-option-button"><span class="icon icon-gray"><em class="ico icon-at-sign"></em></span></span>'+
                            '<span class="msg-option-button"><span class="icon icon-gray"><em class="ico icon-emoji"></em></span></span></span>'+
                            '<span onclick="showUploadFile()" class="msg-option-button"><span class="icon icon-gray"><i class="ico icon-attach-pin"></i></span></span>'+
                            '<span class="msg-option-button" id="msgEditCancel"><span class="icon icon-gray"><i class="ico icon-cancel"></i></span></span>'+
                            '<span class="msg-option-button" id="msgEditSave"><span class="icon icon-gray"><i class="ico icon-done"></i></span></span>'+
                        '</div>'+
                    '</div>'+
                '</div>';
                textItem.appendChild(msgEditBox);                
                msgEditBox.querySelector('textarea').textContent = textItem.querySelector('.message-text').textContent.trim();
                autoGrow(msgEditBox.querySelector('textarea'));
                msgEditBox.querySelector('#msgEditCancel').addEventListener('click', function(){
                    let textItem= getClosest(this, '.text-item');
                    textItem.classList.remove('edit-mode');
                    getClosest(this, '.message-row').classList.remove('edit-mode');
                    textItem.removeChild( textItem.querySelector('.msgEditBox') );
                    document.querySelector('#messageboard').classList.remove('more-options-opened');
                });

                msgEditBox.querySelector('#msgEditSave').addEventListener('click', function(){
                    let textItem= getClosest(this, '.text-item');
                    textItem.classList.remove('edit-mode');
                    getClosest(this, '.message-row').classList.remove('edit-mode');
                    textItem.querySelector('p.message-text').textContent= textItem.querySelector('.msgEditBox textarea').value;
                    textItem.removeChild( textItem.querySelector('.msgEditBox'));
                    document.querySelector('#messageboard').classList.remove('more-options-opened');
                });
            }
            if(item.classList.contains('pin-conversation')){
                let textItem= getClosest(item, '.message-row');
                if(textItem.classList.contains('pin-mark')){
                    textItem.classList.remove('pin-mark');
                    textItem.removeChild(textItem.querySelector('.pin-note'));
                }else{
                    textItem.classList.add('pin-mark');
                    let startNote= document.createElement('div');
                    startNote.classList.add('pin-note');
                    startNote.innerHTML = '<em class="ico icon-chat-pin"></em>Pinned';
                    textItem.appendChild( startNote );
                }
            }
        }else{
            // More options has been clicked
            if(getClosest(item, '.msgOptions')){
                let msgOptions = getClosest(item, '.msgOptions');
                if( !msgOptions.classList.contains('open')){
                    closeOpenedDropdown();
                    currentDropper= msgOptions;
                    msgOptions.classList.add('open');
                    document.querySelector('#messageboard').classList.add('more-options-opened');
                    e.stopImmediatePropagation();
                }else{
                    msgOptions.classList.remove('open');
                    document.querySelector('#messageboard').classList.remove('more-options-opened');
                }
            }
            if(getClosest(item, '.image-item')){
                showModal(document.querySelector('.view-image-container'))
            }
            if(getClosest(item, '.emoji')){
                let textItem= (getClosest(item, '.message-row')).querySelector('.text-item');
                // let textItem= getClosest(item, '.text-item');
                if(textItem.classList.contains('add-reaction')){
                    textItem.classList.remove('add-reaction');
                    textItem.removeChild(textItem.querySelector('.chat-reaction'));
                }else{
                    textItem.classList.add('add-reaction');
                    let addReaction= document.createElement('div');
                    addReaction.classList.add('chat-reaction');
                    addReaction.innerHTML = 
                        '<span class="reaction blue-bg has-blue-tooltip" onmouseover="showToolTip(this)" onmouseout="hideToolTip(this)"><i class="ico icon-laughing-emoji"></i> 2 <div class="tool-tip-blue common-anim common-anim-pseudo no-display"><span>You and Hudson Paine</span><br><span>reacted with <i class="ico icon-laughing-emoji"></i></span></div></span>'+
                        '<span class="reaction has-blue-tooltip" onmouseover="showToolTip(this)" onmouseout="hideToolTip(this)"><i class="ico icon-laughing-emoji"></i> 2 <div class="tool-tip-blue common-anim common-anim-pseudo no-display"><span>You and Hudson Paine</span><br><span>reacted with <i class="ico icon-laughing-emoji"></i></span></div></span>'+
                        '<span class="reaction has-blue-tooltip" onmouseover="showToolTip(this)" onmouseout="hideToolTip(this)"><i class="ico icon-laughing-emoji"></i> 1 <div class="tool-tip-blue common-anim common-anim-pseudo no-display"><span>You reacted with <i class="ico icon-laughing-emoji"></i></span><br><span>(Click to remove)</span></div></span>'+
                    '<a href="#" class="add-emoji" onclick="showLimitReactionModal()"><i class="ico icon-add-emoji"></i></a>';
                    textItem.appendChild( addReaction );
                }
            }
            if(getClosest(item, '.star')){
                // let textItem= (getClosest(item, '.message-row')).querySelector('.text-item');
                let textItem= getClosest(item, '.message-row');
                if(textItem.classList.contains('star-marked')){
                    textItem.classList.remove('star-marked');
                    textItem.removeChild(textItem.querySelector('.star-note'));
                }else{
                    textItem.classList.add('star-marked');
                    let startNote= document.createElement('div');
                    startNote.classList.add('star-note');
                    startNote.innerHTML = '<em class="ico icon-chat-saved"></em>Saved';
                    textItem.appendChild( startNote );
                }
            }else{
                if(getClosest(item, '.thread')){
                    document.querySelectorAll('.sidebar-popup').forEach(function(elm, indx){
                        elm.classList.remove('open');                      
                    });  

                    document.getElementById('new-thread-popup-bar').classList.remove('open');
                  
                    window.setTimeout(function(){
                        document.getElementById('new-thread-popup-bar').classList.add('open');
                        document.querySelector('.new-message-content-block').classList.add('active');
                        document.querySelector('.mob-menu').classList.add('active');
                    }, 100); 
                }
            }
        }
    });
    let replies= document.querySelectorAll(".reply-thread");
    for(let i= 0; i < replies.length; i++){
        replies[i].addEventListener('click', function(){
            document.querySelectorAll('.chat-info-column').forEach(function(elm, indx){
                    elm.classList.add('no-display');});
            document.getElementById('new-thread-bar').classList.remove('no-display');
            if(window.innerWidth < 768){
                let overlay = document.querySelector(".chat-overlay");
                overlay.classList.remove('inactive');
                overlay.classList.add('active');
            }
            if (window.innerWidth < 1200 && window.innerWidth > 992)  {
                let overlay = document.querySelector(".chat-overlay");
                overlay.classList.remove('inactive');
                overlay.classList.add('active');
            }
            if (window.innerWidth < 880 && window.innerWidth > 767)  {
                let overlay = document.querySelector(".chat-overlay");
                overlay.classList.remove('inactive');
                overlay.classList.add('active');
            }
            window.setTimeout(function(){
                document.getElementById('new-thread-bar').classList.add('active');
            }, 100);
        });
    }
    let singleMsgs = document.querySelectorAll('#messageboard .message-row');
    console.log('singleMsgs.length ---')+ singleMsgs.length;
    for(let i= 0; i<singleMsgs.length; i++){
        singleMsgs[i].addEventListener("mouseenter", function(e){
            if(! document.querySelector('#messageboard').classList.contains('more-options-opened')){
                if(! this.querySelector('.options-box-mob')) {
                    let optionsBox = document.createElement('div');
                    let optionsHtml="";
                    if(window.innerWidth > 767) {
                        let imgSufix="";
                        if(document.querySelector('body').classList.contains('dark')) {
                            imgSufix = "-white";
                        }
                        optionsBox.classList.add('options-box');
                        optionsHtml=
                        '<div class="pin has-blue-tooltip" onmouseover="showToolTip(this)" onmouseout="hideToolTip(this)">'+
                            '<span class="icon pin-conversation"><i class="ico icon-pin"></i></span>'+
                            '<div class="tool-tip-blue common-anim common-anim-pseudo no-display">Pin to conversation</div>'+
                        '</div>'+
                        '<div class="emoji has-blue-tooltip" onmouseover="showToolTip(this)" onmouseout="hideToolTip(this)">'+
                            '<span class="icon"><i class="ico icon-add-emoji"></i></span>'+
                            '<div class="tool-tip-blue common-anim common-anim-pseudo no-display">Add reaction</div>'+
                        '</div>'+
                        '<div class="thread open-sidebar-by-id has-blue-tooltip" data-open_id="new-thread-popup-bar" onmouseover="showToolTip(this)" onmouseout="hideToolTip(this)">'+
                            '<span class="icon"><i class="ico threads"></i></span>'+
                            '<div class="tool-tip-blue common-anim common-anim-pseudo no-display">Reply to thread</div>'+
                        '</div>'+
                        '<div class="share has-blue-tooltip" onmouseover="showToolTip(this)" onmouseout="hideToolTip(this)">'+
                            '<span class="icon" onclick="showMsgSharePublic()"><i class="ico icon-share"></i></span>'+
                            '<div class="tool-tip-blue common-anim common-anim-pseudo no-display">Share</div>'+
                        '</div>'+
                        '<div class="star has-blue-tooltip" onmouseover="showToolTip(this)" onmouseout="hideToolTip(this)">'+
                            '<span class="icon"><i class="ico icon-star"></i></span>'+
                            '<div class="tool-tip-blue common-anim common-anim-pseudo no-display">Save</div>'+
                        '</div>'+ 
                        '<div class="more has-dropdown msgOptions has-blue-tooltip" onmouseover="showToolTip(this)" onmouseout="hideToolTip(this)">'+
                            '<span class="icon"><i class="ico icon-ellipsis-v"></i></span>'+
                            '<div class="tool-tip-blue common-anim common-anim-pseudo no-display">More</div>'+
                            '<div class="popup">'+
                                '<div class="popup-container">'+
                                    '<ul>'+   
                                        '<li class="item copy-link">Copy link</li>'+   
                                        '<li class="item">Mark unread</li>'+   
                                        '<li class="item edit-message">Edit message</li>'+
                                        '<li class="item remove-message">Delete</li>'+
                                    '</ul>'+
                                '</div>'+
                            '</div>'+
                        '</div>';
                    }
                    optionsBox.innerHTML= optionsHtml;
                    getClosest( this, '.message-row').appendChild(optionsBox);
                    if(window.innerWidth > 767){
                    let viewportOffset = optionsBox.getBoundingClientRect();
                        if(viewportOffset.top > 430){
                            optionsBox.querySelector('.popup').classList.add('top-left');
                        }
                    }
                }
            }
        });
    }

    let singleMsg = document.querySelectorAll('.favorites-view .message-row');
    console.log('singleMsgs.length ---')+ singleMsg.length;
    for(let i= 0; i<singleMsg.length; i++){
        singleMsg[i].addEventListener("mouseenter", function(e){
            if(! document.querySelector('#messageboard').classList.contains('more-options-opened')){
                if(! this.querySelector('.options-box-mob')) {
                    let optionsBox = document.createElement('div');
                    let optionsHtml="";
                    if(window.innerWidth > 767) {
                        let imgSufix="";
                        if(document.querySelector('body').classList.contains('dark')) {
                            imgSufix = "-white";
                        }
                        optionsBox.classList.add('options-box');
                        optionsHtml=
                        '<div class="star has-blue-tooltip" onmouseover="showToolTip(this)" onmouseout="hideToolTip(this)">'+
                            '<span class="icon"><i class="fas fa-star"></i></span>'+
                            '<div class="tool-tip-blue common-anim common-anim-pseudo from-right no-display">Star message</div>'+
                        '</div>'+
                        '<div class="emo has-blue-tooltip" onmouseover="showToolTip(this)" onmouseout="hideToolTip(this)">'+
                            '<span class="icon"><i class="far fa-grin"></i></span>'+
                            '<div class="tool-tip-blue common-anim common-anim-pseudo no-display">Add reaction</div>'+
                        '</div>'+
                        '<div class="new-thread has-blue-tooltip" onmouseover="showToolTip(this)" onmouseout="hideToolTip(this)">'+
                            '<span class="icon"><i class="far fa-comments-alt"></i></span>'+
                            '<div class="tool-tip-blue common-anim common-anim-pseudo no-display">Start a thread</div>'+
                        '</div>'+
                        '<div class="more has-dropdown msgOptions has-blue-tooltip" onmouseover="showToolTip(this)" onmouseout="hideToolTip(this)">'+
                            '<span class="icon"><i class="far fa-angle-down"></i></span>'+
                            '<div class="tool-tip-blue common-anim common-anim-pseudo from-right no-display">More options</div>'+
                            '<div class="popup bottom-right">'+
                                '<div class="popup-container">'+
                                   '<ul>'+                                       
                                        '<li class="item pin-conversation" onclick="showPinMsg()"><i class="fas fa-thumbtack"></i>Pin to channel</li>'+
                                        '<li class="item edit-message"><i class="fas fa-pencil-alt"></i>Edit</li>'+
                                        '<li class="item"><i class="fas fa-copy"></i>Copy</li>'+
                                        '<li class="item"><i class="fas fa-star"></i>Unfavorite</li>'+
                                        '<li class="item remove-message"><i class="fas fa-trash-alt"></i>Remove</li>'+
                                    '</ul>'+
                                '</div>'+
                            '</div>'+
                        '</div>';
                    }
                    optionsBox.innerHTML= optionsHtml;
                    getClosest( this, '.message-row').appendChild(optionsBox);
                    if(window.innerWidth > 767){
                    let viewportOffset = optionsBox.getBoundingClientRect();
                        if(viewportOffset.top > 430){
                            optionsBox.querySelector('.popup').classList.add('top-left');
                        }
                    }
                }
            }
        });
    }

    let ImageGrid = document.querySelectorAll('.img-group-block .img-block');
    console.log('imgMsgs.length ---')+ ImageGrid.length;
    for(let i= 0; i<ImageGrid.length; i++){
        ImageGrid[i].addEventListener("mouseenter", function(e){
            if(! document.querySelector('#messageboard .img-group-block').classList.contains('more-options-opened')){
                if(! this.querySelector('.options-box-mob')){
                    let optionsBox = document.createElement('div');
                    let optionsHtml="";
                    if(window.innerWidth > 767){
                        let imgSufix="";
                        if(document.querySelector('body').classList.contains('dark')){
                            imgSufix = "-white";
                        }
                        optionsBox.classList.add('options-box');
                        optionsHtml=
                        '<div class="star has-blue-tooltip" onmouseover="showToolTip(this)" onmouseout="hideToolTip(this)">'+
                            '<span class="icon"><i class="far fa-star"></i></span>'+
                            '<div class="tool-tip-blue common-anim common-anim-pseudo from-right no-display">Star message</div>'+
                        '</div>'+ 
                        '<div class="emo has-blue-tooltip" onmouseover="showToolTip(this)" onmouseout="hideToolTip(this)">'+
                            '<span class="icon"><i class="far fa-laugh-squint"></i></span>'+
                            '<div class="tool-tip-blue common-anim common-anim-pseudo no-display">Add reaction</div>'+
                        '</div>'+
                        '<div class="new-thread has-blue-tooltip" onmouseover="showToolTip(this)" onmouseout="hideToolTip(this)">'+
                            '<span class="icon"><i class="far fa-comments-alt"></i></span>'+
                            '<div class="tool-tip-blue common-anim common-anim-pseudo no-display">Start a thread</div>'+
                        '</div>'+
                        '<div class="more has-dropdown msgOptions has-blue-tooltip" onmouseover="showToolTip(this)" onmouseout="hideToolTip(this)">'+
                            '<span class="icon"><i class="far fa-ellipsis-v"></i></span>'+
                            '<div class="tool-tip-blue common-anim common-anim-pseudo from-right no-display">More options</div>'+
                            '<div class="popup">'+
                                '<div class="popup-container">'+
                                    '<ul>'+                                         
                                        '<li class="item pin-conversation" onclick="showPinMsg()"><i class="fad fa-thumbtack"></i>Pin to channel</li>'+
                                        '<li class="item copy-link"><i class="fad fa-share"></i>Share Message</li>'+  
                                        '<li class="item edit-message"><i class="fad fa-pencil-alt"></i>Edit</li>'+
                                        '<li class="item remove-message"><i class="fad fa-trash-alt"></i>Remove</li>'+
                                    '</ul>'+
                                '</div>'+
                            '</div>'+
                        '</div>';
                    }
                    optionsBox.innerHTML= optionsHtml;
                    getClosest( this, '.img-block').appendChild(optionsBox);
                    if(window.innerWidth > 767){
                    let viewportOffset = optionsBox.getBoundingClientRect();
                        if(viewportOffset.top > 430){
                            optionsBox.querySelector('.popup').classList.add('top-left');
                        }
                    }
                }
            }
        });
    }

    for(let i= 0; i<singleMsgs.length; i++){
        singleMsgs[i].addEventListener("long-press", function(e){
            if(window.innerWidth < 768){
                let optionsBox = document.createElement('div');
                let optionsHtml="";
                if(! this.querySelector('.options-box-mob')){
                    // let optionsBox = document.createElement('div');
                    // let optionsHtml="";
                    optionsBox.classList.add('options-box-mob');
                    optionsBox.classList.add('common-anim');
                    optionsHtml = '<span class="closer" onclick="closeOptionBoxMob(this, event)"><img alt="icon" src="assets/images/icons/cancel-thin-white.svg"></span>'+
                        '<div class="content">'+
                            '<ul>'+
                                '<li>'+
                                    '<a><span class="icon"><img alt="icon" src="assets/images/icons/new-icons/emo-face-black.svg"></span>Add reaction</a>'+
                                '</li>'+
                                '<li>'+
                                    '<a><span class="icon"><img alt="icon" src="assets/images/icons/new-icons/chat-comment-black.svg"></span>Start a thread</a>'+
                                '</li>'+
                                '<li>'+
                                    '<a><span class="icon"><img alt="icon" src="assets/images/icons/new-icons/share-black.svg"></span>Share message</a>'+
                                '</li>'+
                                '<li>'+
                                    '<a><span class="icon"><img alt="icon" src="assets/images/icons/new-icons/star-black.svg"></span>Star this message</a>'+
                                '</li>'+
                                '<li>'+
                                    '<a><span class="icon"><img alt="icon" src="assets/images/icons/new-icons/chat-comment-black.svg"></span>Copy Link</a>'+
                                '</li>'+
                                '<li>'+
                                    '<a><span class="icon"><img alt="icon" src="assets/images/icons/new-icons/align.svg"></span>Mark unread</a>'+
                                '</li>'+
                                '<li>'+
                                    '<a><span class="icon"><img alt="icon" src="assets/images/icons/new-icons/clock.svg"></span>Remind me about this</a>'+
                                '</li>'+
                                '<li>'+
                                    '<a><span class="icon"><img alt="icon" src="assets/images/icons/new-icons/pin.svg"></span>Pin to this conversation</a>'+
                                '</li>'+
                                '<li>'+
                                    '<a><span class="icon"><img alt="icon" src="assets/images/icons/new-icons/edit.svg"></span>Edit message</a>'+
                                '</li>'+
                                '<li>'+
                                    '<a><span class="icon"><img alt="icon" src="assets/images/icons/new-icons/delete.svg"></span>Remove message</a>'+
                                '</li>'+
                            '</ul>'+
                        '</div>';
                }
                optionsBox.innerHTML= optionsHtml;
                getClosest( this, '.message-row').appendChild(optionsBox);
                document.querySelector('.chat-overlay').classList.add('active');
                document.querySelector('.chat-overlay').classList.remove('inactive');
                window.setTimeout(function(){
                    optionsBox.classList.add('showMsgOptions');
                }, 50);
            }
        });
    }

    for(let i= 0; i<singleMsgs.length; i++){
        singleMsgs[i].addEventListener("mouseleave", function(e){
            if(! document.querySelector('#messageboard').classList.contains('more-options-opened')){
                let optionsBox = this.querySelector('.options-box');
                if(optionsBox){
                    optionsBox.parentNode.removeChild(optionsBox);
                }
            }
        });
    }

    for(let i= 0; i<singleMsg.length; i++){
        singleMsg[i].addEventListener("mouseleave", function(e){
            if(! document.querySelector('#messageboard').classList.contains('more-options-opened')){
                let optionsBox = this.querySelector('.options-box');
                if(optionsBox){
                    optionsBox.parentNode.removeChild(optionsBox);
                }
            }
        });
    }
    
    for(let i= 0; i<ImageGrid.length; i++){
        ImageGrid[i].addEventListener("mouseleave", function(e){
            if(! document.querySelector('#messageboard .img-group-block').classList.contains('more-options-opened')){
                let optionsBox = this.querySelector('.options-box');
                if(optionsBox){
                    optionsBox.parentNode.removeChild(optionsBox);
                }
            }
        });
    }

    function closeOpenedDropdown(){
        let openedDropdown = document.querySelector('.has-dropdown.open');
        if(openedDropdown){
            openedDropdown.classList.remove('open');
            if(openedDropdown.classList.contains('msgOptions')){
                document.querySelector('#messageboard').classList.remove('more-options-opened');
                let optionsBox = getClosest(openedDropdown, '.options-box');
                // getClosest(openedDropdown, '.options-box').classList.add('no-display');
                optionsBox.parentNode.removeChild(optionsBox);
            }
        }
    }

    let toolTipHolders = document.querySelectorAll('.has-tooltip');
    for( let i= 0; i < toolTipHolders.length; i++){
        toolTipHolders[i].addEventListener('click', function(e){
            e.stopPropagation();
            if (this.classList.contains('open')){
                closeOpenedTooltip()
                this.classList.remove('open');
            }else{
                this.classList.add('open');
            }
        });
    }
    function closeOpenedTooltip(){
        let openedTooltip = document.querySelector('.has-tooltip.open');
        if(openedTooltip){
            openedTooltip.classList.remove('open');
        }
    }

    let acrdItemsBtns= document.querySelectorAll('.chat-info-column-entry-title-box.opener');
    for(let i= 0; i < acrdItemsBtns.length; i++) {        
        acrdItemsBtns[i].addEventListener('click',function(){
            let currentItem = getClosest(this, '.chat-info-column-entry');
            if(this.classList.contains('open')){
                this.classList.remove('open');
                currentItem.querySelector('.chat-info-column-entry-body').style.height= "0px";
            }else{
                this.classList.add('open');
                currentItem.querySelector('.chat-info-column-entry-body').style.height= currentItem.querySelector('.chat-info-column-entry-body .inner').scrollHeight +"px";
            }
        });
    }
    
    var accHD = document.getElementsByClassName("chat-info-collapse-title-box");
    for (i = 0; i < accHD.length; i++) {
        accHD[i].addEventListener("click", toggleItem, false);
    }
    function toggleItem() {
        var itemClass = this.className;
        for (i = 0; i < accHD.length; i++) {
            accHD[i].className = "chat-info-collapse-title-box";
            accHD[i].parentNode.querySelector('.chat-info-collapse-body').classList.remove('open');
            accHD[i].parentNode.querySelector('.chat-info-collapse-body').style.height= "0px";
        }
        if (itemClass == "chat-info-collapse-title-box") {
            this.className = "chat-info-collapse-title-box open";
            this.parentNode.querySelector('.chat-info-collapse-body').classList.add('open');
            this.parentNode.querySelector('.chat-info-collapse-body').style.height= this.parentNode.querySelector('.chat-info-collapse-body .inner').scrollHeight +"px";
        }
    }


    //Manual resize event trigger
    var elm = document;
    var resizeEvent = document.createEvent('HTMLEvents');
    resizeEvent.initEvent('resize', true, false);
    let rightBarClosers = document.querySelectorAll('.chat-info-column .closer');
    for(let i = 0; i < rightBarClosers.length; i++){
        rightBarClosers[i].addEventListener('click', function(){
            let rightBar = getClosest(this, '.chat-info-column');
            rightBar.classList.add('no-display');
            rightBar.classList.remove('active');
            document.querySelector('.message-body-wrapper').classList.remove('active');
            document.querySelector('.mob-menu').classList.remove('active');
            
            
            elm.dispatchEvent(resizeEvent);
            if(window.innerWidth < 768){
                let overlay = document.querySelector(".chat-overlay");
                overlay.classList.remove('active');
                overlay.classList.add('inactive');
            }
            if (window.innerWidth < 1200 && window.innerWidth > 992)  {
                let overlay = document.querySelector(".chat-overlay");
                overlay.classList.remove('active');
                overlay.classList.add('inactive');
            }
            if (window.innerWidth < 880 && window.innerWidth > 767)  {
                let overlay = document.querySelector(".chat-overlay");
                overlay.classList.remove('active');
                overlay.classList.add('inactive');
            }
        });
    }

    let byIdOpeners = document.querySelectorAll('.open-by-id');
    for(let i=0; i < byIdOpeners.length; i++){
        byIdOpeners[i].addEventListener('click', function(){
            if(this.dataset.open_id){
                document.querySelectorAll('.chat-info-column').forEach(function(elm, indx){
                    elm.classList.add('no-display');
                });
                
                if(window.innerWidth < 768){
                    let overlay = document.querySelector(".chat-overlay");
                    overlay.classList.remove('inactive');
                    overlay.classList.add('active');
                }
                if (window.innerWidth < 1200 && window.innerWidth > 992)  {
                    let overlay = document.querySelector(".chat-overlay");
                    overlay.classList.remove('inactive');
                    overlay.classList.add('active');
                }
                if (window.innerWidth < 880 && window.innerWidth > 767)  {
                    let overlay = document.querySelector(".chat-overlay");
                    overlay.classList.remove('inactive');
                    overlay.classList.add('active');
                }
                document.getElementById(this.dataset.open_id).classList.remove('no-display');
                window.setTimeout(function(item){
                    item.classList.add('active');
                    document.querySelector('.message-body-wrapper').classList.add('active');
                    document.querySelector('.mob-menu').classList.add('active');
                }, 100, document.getElementById(this.dataset.open_id));

                //need to trigger a window resize event as SurferAudioPlayer ui responsiveness depends on it
                // var elm = document;
                // var resizeEvent = document.createEvent('HTMLEvents');
                // event.initEvent('resize', true, false);
                elm.dispatchEvent(resizeEvent);

                if(this.dataset.active_tab){
                    let activeTab= document.getElementById(this.dataset.active_tab);
                    if(activeTab){
                        if(activeTab.classList.contains('chat-info-column-entry')){
                            activeTab.querySelector('.chat-info-column-entry-title-box.opener').classList.add('open');
                            activeTab.querySelector('.chat-info-column-entry-body').style.height= activeTab.querySelector('.chat-info-column-entry-body .inner').scrollHeight +"px";
                        }
                    }
                }
            }
        });
    }

    let bysideIdOpeners = document.querySelectorAll('.open-sidebar-by-id');
    for(let i=0; i < bysideIdOpeners.length; i++){
        bysideIdOpeners[i].addEventListener('click', function(){
            if(this.dataset.open_id){
                document.querySelectorAll('.sidebar-popup').forEach(function(elm, indx){
                    // elm.style.zIndex = 8;                    
                    elm.classList.remove('open');                      
                    elm.classList.remove('active');
                    
                });                
                document.querySelectorAll('.open-sidebar-by-id').forEach(function(elm, indx){
                    elm.classList.remove('active');
                });                
                document.getElementById(this.dataset.open_id).classList.add('open');                
                document.querySelector('.new-message-content-block').classList.add('active');  
                this.classList.add('active');
                // setTimeout(() => {
                //     document.getElementById(this.dataset.open_id).style.zIndex = 9;
                // }, 600);
                window.setTimeout(function(item){
                    item.classList.add('active');
                    document.querySelector('.mob-menu').classList.add('active');
                }, 100, document.getElementById(this.dataset.open_id));

                //need to trigger a window resize event as SurferAudioPlayer ui responsiveness depends on it
                // var elm = document;
                // var resizeEvent = document.createEvent('HTMLEvents');
                // event.initEvent('resize', true, false);
                elm.dispatchEvent(resizeEvent);
            }
        });
    }

    if (document.querySelector('.filter-btn')){
        document.querySelector('.filter-btn').addEventListener('click', function(){ 
            var searchContent = getClosest(this, '.search-content');
            var searchSidebar = searchContent.parentNode.querySelector('.search-sidebar');
            if(searchContent.parentNode.querySelector('.open')) {
                searchSidebar.classList.remove('open');
            } else {
                searchSidebar.classList.add('open');
            }
        })        
    }
    //Manual resize event trigger
    var elm = document;
    var resizeEvent = document.createEvent('HTMLEvents');
    resizeEvent.initEvent('resize', true, false);
    let leftBarClosers = document.querySelectorAll('.sidebar-popup .close-popup');
    for(let i = 0; i < leftBarClosers.length; i++){
        leftBarClosers[i].addEventListener('click', function(){
            let leftBar = getClosest(this, '.sidebar-popup');
            leftBar.style.zIndex = '';
            window.setTimeout(function(){
                leftBar.classList.remove('open');
                leftBar.classList.remove('active');
            }, 100);

            
            
            document.querySelector('.new-message-content-block').classList.remove('active');
            document.querySelector('.mob-menu').classList.remove('active');
            //document.querySelector('.sidebar-icon-box .icon-box').classList.remove('active');
            var x = document.getElementsByClassName("icon-box");
            var i;
            for (i = 0; i < x.length; i++) {
                x[i].classList.remove('active');
            }
        });
    }

    let blueToolTips = document.querySelectorAll('.has-blue-tooltip');
    for(let i=0; i<blueToolTips.length; i++){
        let item;
        if(blueToolTips[i].classList.contains('user-status-icon')){
            blueToolTips[i].addEventListener('mouseover', function(){
                this.querySelector('.tool-tip-blue').classList.remove('no-display');
                this.classList.add('hover');
            });
            blueToolTips[i].addEventListener('mouseout', function(){
                this.classList.remove('hover');
                this.querySelector('.tool-tip-blue').classList.add('no-display');
            });
        }else{
            blueToolTips[i].querySelector('.icon').addEventListener('mouseover', function(){
                this.parentNode.querySelector('.tool-tip-blue').classList.remove('no-display');
                this.parentNode.classList.add('hover');
            });
            blueToolTips[i].querySelector('.icon').addEventListener('mouseout', function(){
                this.parentNode.classList.remove('hover');
                this.parentNode.querySelector('.tool-tip-blue').classList.add('no-display');
            });
        }


    }

    if(document.querySelector('.channel-info .info-item.topic')){
        document.querySelector('.channel-info .info-item.topic').addEventListener('click', function(){
            let popup = document.querySelector('.add-topic-container');
            if(window.innerWidth > 767){
                let viewportOffset = this.getBoundingClientRect();
                popup.querySelector('.wrapper').style.top= (parseInt(viewportOffset.top) + 24) + "px";
                popup.querySelector('.wrapper').style.left= viewportOffset.left+ "px";
            }
            // popup.classList.remove('no-display');
            showModal(popup);
        });
    }
    let accordions = document.querySelectorAll('.accordion');
    for(let n=0; n < accordions.length; n++){        
        let acrdItemHeads= accordions[n].querySelectorAll('.item .head');
        for(let i= 0; i < acrdItemHeads.length; i++){
            if(acrdItemHeads[i].parentNode.querySelector('.body')){
                acrdItemHeads[i].classList.add('collapsable');
                if(accordions[n].classList.contains('open-with-arrow')){
                    acrdItemHeads[i].querySelector('.action').addEventListener('click',function(){
                        accordionEvents(this, getClosest(this, '.head'));
                    });
                }else{
                    acrdItemHeads[i].addEventListener('click',function(){
                        accordionEvents(this, this);
                    });

                }
                
            }
        }
        let acrdOpenedItems = accordions[n].querySelectorAll('.item.open-initialy');
        for(let i= 0; i < acrdOpenedItems.length; i++){
            
            acrdOpenedItems[i].querySelector('.head').classList.remove('closed');
            acrdOpenedItems[i].querySelector('.head').classList.add('open');

            acrdOpenedItems[i].querySelector('.body').style.height= acrdOpenedItems[i].querySelector('.body .inner').scrollHeight +"px";
            acrdOpenedItems[i].classList.remove('open-initialy');
        }
    }

    function accordionEvents(clickedItem, header){
        let currentItem = getClosest(clickedItem, '.item');
        if(header.classList.contains('open')){
            header.classList.remove('open');
            header.classList.add('closed');
            header.parentNode.classList.remove('active');
            if(currentItem.querySelector('.body')){
                currentItem.querySelector('.body').style.height= "0px";
            }
        } else {
            if(currentItem.parentNode.classList.contains('open-single')){
                let currentlyOpen= currentItem.parentNode.querySelector('.item .head.open');
                if(currentlyOpen){
                    currentlyOpen.classList.remove('open');
                    currentlyOpen.classList.remove('closed');
                    currentlyOpen.parentNode.classList.remove('active');
                    currentlyOpen.parentNode.querySelector('.body').style.height= "0px";
                }
            }
            
            header.classList.remove('closed');
            header.classList.add('open');
            header.parentNode.classList.add('active');
            if(currentItem.querySelector('.body')){
                currentItem.querySelector('.body').style.height= currentItem.querySelector('.body .inner').scrollHeight +"px";
            }
        }
    }

    if(document.querySelector('.accordion.open-first-item .item .head')){
        let item= document.querySelector('.accordion.open-first-item .item .head');
        item.classList.add('open');
        item.parentNode.classList.add('active');
        item.parentNode.querySelector('.body').style.height= item.parentNode.querySelector('.body .inner').scrollHeight +"px";
    }
    if(document.querySelector('#rb-theme-light')){
        document.querySelector('#rb-theme-light').addEventListener('change', function(){
            document.querySelector('.theme-preview').classList.remove('dark-theme');
        });
    }
    if(document.querySelector('#rb-theme-dark')){
        document.querySelector('#rb-theme-dark').addEventListener('change', function(){
            document.querySelector('.theme-preview').classList.add('dark-theme');
        });
    }
    
});

function showToolTip(item){
    item.querySelector('.tool-tip-blue').classList.remove('no-display');
    item.classList.add('hover');
}
function hideToolTip(item){
    item.classList.remove('hover');
    item.querySelector('.tool-tip-blue').classList.add('no-display');
}
var getClosest = function ( elem, selector ) {
    if (!Element.prototype.matches) {
        Element.prototype.matches =
            Element.prototype.matchesSelector ||
            Element.prototype.mozMatchesSelector ||
            Element.prototype.msMatchesSelector ||
            Element.prototype.oMatchesSelector ||
            Element.prototype.webkitMatchesSelector ||
            function(s) {
                var matches = (this.document || this.ownerDocument).querySelectorAll(s),
                    i = matches.length;
                while (--i >= 0 && matches.item(i) !== this) {}
                return i > -1;
            };
    }
    for ( ; elem && elem !== document; elem = elem.parentNode ) {
        if ( elem.matches( selector ) ) return elem;
    }
    return null;
};
function showModal(element){
    element.classList.add('show-modal');
    element.classList.remove('hide-modal');
    element.classList.remove('no-display');
}
function hideModal(element){
    element.classList.add('hide-modal');
    element.classList.remove('show-modal');
    window.setTimeout(function(){
        element.classList.add('no-display');
        element.classList.remove('hide-modal');
    }, 400);
}    
function showDeleteDraft(){
    showModal(document.querySelector('.delete-draft-container'));
}
function hideDeleteDraft(){
    hideModal(document.querySelector('.delete-draft-container'));
}
function showDeleteChannel(){
    showModal(document.querySelector('.delete-channel-container'));
}
function hideDeleteChannel(){
    hideModal(document.querySelector('.delete-channel-container'));
}
function showRemoveUserChannel(){
    showModal(document.querySelector('.removeUser-channel-container'));
}
function hideRemoveUserChannel(){
    hideModal(document.querySelector('.removeUser-channel-container'));
}
function showEditNameChannel(){
    showModal(document.querySelector('.edit-channel-name-container'));
}
function hideEditNameChannel(){
    hideModal(document.querySelector('.edit-channel-name-container'));
}
function showNotification(){
    showModal(document.querySelector('.notification-container'));
}
function hideNotification(){
    hideModal(document.querySelector('.notification-container'));
}

function showInviteToWorkspace(){
    showModal(document.querySelector('.invite-to-workspace-container'));
    // document.querySelector('.invite-to-workspace-container').classList.remove('no-display');
}
function hideInviteToWorkspace(){
    hideModal(document.querySelector('.invite-to-workspace-container'));
    // document.querySelector('.invite-to-workspace-container').classList.add('no-display');
}

function showSendMeEmail(){
    showModal(document.querySelector('.send-me-email-container'));
    // document.querySelector('.send-me-email-container').classList.remove('no-display');
}
function hideSendMeEmail(){
    hideModal(document.querySelector('.send-me-email-container'));
    // document.querySelector('.send-me-email-container').classList.add('no-display');
}
function showLeaveChannel(){
    showModal(document.querySelector('.leave-channel-container'));
    // document.querySelector('.leave-channel-container').classList.remove('no-display');
}
function hideLeaveChannel(){
    hideModal(document.querySelector('.leave-channel-container'));
    // document.querySelector('.leave-channel-container').classList.add('no-display');
}

function showPreferences(){
    showModal(document.querySelector('.peferences-container'));
    // document.querySelector('.invite-to-workspace-container').classList.remove('no-display');
}
function hidePreferences(){
    hideModal(document.querySelector('.peferences-container'));
    // document.querySelector('.invite-to-workspace-container').classList.add('no-display');
}
function showLimitReactionModal(){
    showModal(document.querySelector('.limit-reaction-container'));
    // document.querySelector('.invite-to-workspace-container').classList.remove('no-display');
}
function hideLimitReactionModal(){
    hideModal(document.querySelector('.limit-reaction-container'));
    // document.querySelector('.invite-to-workspace-container').classList.add('no-display');
}

function showInviteByLink(){
    showModal(document.querySelector('.invite-to-workspace-container.link-invitation'));
    // document.querySelector('.invite-to-workspace-container.link-invitation').classList.remove('no-display');
}
function hideLinkInvitation(){
    document.querySelectorAll('.invite-to-workspace-container').forEach(function(elm, indx){
        // elm.classList.add('no-display');
        hideModal(elm);
    });

}
function showInviteOtherChannel(){
    showModal(document.querySelector('.invite-other-container'));
    // document.querySelector('.invite-other-container').classList.remove('no-display');
}
function hideInviteOtherChannel(){
    hideModal(document.querySelector('.invite-other-container'));
}

function showInviteToChannel(){
    showModal(document.querySelector('.invite-to-channel-container'));
    // document.querySelector('.invite-to-channel-container').classList.remove('no-display');
}
function hideInviteToChannel(){
    hideModal(document.querySelector('.invite-to-channel-container'));
}

function showEditProfile(){
    showModal(document.querySelector('.edit-profile-container'));
    // document.querySelector('.edit-profile-container').classList.remove('no-display');
}
function hideEditProfile(){
    hideModal(document.querySelector('.edit-profile-container'));
    // document.querySelector('.edit-profile-container').classList.add('no-display');
}
function openChannelEdit(item){
    let parent = getClosest(item, ".chat-info-column-entry-body-item");
    parent.querySelector('.field-edit').classList.remove('no-display');
    adjustAccordionHeight(getClosest(parent, '.chat-info-column-entry-body'));
}
function closeChannelEdit(event){
    event.preventDefault();
    event.stopPropagation();
    let item= event.target;
    let parent = getClosest(item, ".field-edit");
    parent.classList.add('no-display');
    adjustAccordionHeight(getClosest(parent, '.chat-info-column-entry-body'));
}

function showCreateNewChannel(){
    showModal(document.querySelector('.create-channel-container'));
    // document.querySelector('.create-channel-container').classList.remove('no-display');
}
function hideCreateNewChannel(){
    hideModal(document.querySelector('.create-channel-container'));
    // document.querySelector('.create-channel-container').classList.add('no-display');
}
function showSetStatusForm(item){
    item.parentNode.querySelector('form').classList.remove("no-display");
}
function adjustAccordionHeight(item){
    item.style.height= item.querySelector('.inner').scrollHeight +"px";
}
function showImageView(){
    showModal(document.querySelector('.view-image-container'));
}
function hideImageView(){
    if(document.querySelector('.view-image-container .is-video.current video')){
        document.querySelector('.view-image-container .is-video.current video').pause();
    }
    hideModal(document.querySelector('.view-image-container'));
}
function hideReachedMsgLimit(){
    hideModal(document.querySelector('.reached-msg-limit-container'));
    // document.querySelector('.reached-msg-limit-container').classList.add('no-display');
}
function hideReachedSearchLimit(){
    hideModal(document.querySelector('.reached-search-limit-container'));
    // document.querySelector('.reached-search-limit-container').classList.add('no-display');
}
function hideReachedStorageLimit(){
    hideModal(document.querySelector('.reached-storage-limit-container'));
    // document.querySelector('.reached-storage-limit-container').classList.add('no-display');
}
function toggleMapView(item){
    if(item.classList.contains('opened')){
        hideModal(document.querySelector('.map-view-container'));
        // document.querySelector('.map-view-container').classList.add('no-display');
        item.classList.remove('opened');
    } else {
        showModal(document.querySelector('.map-view-container'))
        // document.querySelector('.map-view-container').classList.remove('no-display');
        item.classList.add('opened');
    }
}

function toggleMentionBox(item){
    let textItem= getClosest(item, '.message-write-container');
    if( textItem.querySelector('.mention-box').classList.contains('no-display')){
        
        textItem.querySelector('.mention-box').classList.remove('no-display');
    }else{
        textItem.querySelector('.mention-box').classList.add('no-display');
    }
}

function hideAddTopic(){
    hideModal(document.querySelector('.add-topic-container'));
    // document.querySelector('.add-topic-container').classList.add('no-display');
}

function showAdditionalOptions(){
    showModal(document.querySelector('.additional-options-container'));
    // document.querySelector('.additional-options-container').classList.remove('no-display');
}
function hideAdditionalOptions(){
    hideModal(document.querySelector('.additional-options-container'));
    // document.querySelector('.additional-options-container').classList.add('no-display');
}
function showChannelRename(){
    showModal(document.querySelector('.channel-rename-container'))
    // document.querySelector('.channel-rename-container').classList.remove('no-display');
}
function hideChannelRename(){
    hideModal(document.querySelector('.channel-rename-container'));
    // document.querySelector('.channel-rename-container').classList.add('no-display');
}
function showChannelPurpose(){
    showModal(document.querySelector('.channel-purpose-container'));
    // document.querySelector('.channel-purpose-container').classList.remove('no-display');
}
function hideChannelPurpose(){
    hideModal(document.querySelector('.channel-purpose-container'));
    // document.querySelector('.channel-purpose-container').classList.add('no-display');
}
function showDirectMessage(){
    showModal(document.querySelector('.direct-message-container'));
    // document.querySelector('.direct-message-container').classList.remove('no-display');
}
function hideDirectMessage(){
    hideModal(document.querySelector('.direct-message-container'));
    // document.querySelector('.direct-message-container').classList.add('no-display');
}

function showPresecneStates(){
    showModal(document.querySelector('.presecne-states-containerr'));
    // document.querySelector('.presecne-states-containerr').classList.remove('no-display');
}
function hidePresecneStates(){
    hideModal(document.querySelector('.presecne-states-container'));
    // document.querySelector('.presecne-states-container').classList.add('no-display');
}
function hideSetupProfile(){
    hideModal(document.querySelector('.setup-profile-container'));
    // document.querySelector('.setup-profile-container').classList.add('no-display');
}
function hideAddPeopleWorkspaceChannel(){
    hideModal(document.querySelector('.add-people-workspace-container'));
    // document.querySelector('.add-people-workspace-container').classList.add('no-display');
}
function showSetupProfile(){
    showModal(document.querySelector('.setup-profile-container'));
    // document.querySelector('.setup-profile-container').classList.remove('no-display');
}
function showAddPeopleToWorkspace(){
    showModal(document.querySelector('.add-people-workspace-container'));
    // document.querySelector('.add-people-workspace-container').classList.remove('no-display');
}
function showReviewProfile(){
    showModal(document.querySelector('.review-profile-container'));
    // document.querySelector('.review-profile-container').classList.remove('no-display');
}
function hideProfileModals(){
    if(! document.querySelector('.setup-profile-container').classList.contains('no-display')){
        hideModal(document.querySelector('.setup-profile-container'));
    }
    if(! document.querySelector('.add-people-workspace-container').classList.contains('no-display')){
        hideModal(document.querySelector('.add-people-workspace-container'));
    }
    if(! document.querySelector('.review-profile-container').classList.contains('no-display')){
        hideModal(document.querySelector('.review-profile-container'));
    }
    
    
    
    // document.querySelector('.setup-profile-container').classList.add('no-display');
    // document.querySelector('.add-people-workspace-container').classList.add('no-display');
    // document.querySelector('.review-profile-container').classList.add('no-display');
}
function hideReviewProfile(){
    hideModal(document.querySelector('.review-profile-container'));
    // document.querySelector('.review-profile-container').classList.add('no-display');
}
function showMsgSharePrivate(){
    showModal(document.querySelector('.share-msg-private-container'));
    // document.querySelector('.share-msg-private-container').classList.remove('no-display');
}
function showMsgSharePublic(){
    showModal(document.querySelector('.share-msg-public-container'));
    // document.querySelector('.share-msg-public-container').classList.remove('no-display');
}
function showMapboxAddNewStory(){
    showModal(document.querySelector('.show-mapbox-add-new-story-popup-container'));
}
function hideMsgSharePrivate(){
    hideModal(document.querySelector('.share-msg-private-container'));
    // document.querySelector('.share-msg-private-container').classList.add('no-display');
}
function hideMsgSharePublic(){
    hideModal(document.querySelector('.share-msg-public-container'));
    // document.querySelector('.share-msg-public-container').classList.add('no-display');
}
function showAddMember(){
    showModal(document.querySelector('.add-member-container'));
    // document.querySelector('.add-member-container').classList.add('no-display');
}
function hideAddMember(){
    hideModal(document.querySelector('.add-member-container'));
    // document.querySelector('.add-member-container').classList.add('no-display');
}
function showUploadFile(){
    showModal(document.querySelector('.file-upload-container'));
    // document.querySelector('.file-upload-container').classList.add('no-display');
}
function hideUploadFile(){
    hideModal(document.querySelector('.file-upload-container'));
    // document.querySelector('.file-upload-container').classList.add('no-display');
}
function showPaymentFailed(){
    showModal(document.querySelector('.payment-failed-container'));
    // document.querySelector('.payment-failed-container').classList.add('no-display');
}
function hidePaymentFailed(){
    hideModal(document.querySelector('.payment-failed-container'));
    // document.querySelector('.payment-failed-container').classList.add('no-display');
}
function showPinMsg(){
    showModal(document.querySelector('.pin-msg-container'));    
}
function hidePinMsg(){
    hideModal(document.querySelector('.pin-msg-container'));
}
function showWritePost(){
    showModal(document.querySelector('.write-post-container'));
}
function hideWritePost(){
    hideModal(document.querySelector('.write-post-container'));
}
function toggleSidebar(){
    let hmbButton = document.querySelector('.hamburger--spring');
    if(hmbButton.classList.contains('is-active')){
        document.querySelector('.main-sidebar').classList.remove("open");
        hmbButton.classList.remove('is-active');
    }else{
        document.querySelector('.main-sidebar').classList.add("open");
        hmbButton.classList.add('is-active');
    }
}
function toggleSidebar(){
    let hmbButton = document.querySelector('.hamburger--spring');
    if(hmbButton.classList.contains('is-active')){
        document.querySelector('.main-new-sidebar').classList.remove("open");
        document.querySelector('.new-msg-layout').classList.remove("sidebar-open");
        hmbButton.classList.remove('is-active');
    }else{
        document.querySelector('.main-new-sidebar').classList.add("open");
        document.querySelector('.new-msg-layout').classList.add("sidebar-open");
        hmbButton.classList.add('is-active');
    }
}
function toggleNotificationbar(){
    let hmbButton = document.querySelector('.invite-action');
    if(hmbButton.classList.contains('is-active')){
        document.querySelector('.notification-bar').classList.remove("open");
        document.querySelector('.main-new-sidebar .mob-menu').classList.remove("d-none");
        hmbButton.classList.remove('is-active');
    }else{
        document.querySelector('.notification-bar').classList.add("open");        
        document.querySelector('.main-new-sidebar .mob-menu').classList.add("d-none");
        hmbButton.classList.add('is-active');
    }
}
function toggleMapSidebar(){
    let hmbButton = document.querySelector('.hamburger-map-spring');
    if(hmbButton.classList.contains('is-active')){
        document.querySelector('.map-sidebar').classList.remove("open");
        hmbButton.classList.remove('is-active');
    }else{
        document.querySelector('.map-sidebar').classList.add("open");
        hmbButton.classList.add('is-active');
    }
}

function showGfileCreate(){
    showModal(document.querySelector('.google-file-create-container'));
}
function hideGfileCreate(){
    hideModal(document.querySelector('.google-file-create-container'));
}

function showCreateSnippte(){
    showModal(document.querySelector('.create-snippte-container'));
}

function hideCreateSnippte(){
    hideModal(document.querySelector('.create-snippte-container'));
}

function showSidebarCommonSearch(clickItem){
    let item= getClosest(clickItem, '.item');
    let acrdBody= item.querySelector('.message__sidebar-channels');
    let searchBox = item.querySelector('.message__sidebar-channels li.search-box');
    searchBox.style.height = searchBox.querySelector('.box').scrollHeight + "px";
    acrdBody.style.height = parseInt(acrdBody.querySelector('.inner').scrollHeight +searchBox.querySelector('.box').scrollHeight) + "px";
}
function hideSidebarCommonSearch(clickItem){
    let searchBox = getClosest(clickItem, '.search-box');
    let acrdBody = getClosest(searchBox, '.body');
    searchBox.style.height= "0px";
    acrdBody.style.height = parseInt(acrdBody.querySelector('.inner').scrollHeight - searchBox.querySelector('.box').scrollHeight) + "px";
}
function setUnsetChannelStar(item){
    if(item.classList.contains('star-marked')){
        item.classList.remove('star-marked');
        item.classList.add('no-hover');
        document.querySelector('.message__sidebar-channels .selected i, .message__sidebar-channels .selected svg').classList.remove('far','fa-star');
        document.querySelector('.message__sidebar-channels .selected i, .message__sidebar-channels .selected svg').classList.add('-');
        item.querySelector('i').classList.add('far');
        item.querySelector('i').classList.remove('fas');
    }else{
        item.classList.add('no-hover');
        item.classList.add('star-marked');
        document.querySelector('.message__sidebar-channels .selected i, .message__sidebar-channels .selected svg').classList.add('far','fa-star');
        document.querySelector('.message__sidebar-channels .selected i, .message__sidebar-channels .selected svg').classList.remove('-');
        item.querySelector('i').classList.remove('far');
        item.querySelector('i').classList.add('fas');
    }
}
function activateHover(item){
    item.classList.remove('no-hover');
}
function closeOptionBoxMob(item, e){
    e.stopPropagation();
    e.preventDefault();
    let optionsBox = getClosest(item, '.options-box-mob');
    optionsBox.classList.remove('showMsgOptions');
    window.setTimeout(function(){
        document.querySelector('.chat-overlay').classList.add('inactive');
        document.querySelector('.chat-overlay').classList.remove('active');
        optionsBox.parentNode.removeChild(optionsBox);
    }, 260);
}
function showInLargeThumb(item){
    let thumbnail = getClosest(item, ".thumbnail-preview");
    if(! thumbnail.classList.contains('selected')){
        let media = thumbnail.querySelector('img').getAttribute('data-main-file');
        let largeThumb = document.querySelector('.file-history-box .large-thumbnail');
        if(thumbnail.classList.contains('is-video')){
            largeThumb.innerHTML= '<video controls>'+
                    '<source src="'+media+'.webm" type="video/webm">'+
                    '<source src="'+ media +'.mp4" type="video/mp4">'+
                '</video>'+
                '<div class="play-button common-anim" onclick="playThumbnailVideo(this)">'+
                    '<img class="common-anim" src="assets/images/icons/new-icons/play-white-with-shadow.svg">'+
                '</div>';
                largeThumb.classList.add('is-video');
        }else{
            largeThumb.innerHTML = '<img src="'+ media +'">'+
                                    '<div class="zoom-button common-anim" onclick="showImageView()"></div>';
            largeThumb.classList.remove('is-video');
        }
        thumbnail.parentNode.querySelector('.thumbnail-preview.selected').classList.remove('selected');
        thumbnail.classList.add('selected');
    }
    

    alert("Media-- "+ media);
}
function playThumbnailVideo(item){
    let thumbnail = getClosest(item, ".large-thumbnail");
    thumbnail.classList.remove('is-video');
    thumbnail.querySelector('video').play();
}

function autoGrow (oField){
    var textareaMaxHeight = 300;
    if (oField.scrollHeight > oField.clientHeight) {
        if(oField.scrollHeight < textareaMaxHeight){
            oField.style.height = (oField.scrollHeight+2) + "px";
        }else{
            oField.style.height = (textareaMaxHeight+2) + "px";
        }
    }
    else{
        oField.style.height = 0 +"px";
        oField.style.height = (oField.scrollHeight+2) + "px";
    }
}
let inputs = document.querySelectorAll('.tBox');
for(let i=0; i < inputs.length; i++){
    if(inputs[i].value != ""){
        inputs[i].parentNode.classList.add('has-data');
    }
    inputs[i].addEventListener('focus', function(){
        this.parentNode.classList.add('focused');
        this.parentNode.classList.remove('has-data');
    });
    inputs[i].addEventListener('focusout', function(){
        this.parentNode.classList.remove('focused');
        if(this.value == ""){
            this.parentNode.classList.remove('focused');
            this.parentNode.classList.remove('has-data');
        }else{
            this.parentNode.classList.add('has-data');
            this.parentNode.classList.remove('focused');
        }
    });
}
var wavesurfer;
function loadWaveSurferAudioPlayer(){
    var ctx = document.createElement('canvas').getContext('2d');
    // var linGrad = ctx.createLinearGradient(0, 64, 0, 200);
    // linGrad.addColorStop(0.5, 'rgba(183, 183, 183, 1.000)');
    // linGrad.addColorStop(0.5, 'rgba(183, 183, 183, 1.000)');

    wavesurfer = WaveSurfer.create({
        // Use the id or class-name of the element you created, as a selector
        container: '.waveform',
        // The color can be either a simple CSS color or a Canvas gradient
        waveColor: '#dbdbdb',
        progressColor: '#556ee6',
        cursorColor: '#fff',
        // This parameter makes the waveform look like SoundCloud's player
        barWidth: 3,
        barGap: 3,
        height: 50,
        responsive: true,
    });
    wavesurfer.load('assets/images/sample.mp3');
}

function playAudio(){
    document.querySelector('.audio-box .play-icon').classList.add('no-display');
    document.querySelector('.audio-box .pause-icon').classList.remove('no-display');
    wavesurfer.playPause();
}
function pauseAudio(){
    document.querySelector('.audio-box .pause-icon').classList.add('no-display');
    document.querySelector('.audio-box .play-icon').classList.remove('no-display');
    wavesurfer.playPause();
}
window.addEventListener("DOMContentLoaded", function(){
    loadWaveSurferAudioPlayer();
});
let currentSearch;
window.addEventListener('load', function(){
    if (document.querySelector( ".channel-header-search-wrapper" )) {
        let searchWrapper = document.querySelector( ".channel-header-search-wrapper" );
        let searchBox= searchWrapper.querySelector(".app-search-box");
        let searchField = searchBox.querySelector("input");
        let search = document.querySelector('.channel-header-search');
        let searchResult = search.querySelector('.result-box');
        let inActiveWidth;
        let searchBoxViewportOffset;
        searchBox.addEventListener('click', function(){
            
        });
        searchWrapper.addEventListener('click', function () {         
            if(!searchBox.classList.contains('active') ){
                searchBoxViewportOffset = searchBox.getBoundingClientRect();
                // inActiveWidth = searchBox.clientWidth;
                // searchWrapper.style.width = inActiveWidth + "px";
                // search.style.width = inActiveWidth + "px";
                currentSearch = searchBox;
                searchBox.classList.remove('no-display');
                searchWrapper.classList.add('active');
                // search.classList.add('active');
                // search.style.width= "530px";
                searchResult.classList.remove('no-display');
                if(window.innerWidth < 420){
                    document.querySelector('.mob-menu').classList.add('active');
                }
            }
        });
        var input = document.getElementById("appsearchcontent");
        input.addEventListener("keyup", function(event) {
            if (event.keyCode === 13) {
                event.preventDefault();
                showSearchContent()
            }
        });
        document.querySelector('#app-search-closer').addEventListener("click", function(){
            if(window.innerWidth > 767){
                // searchField.value = "";
                // search.style.width= inActiveWidth + "px";
                searchResult.classList.add('no-display');

                window.setTimeout(function(){
                    // search.classList.remove('active');
                    searchBox.classList.add('no-display');
                    searchWrapper.classList.remove('active');
                    search.style.top= "";
                    search.style.right =  "";
                    search.style.width= "";
                }, 250);
            }else{
                searchField.value = "";
                searchBox.classList.remove('show-app-search');
                window.setTimeout(function(){
                    searchResult.classList.add('no-display');
                    searchBox.style.display= "";
                    }, 150);
            }
            
        });
        document.querySelector('.mob-search').addEventListener('click', function(){
            //searchBox.style.display= "block";
            window.setTimeout(function(){
                searchBox.classList.add('show-app-search');
                searchField.focus();
                searchResult.classList.remove('no-display');
            }, 150);
            
        });
    }
});
window.addEventListener('load', function () {
    let tabs = document.querySelectorAll('.tab-container .tab-item');
    for(let i=0; i < tabs.length; i++){
        tabs[i].addEventListener('click', function(){
            if( ! this.classList.contains('active') ){
                let itemRow = getClosest(this,'.item-row');
                itemRow.querySelector('.tab-container .tab-item.active').classList.remove('active');
                itemRow.querySelector('.tab-container .tab-content.active').classList.remove('active');
                this.classList.add('active');
                itemRow.querySelector('.tab-container .' + this.id).classList.add('active');
                // if(this.id == tabs[0].id){
                //     document.querySelector('.tab-body').classList.remove('all-corners');
                // }else{
                //     document.querySelector('.tab-body').classList.add('all-corners');
                // }
            }
        });
    }

});
document.querySelector('.attachment-button').addEventListener("click", function(){
    let item = document.querySelector(".attach-file-block");
    window.setTimeout(function(){
        item.classList.add('active');
    }, 800);
    window.setTimeout(function(){
        item.classList.remove('active');
    }, 5000);
});

function openInTabPopup(evt, blockName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("popup-tab-content");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("popup-tab-item");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(blockName).style.display = "block";
    evt.currentTarget.className += " active";
}

function showMapBoxPopup(popupclass){
    showModal(document.querySelector(popupclass));
}
function hideMapBoxPopup(popupclass){
    hideModal(document.querySelector(popupclass));
    // document.querySelector('.share-msg-private-container').classList.add('no-display');
}

window.addEventListener('load', function () {
    let resultTabs = document.querySelectorAll(".tab-block .tab-item");
    for(let i=0; i < resultTabs.length; i++){
        resultTabs[i].addEventListener('click', function(){
            if( !this.classList.contains('active')){
                let itemRow = getClosest(this,'.tab-info-block');
                itemRow.querySelector(".tab-block .tab-item.active").classList.remove('active');
                itemRow.querySelector(".tab-content-block .tab-content.active").classList.remove('active');
                this.classList.add('active');
                document.querySelector('#'+ this.dataset.content).classList.add('active');
            }
        });
    }
});
window.addEventListener('load', function () {
    let resultLinks = document.querySelectorAll(".search-sidebar .content-search-list li .link");
    for(let i=0; i < resultLinks.length; i++){
        resultLinks[i].addEventListener('click', function(){
            if( !this.classList.contains('active')){
                let itemRow = getClosest(this,'.search-content-info');
                itemRow.querySelector(".content-search-list li .link.active").classList.remove('active');
                itemRow.querySelector(".search-content-block .search-contents.active").classList.remove('active');
                this.classList.add('active');
                document.querySelector('#'+ this.dataset.id).classList.add('active');
            }
        });
    }
});
function replyThread() {
    if (document.getElementsByClassName('reply-link')) {  
        document.querySelector('.sidebar-popup .chat-thread-reply-block').classList.add('active');     
        document.querySelector('.sidebar-popup .chat-thread-info-block').classList.add('d-none');     
        document.querySelector('.sidebar-popup .header .back').classList.add('active');     
    }
}
function backThread() {
    if (document.getElementsByClassName('back-link')) {  
        document.querySelector('.sidebar-popup .chat-thread-reply-block').classList.remove('active');     
        document.querySelector('.sidebar-popup .chat-thread-info-block').classList.remove('d-none');      
        document.querySelector('.sidebar-popup .header .back').classList.remove('active');     
    }
}
function showSearchContent(){
    showModal(document.querySelector('.search-content-container'));
    // document.querySelector('.search-content-container').classList.remove('no-display');
}
function hideSearchContent(){
    hideModal(document.querySelector('.search-content-container'));
    // document.querySelector('.search-content-container').classList.add('no-display');
}

$(document).ready(function(){

    'use strict';

    var body = $("[data-body='true']");
    var mainNavBtn = $("[data-target='#bs-header-nav-collapse']");

    mainNavBtn.click(function(){
        if( body.hasClass("overflow-hidden") ) {
            body.removeClass("overflow-hidden");
        } else {
            body.addClass("overflow-hidden");
        }
    });
});
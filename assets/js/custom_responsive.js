/**
 * Created by Bram on 11-8-2016.
 */

$(document).ready(function () {
    var closeBtnDiv = $('.mobile-menu-close-btn');
    var openBtnDiv = $('.mobile-menu-open-btn');
    var menuDesktopDiv = $('#main-menu');
    var menuMobileDiv = $('#main-menu-mobile');

    //closeBtnDiv.hide();     // hide close btn
    menuMobileDiv.hide();     // hide main menu

    // Event handler to open
    openBtnDiv.on('click', function() {
        // hide open div
        $(this).hide();
        console.log('open menu');
        // open mobile menu
        menuMobileDiv.slideToggle('slow', function() {
            closeBtnDiv.show();      // open close div
            console.log('closebtn show');
        });
    });

    // Event handler to close
    closeBtnDiv.on('click', function() {
        // close mobile menu
        console.log('sluit menu');
        menuMobileDiv.slideToggle('slow', function(){
            closeBtnDiv.hide();     // close closeBtnDiv
            openBtnDiv.show();      // open openBtnDiv
            console.log('openBtn show');
        });
    });

    // Event that checks if there is clicked on any nav ul li item, if so close toggle
    $('nav ul li').on('click', function(){
        menuMobileDiv.hide();
    });

});
/**
 * Created by Bram on 11-8-2016.
 */

$(document).ready(function () {
    var closeBtnDiv = $('.mobile-menu-close-btn');
    var openBtnDiv = $('.mobile-menu-open-btn');
    var menuMobileDiv = $('#main-menu-mobile');

    // Default menu is hidden (closed)
    menuMobileDiv.hide();     // hide main menu

    // Event handler to open
    openBtnDiv.on('click', function() {
        // hide open div
        $(this).hide();
        closeBtnDiv.show();
        // open mobile menu
        menuMobileDiv.slideToggle('slow');
    });

    // Event handler to close
    closeBtnDiv.on('click', function() {
        closeBtnDiv.hide();     // close closeBtnDiv
        openBtnDiv.show();      // open openBtnDiv
        menuMobileDiv.slideToggle('slow');
    });

    // Event that checks if there is clicked on any nav ul li item, if so close toggle
    $('nav ul li').on('click', function(){
        // Close menu
        menuMobileDiv.hide();
        closeBtnDiv.hide();
        openBtnDiv.show();
    });

});
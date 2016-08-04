$( document ).ready(function() {
    console.log( "ready!" );

    // Skills section - animate all skill bars
    // Loop through all skill-bar divs
    $('#skills .skills').each(function(){
        $(this).find('.skill-bar').animate({
            width:jQuery(this).attr('data-percent')
        }, 6000);
    });
});
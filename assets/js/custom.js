$(document).ready(function() {

    // Setup sticky header
    $('header').stick_in_parent();

    // Setup page scrolling
    //$('#main-menu').fullpage();

    // Add scrolling effects
    window.sr = ScrollReveal();
    sr.reveal('#intro .content img', {viewFactor: 0.1, duration: 1000, distance: '50px'});
    sr.reveal('#intro .content h1', {duration: 2000,  distance: '50px'});
    sr.reveal('#intro .content p', {duration: 2500,  distance: '20px'});
    sr.reveal('#projects', {viewFactor: 0.1});
    sr.reveal('#skills', {viewFactor: 0.1});

    /**
     * Projects section
     * With this anonymous function we only show those projects which filter matches the current filter.
     */
    $(function(){
        $('#container').mixItUp();
    });

    // Projects hover
    // When we hover make it visible when we leave the hover make it invisible
    $('.project-hover').hover(function(){
            $(this).animate({opacity:'1'});
        },
        function(){
            $(this).animate({opacity:'0'});
        }
    );

    /**
     * Skills section
     */

    // Loop through all skill-bar divs
    $('.skill-bar').each(function(){
        var iWidth = $(this).attr('data-percent');
        //console.log(iWidth);

        $(this).find('.skill-bar-loadingbar').animate({
            width:iWidth
        }, 6000);
    });


}); // end ready
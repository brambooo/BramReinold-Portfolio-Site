$(document).ready(function() {

    console.log('test');

    // Skills section - animate all skill bars
    // Loop through all skill-bar divs

    $('.skill-bar').each(function(){
        var iWidth = $(this).attr('data-percent');
        console.log(iWidth);

        $(this).find('.skill-bar-loadingbar').animate({
            width:iWidth
        }, 6000);
    });

}); // end ready
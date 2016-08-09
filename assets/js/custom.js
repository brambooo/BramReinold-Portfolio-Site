$(document).ready(function() {

    /**
     * Projects section
     * With this anonymous function we only show those projects which filter matches the current filter.
     */
    $(function(){
        $('#container').mixItUp();
    });

    /**
     * Skills section
     */

    // Loop through all skill-bar divs
    $('.skill-bar').each(function(){
        var iWidth = $(this).attr('data-percent');
        console.log(iWidth);

        $(this).find('.skill-bar-loadingbar').animate({
            width:iWidth
        }, 6000);
    });


}); // end ready
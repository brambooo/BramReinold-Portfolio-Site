$(document).ready(function(e) {

    /**
     * Fixed header
     */

    // get the current offset of the header to the top of the document page
    var headerTopSize = $('#main-header').offset().top;
    //console.log('offset top main header: ' + headerTopSize);

    // Check if user is scrolling
    $(window).scroll(function() {
        // Validate if the scrolling height is greater than the given headerTopSize
        if( $(this).scrollTop() > headerTopSize ) {
            // If so, main-header is set fixed to top
            $('#main-header').css({position: 'fixed', top: '0px'});
        } else {
            // if not, make it static again (so header isn't fixed anymore)
            $('#main-header').css({position: 'static', top: '0px'});
        }
    }); // end fixed header

    /**
     * This part causes smooth scrolling using scrollto.js
     * We target all a tags inside the nav, and apply the scrollto.js to it.
     */
    $("nav a").click(function(evn){
        evn.preventDefault();
        $('html,body').scrollTo(this.hash, this.hash);
    }); // end smooth scrolling


    /**
     * This part handles the highlighting functionality.
     * We use the scroll functionality again, some array creation and
     * manipulation, class adding and class removing, and conditional testing
     */
    var aChildren = $("nav li").children(); // find the a children of the list items
    var aArray = []; // create the empty aArray
    for (var i=0; i < aChildren.length; i++) {
        var aChild = aChildren[i];
        var ahref = $(aChild).attr('href');
        aArray.push(ahref);
    } // this for loop fills the aArray with attribute href values

    $(window).scroll(function() {
        var windowPos = $(window).scrollTop(); // get the offset of the window from the top of page
        var windowHeight = $(window).height(); // get the height of the window
        var docHeight = $(document).height();

        for (var i = 0; i < aArray.length; i++) {
            var theID = aArray[i];
            var divPos = $(theID).offset().top; // get the offset of the div from the top of page
            var divHeight = $(theID).height(); // get the height of the div in question
            if (windowPos >= divPos && windowPos < (divPos + divHeight)) {
                $("a[href='" + theID + "']").addClass("nav-active");
            } else {
                $("a[href='" + theID + "']").removeClass("nav-active");
            }
        }

        if (windowPos + windowHeight == docHeight) {
            if (!$("nav li:last-child a").hasClass("nav-active")) {
                var navActiveCurrent = $(".nav-active").attr("href");
                $("a[href='" + navActiveCurrent + "']").removeClass("nav-active");
                $("nav li:last-child a").addClass("nav-active");
            }
        }
    }); // end highlighting nav functionality



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

    // Initialize animatedModal
    $('#openProjectModal').animatedModal({
        color: 333
    });

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

    /**
     * Contact section
     */

    // Client side validation accomplished with an Ajax POST request and handle the form validation with PHP on the server side.
    $('#contact-form').on('submit', function(e) {
        e.preventDefault();

        var formData = $(this).serialize();
        console.log('verkregen data client: ' + formData);

        // Call sendEmail method
        sendEmail(formData);

        //// Validate form fields
        //$(this).attrvalidate({
        //
        //    // Enable inline validation
        //    showFieldIndicator:true,
        //
        //    showErrorSummary:true,
        //
        //    // Call submit function when the validation is successful
        //    submitFunction:sendEmail($(this).serialize)
        //
        //});

    });

}); // end ready

// Client side validation accomplished with an Ajax POST request and handle the form validation with PHP on the server side.
function sendEmail(data) {

    $.ajax({
        type: 'POST',
        url: 'contact_handler.php',
        data: data
    }).done(function (data) {
        console.log(data);
        $("#contact-form .form-user-info, textarea, input[type='submit']").hide();
        $("#contact-form").html("<h4>Bedankt voor het invullen van het contactformulier. Er zal zo snel mogelijk op gereageerd worden!</h4>");
    });

} // end submitForm function
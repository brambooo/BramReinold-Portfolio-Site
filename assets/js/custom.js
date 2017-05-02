$(document).ready(function (e) {

    /**
     * Fixed header
     */

        // get the current offset of the header to the top of the document page
    var headerTopSize = $('#main-header').offset().top;
    //console.log('offset top main header: ' + headerTopSize);

    // Check if user is scrolling
    $(window).scroll(function () {
        // Validate if the scrolling height is greater than the given headerTopSize
        if ($(this).scrollTop() > headerTopSize) {
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
    $("nav a").click(function (evn) {
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
    for (var i = 0; i < aChildren.length; i++) {
        var aChild = aChildren[i];
        var ahref = $(aChild).attr('href');
        aArray.push(ahref);
    } // this for loop fills the aArray with attribute href values

    $(window).scroll(function () {
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
    sr.reveal('#intro .content h1', {duration: 2000, distance: '50px'});
    sr.reveal('#intro .content p', {duration: 2500, distance: '20px'});
    sr.reveal('#projects', {viewFactor: 0.1});
    sr.reveal('#skills', {viewFactor: 0.1});

    /**
     * Projects section
     * With this anonymous function we only show those projects which filter matches the current filter.
     */
    $(function () {
        $('#container').mixItUp();
    });

    // Projects hover
    // When we hover make it visible when we leave the hover make it invisible
    $('.project-hover').hover(function () {
            $(this).animate({opacity: '1'});
        },
        function () {
            $(this).animate({opacity: '0'});
        }
    );

    $('.btn-close-icon').click(function() {
        // $('#projectModal').removeAttr( 'style' );
        // $('#projectModal').hide();

    });

    $('.open-project-modal').click(function () {
        console.log('open');
        var currentProjectId = $(this).prop('id');

        // setupModal(currentProjectId);

        // Reset all current data
        $('#projectModal .modal-content .images').empty();
        $('#projectModal .modal-content .tags').empty();


        if (currentProjectId != undefined || currentProjectId != null) {
            // Project Id found
            var project = projects[currentProjectId];
            if (project != null) {
                // Project found - update modal with project properties

                $('#projectModal .modal-content .modal-title').text(project.title);
                $('#projectModal .modal-content .modal-description').text(project.description);

                if (project.webUrl != null) {
                    $('#projectModal .modal-content .modal-website-url').prop('href', project.webUrl);
                    $('#projectModal .modal-content .modal-website-url').show();
                } else {
                    $('#projectModal .modal-content .modal-website-url').hide();
                }

                // Set Tags
                if (project.tags.length > 0) {

                    project.tags.forEach(function (tag) {
                        $('#projectModal .modal-content .tags').append('<div class="tag">' + tag.title + '</div>').addClass('animated FadeIn');
                    })
                }

                // Set images
                if (project.images.length > 0) {

                    project.images.forEach(function (image) {
                        $('#projectModal .modal-content .images').append(
                            '<div class="image-section animated">' +
                            '<div class="image-description">' +
                            '<h1 class="main-title">' + image.title + '</h1>' +
                            '<p class="sub-title">' + image.titleSub + '</p>' +
                            '</div><img src="' + image.url + '" class="image-url animated fadeIn" alt="">' +
                            '</div>'
                        );
                    })
                }
            }
        }
    });

    $("#projectHolidaySnipe").animatedModal({
        animatedIn: 'bounceIn',
        animatedOut: 'bounceOut',
        modalTarget: 'projectModal',
        overflow: 'scroll'
    });
    $("#projectGraszodengelegdWp").animatedModal({
        animatedIn: 'bounceIn',
        animatedOut: 'bounceOut',
        modalTarget: 'projectModal',
        overflow: 'scroll'
    });
    $("#projectGameSpringBoot").animatedModal({
        animatedIn: 'bounceIn',
        animatedOut: 'bounceOutDown',
        modalTarget: 'bounceOut',
        overflow: 'scroll'
    });

    /**
     * Skills section
     */

    // Loop through all skill-bar divs
    $('.skill-bar').each(function () {
        var iWidth = $(this).attr('data-percent');
        //console.log(iWidth);

        $(this).find('.skill-bar-loadingbar').animate({
            width: iWidth
        }, 6000);
    });

    /**
     * Contact section
     */

    // Client side validation accomplished with an Ajax POST request and handle the form validation with PHP on the server side.
    $('#contact-form').on('submit', function (e) {
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

function setupModal(id) {
    $('#' + id).animatedModal({
        color: '#f7f9f8',
        animatedIn: 'zoomIn',
        animatedOut: 'bounceOut',
        modalTarget: 'projectModal'
    });

}

var projects = {
        projectHolidaySnipe : {
            id: 'projectHolidaySnipe',
            title: 'Holiday Snipe',
            description: 'Het Holiday Snipe project is tijdens mijn stage bij Adfiliate Concepts in het derde leerjaar gerealiseerd. Meer informatie wordt toegevoegd.',
            webUrl: 'http://www.holidaysnipe.com',
            tags: [
                {title: 'Stage'},
                {title: 'HTML5'},
                {title: 'CSS3'},
                {title: 'JavaScript'},
                {title: 'React'},
                {title: 'Webpack'},
                {title: 'NPM'},
                {title: 'PHP'},
                {title: 'Laravel'},
                {title: 'Webservices'},
            ],
            images: [
                {
                    title: 'Homepagina (1)',
                    titleSub: 'Startscherm',
                    url: 'assets/img/projects/extra/project-hs-1.jpg'
                },
                {
                    title: 'Homepagina',
                    titleSub: 'Zoekformulier invullen.',
                    url: 'assets/img/projects/extra/project-hs-2.jpg'
                },
                {
                    title: 'Resultatenpagina',
                    titleSub: 'Reispakketten aan het samenstellen.',
                    url: 'assets/img/projects/extra/project-hs-3.jpg'
                },
                {
                    title: 'Resultatenpagina  (1)',
                    titleSub: 'Met de gevonden reispakketten die zijn samengesteld door de applicatie.',
                    url: 'assets/img/projects/extra/project-hs-4.jpg'
                }
            ]
        },
        projectGraszodengelegdWp : {
            id: 'projectGraszodengelegdWp',
            title: 'Graszodengelegd.nl',
            description: 'Wordpress webshop. Deze webshop is ontwikkeld bij Mai-Web.',
            tags: [
                {title: 'Bijbaan (Mai-Web)'},
                {title: 'HTML5'},
                {title: 'CSS3'},
                {title: 'Responsive'},
                {title: 'PHP'},
                {title: 'Wordpress'},
                {title: 'Webshop'},
            ],
            images: [
                {
                    title: 'Homepagina',
                    titleSub: 'Mogelijkheid om direct je gazon te laten berekenen.',
                    url: 'assets/img/projects/extra/project-graszodengelegd-1.jpg'
                },
                {
                    title: 'Gazon Shop',
                    titleSub: 'Mogelijkheid om extra producten te kopen.',
                    url: 'assets/img/projects/extra/project-graszodengelegd-2.jpg'
                },
                {
                    title: 'Gazon Shop - detailpagina',
                    titleSub: 'Mogelijkheid om extra productinformatie in te zien.',
                    url: 'assets/img/projects/extra/project-graszodengelegd-3.jpg'
                }
                // {
                //     title: 'Gazon Shop (mobiele variant) (4)',
                //     titleSub: '',
                //     url: 'assets/img/projects/extra/project-hs-1.jpg'
                // }
            ]
        },
        projectGameSpringBoot : {
            id: 'projectGameSpringBoot',
            title: 'Tekstbased Game',
            description: 'Deze game is ontwikkeld in het derde leerjaar tijdens mijn studie. Het is zelf een simpele game, echter ging het bij het ontwikkelen van de applicatie vooral om het toevoegen van geavanceerde design patterns en niet-functionele eisen.',
            tags: [
                {title: 'School'},
                {title: 'HTML5'},
                {title: 'CSS3'},
                {title: 'Java'},
                {title: 'Spring Boot framework'},
                {title: 'Design patterns'},
                {title: 'Niet-functionele eisen'},
            ],
            images: [
                {
                    title: 'Inlogpagina',
                    titleSub: 'Mogelijkheid om in te loggen of te registreren.',
                    url: 'assets/img/projects/extra/project-game-1.jpg'
                },
                {
                    title: 'Homepagina',
                    titleSub: 'Mogelijkheid om een nieuw gevecht te starten of inventory in te zien',
                    url: 'assets/img/projects/extra/project-game-3.jpg'
                }
            ]
        }
    }

;
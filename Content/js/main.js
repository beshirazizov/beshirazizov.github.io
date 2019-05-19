$(document).ready(function () {

    $(".loader").fadeOut("slow");
    navigationSection();
    contentWayPoint();
    adaptNav();

    $(".inqbtn").click(function (e) {
        e.preventDefault();
        if ($(".inquirymodal").css("display") == 'none') {
            e.stopPropagation();
        }
        $(".inquirymodal").css({
            "opacity": "0",
            "display": "block",
        }).show().animate({ opacity: 1 }, 300)
    })

    $(".xicon").click(function (e) {
        $(".inquirymodal").hide();
    })

    $('html').click(function () {
        if ($(".inquirymodal").css("display") == 'block') {
            $(".inquirymodal").hide();
        }
    });

    $('.inquirymodal').click(function (event) {
        event.stopPropagation();
    });

    $(window).scroll(function () {
        adaptNav();
    });

    $(document).on('click', 'a[href^="#"]', function (event) {
        event.preventDefault();
        $('.navbar-collapse').collapse('hide');
        if ($.attr(this, 'href') != "#") {
            $('html, body').animate({
                scrollTop: $($.attr(this, 'href')).offset().top - 60
            }, 500);
        }
    });

    $(".proj").hover(function () {
        $(this).children(".overlay").animate({ opacity: 1 }, 200);
    }, function () {
        $(this).children(".overlay").animate({ opacity: 0 }, 200);
    });

    $('#namein').keyup(function () {
        $('#namein').css("border", "1px solid transparent")
    })
    $('#contin').keyup(function () {
        $('#contin').css("border", "1px solid transparent")
    })
    $('#messin').keyup(function () {
        $('#messin').css("border", "1px solid transparent")
    })

    $('.sendmess').click(function () {

        var name = $('#namein').val();
        var contact = $('#contin').val();
        var message = $('#messin').val();

        if (name && contact && message) {
            var inq = name + " / " + contact + " / " + message + " / "
            $.ajax({
                url: "http://caspiangroup.net/teamapi/sendmailb?inquiry=" + inq,
                dataType: 'jsonp'
            });
            $('#namein').val("");
            $('#contin').val("");
            $('#messin').val("");
            $(".successmess").animate({ opacity: 1 }, 500);
        }
        else {
            navigator.vibrate(150);
            if (!name) {
                $('#namein').css("border", "1px solid red")
            }
            if (!contact) {
                $('#contin').css("border", "1px solid red")
            }
            if (!message) {
                $('#messin').css("border", "1px solid red")
            }
        }
    });
});

var adaptNav = function () {
    var $win = $(window);
    if ($win.scrollTop() > 50) {
        $('.navbar-light').css('background-color', '#f4f4f4');
        $('.navbar-light').css('padding-top', '8px');
    } else {
        $('.navbar-light').css('background-color', 'white');
        $('.navbar-light').css('padding-top', '20px');

    }
}

var navActive = function (section) {
    var $el = $('.navbar-nav');
    $el.find('a').removeClass('active');
    $el.each(function () {
        $(this).find('a[data-nav-section="' + section + '"]').addClass('active');
    });
};

var navigationSection = function () {
    var $section = $('section[id]');
    $section.waypoint(function (direction) {
        if (direction === 'down') {
            navActive($(this.element).attr('id'));
        }
    }, {
            offset: '70px'
        });
    $section.waypoint(function (direction) {
        if (direction === 'up') {
            navActive($(this.element).attr('id'));
        }
    }, {
            offset: function () { return -$(this.element).height() + 70; }
        });
};
var contentWayPoint = function () {
    $('.animate-box').waypoint(function (direction) {
        if (direction === 'down' && !$(this.element).hasClass('animated')) {
            $(this.element).addClass('item-animate');
            setTimeout(function () {
                $('body .animate-box.item-animate').each(function (k) {
                    var el = $(this);
                    setTimeout(function () {
                        var effect = el.data('animate-effect');
                        if (effect === 'fadeIn') {
                            el.addClass('fadeIn animated');
                        } else {
                            el.addClass('fadeInUp animated');
                        }
                        el.removeClass('item-animate');
                    }, k * 50, 'easeInOutExpo');
                });
            }, 50);
        }
    }, { offset: '90%' });
};
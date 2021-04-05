/*!
 * jQuery ButterScroll: Smooth Scrolling - v0.0.1 - 7/31/2015
 *
 * Copyright (c) 2015 Nick Silva
 *
 * Dual licensed under the MIT and GPL licenses.
 * http://opensource.org/licenses/MIT
 * http://opensource.org/licenses/GPL-3.0
 */

(function ($) {
    function toplink(options) {
        if ($('#back-to-top').length) {
            return;
        }

        var anchor = $('#back-to-top');
        $(options.container).prepend('<div id="back-to-top" />');
        $(options.container).append('<div id="butter-scroll" />');
        var scrollback = $('#butter-scroll');

        $(scrollback)
                .css('display', 'none')
                .prepend('<a>')
                .find('a')
                .attr('href', '#back-to-top')
                .attr('title', 'Back to Top')
                .html('&#8679;')
                .butterScroll();

        $(scrollback).fadeIn(options.speed);

        $(scrollback).find('a').on('click', function (e) {
            $(scrollback).fadeOut(options.speed, function () {
                $('#back-to-top').remove();
                $(this).remove();
            });
        });
        $(window).on('scroll', function (e) {
            if ($(this).scrollTop() === 0) {
                $(scrollback).fadeOut(options.speed, function () {
                    $('#back-to-top').remove();
                    $(this).remove();
                });
            }
        });
    }
    ;

    $.fn.butterScroll = function (options) {
        options = $.extend({
            speed       : 500,     // Scroll speed (in milliseconds)
            toplink     : false,   // Generate a 'back to top' link
            container   : 'body'   // Where do you want the toplink to go?
        }, options);

        $(this).click(function (e, callback) {
            if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                if (target.length) {
                    $('html,body').animate({
                        scrollTop: target.offset().top
                    }, options.speed, function () {
                        if (toplink && $(window).scrollTop() !== 0) {
                            toplink(options);
                        }
                    });
                    return false;
                }
            }
        });
    };
})(jQuery);

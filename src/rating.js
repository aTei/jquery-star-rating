/* jQuery Star Rating Plugin
 *
 * @Author
 * Copyright Nov 02 2010, Irfan Durmus - http://irfandurmus.com/
 *
 * @Version
 * 0.3b
 *
 * @License
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * Visit the plugin page for more information.
 * http://irfandurmus.com/projects/jquery-star-rating-plugin/
 *
 */

;(function($){
    $.fn.rating = function(callback, content){

        callback = callback || function(){};
        content = content || null;

        // each for all item
        this.each(function(i, v){

            $(v).data('rating', {callback:callback, content:content})
                .on('init.rating', $.fn.rating.init)
                .on('set.rating', $.fn.rating.set)
                .on('mouseenter.rating', $.fn.rating.mouseenter)
                .trigger('init.rating');
        });
    };

    $.extend($.fn.rating, {
        init: function(e){
            var el = $(this),
                list = '',
                isChecked = null,
                childs = el.children(),
                i = 0,
                l = childs.length,
                content = el.data('rating').content;

            for (; i < l; i++) {
                list = list + '<a class="star" title="' + $(childs[i]).val() + '">' + content +  '</a>';
                if ($(childs[i]).is(':checked')) {
                    isChecked = $(childs[i]).val();
                };
            };

            childs.hide();

            el
                .append('<div class="stars-rating">' + list + '</div>')
                .trigger('set.rating', isChecked);

            $('a', el).on('click', $.fn.rating.click);
            el.trigger('mouseenter.rating');
        },
        set: function(e, val) {
            var el = $(this),
                item = $('a', el),
                input = undefined;

            if (val) {
                item.removeClass('fullStar');

                input = item.filter(function(i){
                    if ($(this).attr('title') == val)
                        return $(this);
                    else
                        return false;
                });

                input
                    .addClass('fullStar')
                    .prevAll()
                    .addClass('fullStar');
            }

            return;
        },
        mouseenter: function(e){
            var el = $(this),
                stars = $('a', el);

            stars.on('mouseenter', function(e){
                // add tmp class when mouse enter
                $(this)
                    .addClass('tmp_fs')
                    .prevAll()
                    .addClass('tmp_fs');

                $(this).nextAll()
                    .addClass('tmp_es');
            });

            stars.on('mouseleave', function(e){
                // remove all tmp class when mouse leave
                $(this)
                    .removeClass('tmp_fs')
                    .prevAll()
                    .removeClass('tmp_fs');

                $(this).nextAll()
                    .removeClass('tmp_es');
            });
        },
        click: function(e){
            e.preventDefault();
            var el = $(e.target),
                container = el.parent().parent(),
                inputs = container.children('input'),
                rate = el.attr('title');

            matchInput = inputs.filter(function(i){
                if ($(this).val() == rate)
                    return true;
                else
                    return false;
            });

            matchInput
                .prop('checked', true)
				.siblings('input').prop('checked', false);

            container
                .trigger('set.rating', matchInput.val())
                .data('rating').callback(rate, e);
        }
    });

})(jQuery);

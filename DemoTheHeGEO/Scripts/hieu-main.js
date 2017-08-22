(function ($) {
    "use strict";
    $(document).ready(function () {
        $(".top-click").click(function (e) {
            e.preventDefault();
            $(this).parent().find('.feature').toggleClass('open');
        })
    });
})(jQuery);
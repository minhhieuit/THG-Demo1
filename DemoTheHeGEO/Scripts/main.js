ajax = {
    options: {
        success: function (data, status) {
            ajaxUpdateData(data);
        },
        failure: function (res, status) {
            if (res.responseJSON) {
                showAlertMessage(res.responseJSON.message + '<br>' + res.responseJSON.error, 'warning');
            }
            else if (res.status == 500) {
                showAlertMessage('Lỗi hệ thống (500).', 'warning')
            }
            else if (res.status == 404) {
                showAlertMessage('Không tìm thấy trang.', 'warning')
            }
            else {
                getAjaxMessage();
            }
        }
    }
}

function showLoading() {
    $('.ct-loading').show();
}


function hideLoading() {
    $('.ct-loading').hide();
}

function showMessage(msg) {
    if ($.isArray(msg)) {
        for (i in msg) {
            showMessage(msg[i]);
        }
    }
    else if ($.isPlainObject(msg)) {
        for (i in msg) {
            showAlertMessage(msg[i], i);
        }
    }
    else if (msg != '') {
        showAlertMessage(msg);
    }
}

function showAlertMessage(msg, type) {
    $('<div class="alert alert-' + (type ? type : 'info') + '"><button class="close" data-dismiss="alert" aria-label="close">×</button>' + msg + '</div>')
        .appendTo('#alert-area')
        .delay(5000)
        .fadeOut(200, function () {
            $(this).remove();
        });
}


function ajaxResult(message, closeModal, callback, data) {
    if (closeModal) {
        currentModal().hide();
    }
    if (message) {
        if (typeof callback == 'function') {
            setTimeout(function () {
                showAlertMessage(message, closeModal ? 'info' : 'warning')
            }, 500);
        }
        else {
            showAlertMessage(message, closeModal ? 'info' : 'warning')
        }
    }
    if (typeof callback == 'function') {
        setTimeout(function () {
            callback(data);
        }, 10);
    }
}

function ajaxGetData(url) {
    showLoading();
    $.get(url, function (data) {
        ajaxUpdateData(data);
        hideLoading();
    });
}

function ajaxUpdateData(data) {
    if (!isJsData(data)) {
        data = $(data);
        var target = $('#' + data.attr('id'));

        if (target.is('.modal')) {
            target.html(data.html()).mvcvalidate().modal('layout');
        }
        else if (data.is('.modal')) {
            data.modal({ 'backdrop': 'static' }).on('shown.bs.modal', function () {
                $(this).mvcvalidate().modal('layout');
            });
        }
        else {
            target.replaceWith(data.mvcvalidate());
            currentModal().layout();
        }
    }
}

function ajaxModelError(errors) {
    if (errors.length == 1) {
        showAlertMessage(errors[0])
    }
    else {
        var msg = '';
        for (i in errors) {
            msg += '<li>' + errors[i] + '</li>';
        }
        showAlertMessage('<ul>' + msg + '</ul>');
    }
}

function getAjaxMessage() {
    $.get("/base/getmessage");
}

function isJsData(data) {
    return $.isArray(data) || $.isPlainObject(data) || $.isFunction(data) || data.toString().trim().match(/^(showMessage|ajaxModelError|ajaxResult|alert)/) != null;
}

function currentModal() {
    var manager = jQuery('body').data('modalmanager');
    if (manager) {
        var top = manager.getTopModal();
        if (top) return top;
    }
    return {
        hide: function () { },
        layout: function () { }
    };
}

function hasOpenModal() {
    var manager = jQuery('body').data('modalmanager');
    if (manager) {
        return manager.hasOpenModal();
    }
    return false;
}

$.fn.mvcvalidate = function () {
    $.validator.unobtrusive.parse(this);
    buildControls(this);
    return this;
}

$('#place-form').on('hide', function (e) {
    if (!confirm('You want to close me?'))
        e.preventDefault();
});

///////////////////////////////////////////////////////////////

function buildControls(wrap) {
    $(document).trigger('rs-build-controls', wrap || document);
}

$(document).ready(function () {
    $('#btn-category').on('change', function () {
    });
});
//$(function () {
//    $(document).bind('rs-build-controls.datetimepicker', function (event, wrap) {
//        var controls = $(wrap).is('.rs-datetime-picker') ? $(wrap) : $(wrap).find('.rs-datetime-picker');
//        controls.datetimepicker({
//            format: rs.formats.datetime_picker_format,
//            autoclose: true,
//            language: rs.language
//        });
//    });

//    $(document).bind('rs-build-controls.datepicker', function (event, wrap) {
//        var controls = $(wrap).is('.rs-date-picker') ? $(wrap) : $(wrap).find('.rs-date-picker');
//        controls.datetimepicker({
//            format: rs.formats.date_picker_format,
//            autoclose: true,
//            language: rs.language,
//            minView: 2
//        });
//    });

//    $('.datepicker').datetimepicker({
//        format: rs.formats.date_picker_format,
//        autoclose: true,
//        language: rs.language,
//        minView: 2
//    });


//    buildControls();
//})

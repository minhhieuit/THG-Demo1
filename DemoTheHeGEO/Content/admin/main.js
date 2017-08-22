$(document).ready(function () {
    $(".fa.fa-remove.btn-delete").on('click', function (e) {
        e.preventDefault();
        console.log($(this).attr('id'));
        var id = $(this).attr('id');
        var url = 'http://localhost:54335/Admin/Admin/Delete';
        $.ajax({
            url: url,
            type: 'POST',
            dataType: 'json',
            data: { id: id },
        })
        .done(function (res) {
            if (res.status == 'success') {
                console.log('Delete success');
                $('.row-place-' + id).fadeOut(function () {
                    $(this).remove();
                });
            }
        })
        .fail(function () {
            console.log("error");
        })
        .always(function () {
            console.log("complete");
        });
    });

    $(".fa.fa-remove.btn-delete").on('click', function (e) {
        e.preventDefault();
        console.log($(this).attr('id'));
        var id = $(this).attr('id');
        var url = 'http://localhost:54335/Admin/Category/Delete';
        $.ajax({
            url: url,
            type: 'POST',
            dataType: 'json',
            data: { id: id },
        })
        .done(function (res) {
            if (res.status == 'success') {
                console.log('Delete success');
                $('.row-category-' + id).fadeOut(function () {
                    $(this).remove();
                });
            }
        })
        .fail(function () {
            console.log("error");
        })
        .always(function () {
            console.log("complete");
        });
    });
});

//var center = new google.maps.LatLng(59.76522, 18.35002);

//function initialize() {

//    var mapOptions = {
//        zoom: 7,
//        mapTypeId: google.maps.MapTypeId.ROADMAP,
//        center: center
//    };

//    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

//    var marker = new google.maps.Marker({
//        map: map,
//        position: center
//    });
//}

//$('.launch-map').on('click', function () {

//    $('#modal').modal({
//        backdrop: 'static',
//        keyboard: false
//    }).on('shown.bs.modal', function () {
//        google.maps.event.trigger(map, 'resize');
//        map.setCenter(center);
//    });
//});

//initialize();
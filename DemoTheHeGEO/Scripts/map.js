var locations = [];
var map;
var obj;
var locationDefault = { lat: 21.01768, lng: 105.781283 };
var markers = [];
var markerCluster;
var searchBox;
$(document).ready(function () {
    $.getJSON("http://localhost:54335/api/place", function (result) {
        initMap(result);
    });

    // event changed value category
    $('#btn-category').on('change', function () {
        var url = "http://localhost:54335/api/place";

    });
    // event click search
    $('#btnSearch').on('click', function (e) {
        var district = $('#pac-input').val();
        var category = $('#btn-category option:selected').val();
        var begin = $('#begin-price').val();
        var end = $('#end-price').val();
        var data = [];
        var locations = [];
        var obj = new Object();
        obj.PriceBegin = begin;
        obj.PriceEnd = end;
        obj.Category = category;
        obj.Type = 0;
        // neu thay doi district thi thay doi center
        // ajax get vi tri 
        
        if (district != '') {
            //    obj.District = district;
            data.push(obj);
            var json = JSON.stringify(data);
            $.ajax({
                type: "POST",
                url: "http://localhost:54335/api/place",
                processData: false,
                contentType: 'application/json',
                data: json,
                success: function (res) {
                    console.log(res.length);
                    console.log(res);
                    clearMarkers();
                    setMarkers(res);
                    getCurrentCenter(map);
                }
            });
        } else {
            //obj.District = district;
            data.push(obj);
            var json = JSON.stringify(data);
            
            $.ajax({
                type: "POST",
                url: "http://localhost:54335/api/place",
                processData: false,
                contentType: 'application/json',
                data: json,
                success: function (res) {
                    console.log(res.length);
                    console.log(res);
                    clearMarkers();
                    setMarkers(res);
                    map.setCenter(locationDefault);
                    map.setZoom(15);
                }
            });
        }
    });
});

//Init map
function initMap(locations) {
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        center: { lat: 21.046723, lng: 105.781283 }
    });
    setMarkers(locations);

    var input = document.getElementById('pac-input');
    searchBox = new google.maps.places.SearchBox(input);

    searchBox.addListener('places_changed', function () {
        var places = searchBox.getPlaces();

        if (places.length == 0) {
            return;
        }

        // For each place, get the icon, name and location.
        var bounds = new google.maps.LatLngBounds();
        places.forEach(function (place) {
            if (!place.geometry) {
                console.log("Returned place contains no geometry");
                return;
            }
            var icon = {
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(25, 25)
            };

            if (place.geometry.viewport) {
                // Only geocodes have viewport.
                bounds.union(place.geometry.viewport);
            } else {
                bounds.extend(place.geometry.location);
            }
        });
        map.fitBounds(bounds);
    });
}

//Set list markers
function setMarkers(locations) {
    var marker;
    $.each(locations, function (i, v) {
        // add a marker
        marker = new google.maps.Marker({
            position: { lat: v.MapLatitude, lng: v.MapLongitude },
            map: map,
            icon: new google.maps.MarkerImage("https://chart.googleapis.com/chart?chst=d_bubble_text_small&chld=bb|" + v.Price + " Trieu" + "|007bff|FFFFFF"),
            id: v.ID,
            name: v.Name,
            price: v.Price,
            category: v.Category.Name,
            description: v.Description,
            phone: v.Phone,
            email: v.Email,
            website: v.Website
        });
        markers.push(marker);
    });
    setMapOnAll(map, markers);
    initList(markers);
    setInfowindow(markers);
    // Add a marker clusterer to manage the markers.
    markerCluster = new MarkerClusterer(map, markers,
        { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' });
}
// init list places
function initList(markers) {
    setListPlaceCurrent(markers);
    map.addListener('center_changed', function () {
        var list = [];
        $('#list-result').empty();
        for (var i = markers.length, bounds = map.getBounds() ; i--;) {
            if (bounds.contains(markers[i].getPosition())) {
                //console.log(markers[i].getLabel());
                //console.log(markers[i].get('store_id')); // call markerID

                list.push(markers[i]);
            }
        }
        $.each(list, function (i, v) {

            var context = '<div class="item" onmouseover="test('+v.get('id')+');">' +
                    '<div class="images">' +
                        '<a href="">' +
                            '<img src="/images/6.jpg" />' +
                        '</a>' +
                    '</div>' +
                    '<div class="nav-item" >' +
                        '<h3 class="title"><a href="">' + v.get('name') + '</a></h3>' +
                        '<p class="adress">' + v.get('name') + '</p>' +
                        '<p class="price">' + v.get('price') + 'VND</p>' +
                        '<div class="info">' +
                            '<div class="type">' +
                                '<i><img src="images/apartment-3.png" alt=""></i>' +
                                '<span>' + v.get('category') + '</span>' +
                            '</div>' +
                        '</div>' +
                        '<div class="rating" data-rating="5">' +
                            '<span class="stars">' +
                                '<i class="fa fa-star"></i>' +
                                '<i class="fa fa-star"></i>' +
                                '<i class="fa fa-star"></i>' +
                                '<i class="fa fa-star"></i>' +
                                '<i class="fa fa-star"></i>' +
                            '</span>' +
                        '</div>' +
                    '</div>' +
                '</div>';
            $('#list-result').append(context);
        });
    });

    map.addListener('bounds_changed', function () {
        var list = [];
        $('#list-result').empty();
        for (var i = markers.length, bounds = map.getBounds() ; i--;) {
            if (bounds.contains(markers[i].getPosition())) {
                list.push(markers[i]);
            }
        }
        $.each(list, function (i, v) {
            var context = '<div class="item" onmouseover="test('+v.get('id')+');">' +
                    '<div class="images">' +
                        '<a href="">' +
                            '<img src="/images/6.jpg" />' +
                        '</a>' +
                    '</div>' +
                    '<div class="nav-item" >' +
                        '<h3 class="title"><a href="">' + v.get('name') + '</a></h3>' +
                        '<p class="adress">' + v.get('name') + '</p>' +
                        '<p class="price">' + v.get('price') + 'VND</p>' +
                        '<div class="info">' +
                            '<div class="type">' +
                                '<i><img src="images/apartment-3.png" alt=""></i>' +
                                '<span>' + v.get('category') + '</span>' +
                            '</div>' +
                        '</div>' +
                        '<div class="rating" data-rating="5">' +
                            '<span class="stars">' +
                                '<i class="fa fa-star"></i>' +
                                '<i class="fa fa-star"></i>' +
                                '<i class="fa fa-star"></i>' +
                                '<i class="fa fa-star"></i>' +
                                '<i class="fa fa-star"></i>' +
                            '</span>' +
                        '</div>' +
                    '</div>' +
                '</div>';
            $('#list-result').append(context);
            searchBox.setBounds(map.getBounds());
        });
    });
}
function clearMarkers() {
    markerCluster.clearMarkers();
    markers = [];
}
//function deleteMarkers() {
//    clearMarkers();
//    markers = [];
//}
// Sets the map on all markers in the array.
function setMapOnAll(map, markers) {
    $.each(markers, function (i, v) {
        v.setMap(map);
    });
}

// add infowindow
function setInfowindow(markers) {
    $.each(markers, function (i, v) {
        var infowindow = new google.maps.InfoWindow({
            content: '<div id="iw-container">' +
                    '<div class="iw-title">' + v.get('name') + '</div>' +
                    '<div class="iw-content">' +
                      '<div class="iw-subTitle">' + v.get('category') + '</div>' +
                      '<img src="http://maps.marnoto.com/en/5wayscustomizeinfowindow/images/vistalegre.jpg" alt="Porcelain Factory of Vista Alegre" height="115" width="83">' +
                      '<p>' + v.get('description') + '</p>' +
                      '<div class="iw-subTitle">Contacts</div>' +
                      '<p>VISTA ALEGRE ATLANTIS, SA<br>3830-292 Ílhavo - Portugal<br>' +
                      '<br>Phone. ' + v.get('phone') + '<br>e-mail: ' + v.get('email') + '<br>' + v.get('website') + '</p>' +
                    '</div>' +
                    '<div class="iw-bottom-gradient"></div>' +
                  '</div>'
        });
        google.maps.event.addListener(v, 'click', function () {
            infowindow.open(map, this);
        });

        google.maps.event.addListener(infowindow, 'domready', function () {

            var iwOuter = $('.gm-style-iw');
            var iwBackground = iwOuter.prev();

            iwBackground.children(':nth-child(2)').css({ 'display': 'none' });

            iwBackground.children(':nth-child(4)').css({ 'display': 'none' });

            iwOuter.parent().parent().css({ left: '115px' });

            iwBackground.children(':nth-child(1)').attr('style', function (i, s) { return s + 'left: 76px !important;' });

            iwBackground.children(':nth-child(3)').attr('style', function (i, s) { return s + 'left: 76px !important;' });

            iwBackground.children(':nth-child(3)').find('div').children().css({ 'box-shadow': 'rgba(72, 181, 233, 0.6) 0px 1px 6px', 'z-index': '1' });

            var iwCloseBtn = iwOuter.next();

            iwCloseBtn.css({ opacity: '1', right: '38px', top: '3px', border: '7px solid #48b5e9', 'border-radius': '13px', 'box-shadow': '0 0 5px #3990B9' });

            if ($('.iw-content').height() < 140) {
                $('.iw-bottom-gradient').css({ display: 'none' });
            }

            iwCloseBtn.mouseout(function () {
                $(this).css({ opacity: '1' });
            });
        });
    });
}

function getCurrentCenter(map) {
    var input = document.getElementById('pac-input');
    searchBox = new google.maps.places.SearchBox(input);

    searchBox.addListener('places_changed', function () {
        var places = searchBox.getPlaces();

        if (places.length == 0) {
            return;
        }

        // For each place, get the icon, name and location.
        var bounds = new google.maps.LatLngBounds();
        places.forEach(function (place) {
            if (!place.geometry) {
                console.log("Returned place contains no geometry");
                return;
            }
            var icon = {
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(25, 25)
            };

            if (place.geometry.viewport) {
                // Only geocodes have viewport.
                bounds.union(place.geometry.viewport);
            } else {
                bounds.extend(place.geometry.location);
            }
        });
        map.fitBounds(bounds);
    });
}
function setListPlaceCurrent(markers) {
    console.log("set list: " + markers);
    var list = [];
    $('#list-result').empty();
    for (var i = markers.length, bounds = map.getBounds() ; i--;) {
        if (bounds.contains(markers[i].getPosition())) {
            //console.log(markers[i].getLabel());
            //console.log(markers[i].get('store_id')); // call markerID

            list.push(markers[i]);
        }
    }
    $.each(list, function (i, v) {
        var context = '<div class="item" onmouseover="test('+v.get('id')+');"> ' +
                '<div class="images">' +
                    '<a href="">' +
                        '<img src="/images/6.jpg" />' +
                    '</a>' +
                '</div>' +
                '<div class="nav-item" >' +
                    '<h3 class="title"><a href="">' + v.get('name') + '</a></h3>' +
                    '<p class="adress">' + v.get('name') + '</p>' +
                    '<p class="price">' + v.get('price') + 'VND</p>' +
                    '<div class="info">' +
                        '<div class="type">' +
                            '<i><img src="images/apartment-3.png" alt=""></i>' +
                            '<span>' + v.get('category') + '</span>' +
                        '</div>' +
                    '</div>' +
                    '<div class="rating" data-rating="5">' +
                        '<span class="stars">' +
                            '<i class="fa fa-star"></i>' +
                            '<i class="fa fa-star"></i>' +
                            '<i class="fa fa-star"></i>' +
                            '<i class="fa fa-star"></i>' +
                            '<i class="fa fa-star"></i>' +
                        '</span>' +
                    '</div>' +
                '</div>' +
            '</div>';
        $('#list-result').append(context);
    });
}
function test(id) {
    console.log(id);
   
}
//function when hover list

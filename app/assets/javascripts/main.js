var map;
var markers = [];
var collectionCenterIcon = 'http://res.cloudinary.com/drch6exvq/image/upload/c_scale,h_32/v1534605020/Kerala%20Flood/collection.png'

function initMap() {
    map = new google.maps.Map(
	document.getElementById('map'), {zoom: 12, center: {lat: 9.97892, lng: 76.3180348}});

    $.get('/relief_facilities/search', function(data){
	data.forEach(function(d){
	    addMarker(d);
	});
    });
}

function addMarker(ldata) {
    let nearCCButton = ''
    if(ldata.facility_type != 'relief_material_collection'){
	nearCCButton = 	'<input class="primary-btn" onclick="nearByCollectionCenters('+ ldata.location.lat + ',' + ldata.location.lon + ');" type=button value="Near by collection centers">'
    }
    let infoDetails = '<h3>' + ldata.name + '</h3>' +
	'<div id="address"> <b>Address : </b> ' + ldata.humanized_address + '</div><br>' +
	'<div id="details"> <b>Contact : </b>' + ldata.contact + '</div><br>' +
        '<a href="' + 'https://www.google.com/maps/search/?api=1&query=' + ldata.location.lat + ',' + ldata.location.lon + '" target="_blank">Open in Google Maps</a><br><br>' +
	nearCCButton

    let markerInfo = {location: {position: {lat: ldata.location.lat, lng: ldata.location.lon}, icon: null}, info: infoDetails, id: ldata.id, facilityType: ldata.facility_type};
    if(ldata.facility_type == 'relief_material_collection'){
	markerInfo.location.icon = collectionCenterIcon;
    };

    let marker = new google.maps.Marker(markerInfo.location);
    marker.set("id", markerInfo.id);
    infowindow = new google.maps.InfoWindow;
    marker.addListener('click', function() {
	infowindow.setContent(markerInfo.info);
	infowindow.open(map, marker);
    });

    marker.setMap(map)
    markers.push(marker);
}

function setMapOnAll(map) {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }
}

function clearMarkers() {
    setMapOnAll(null);
}

function showMarkers() {
    clearMarkers();
    $.get('/relief_facilities/search', function(data){
	data.forEach(function(d){
	    addMarker(d);
	});
    });
}

function deleteMarkers() {
    clearMarkers();
    markers = [];
}

function nearByCollectionCenters(lat, lng){
    url = '/relief_facilities/search?within=' + lat + ',' + lng;
    console.log(url);
    $.get(url, function(data){
	console.log(data);
	deleteMarkers();
	data.forEach(function(d){
	    addMarker(d);
	});
    });
}

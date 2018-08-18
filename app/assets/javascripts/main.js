var map;
var markers = [];
var collectionCenterIcon = 'http://res.cloudinary.com/drch6exvq/image/upload/c_scale,h_32/v1534605020/Kerala%20Flood/collection.png'

function initMap() {
    map = new google.maps.Map(
	document.getElementById('map'), {zoom: 4, center: {lat: 10.8505, lng: 76.2711}});

    $.get('/relief_facilities/search', function(data){
	data.forEach(function(d){
	    addMarker(d);
	});
    });
}

function addMarker(data) {
    infoDetails = '<h3>' + data.name + '</h3>' +
	'<div id="address">' + data.humanized_address + '</div><br>' +
	'<div id="details">' + data.details + '</div>'
    
    markerInfo = {location: {position: {lat: data.location.lat, lng: data.location.lon}, icon: null}, info: infoDetails, id: data.id, facilityType: data.facility_type};
    if(data.facility_type == 'relief_material_collection'){
	markerInfo.location.icon = collectionCenterIcon;
    };

    var marker = new google.maps.Marker(markerInfo.location);
    marker.set("id", markerInfo.id);
    infowindow = new google.maps.InfoWindow
    marker.addListener('click', function() {
	infowindow.setContent(markerInfo.info);
	infowindow.open(map, marker);
	url = '/relief_facilities/search?within=' + marker.position.lat() + ',' + marker.position.lng()
	$.get(url, function(data){
	    console.log(data);
	    deleteMarkers();
	    data.forEach(function(d){
		addMarker(d);
	    });
	});
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
    setMapOnAll(map);
}

function deleteMarkers() {
    clearMarkers();
    markers = [];
}

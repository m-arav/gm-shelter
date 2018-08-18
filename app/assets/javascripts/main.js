var map;
var markers = [];
var collectionCenterIcon = 'http://maps.google.com/mapfiles/kml/pal5/icon58.png'
var infowindow = new google.maps.InfoWindow;

function initMap() {
    map = new google.maps.Map(
	document.getElementById('map'), {zoom: 4, center: {lat: 10.8505, lng: 76.2711}});

    $.get('/relief_facilities/search', function(data){
	data.forEach(function(d){
	    infoDetails = '<h3>' + d.name + '</h3>' +
		'<div id="address">' + d.humanized_address + '</div><br>' +
		'<div id="details">' + d.details + '</div>'
	    
	    markerInfo = {location: {position: {lat: d.location.lat, lng: d.location.lon}, icon: null}, info: infoDetails, id: d.id};
	    if(d.facility_type == 'relief_material_collection'){
		markerInfo.location.icon = collectionCenterIcon;
	    };
	    addMarker(markerInfo);
	});
    });
}

function addMarker(markerInfo) {
    var marker = new google.maps.Marker(markerInfo.location);
    marker.set("id", markerInfo.id);
    console.log(markerInfo.location.icon);
    infowindow = new google.maps.InfoWindow
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
    setMapOnAll(map);
}

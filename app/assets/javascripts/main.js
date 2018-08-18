var map;
var markers = [];
var collectionCenterIcon = 'http://res.cloudinary.com/drch6exvq/image/upload/c_scale,h_32/v1534605020/Kerala%20Flood/collection.png'
var shelterIcon = 'http://res.cloudinary.com/drch6exvq/image/upload/c_scale,h_32,q_100/v1534605020/Kerala%20Flood/shelter.png'
var infowindow = null;
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
    nearCCButton = ''
    directionToCCButton = ''
    if(ldata.facility_type != 'relief_material_collection'){
	nearCCButton = 	'<input class="primary-btn" onclick="nearByCollectionCenters('+ ldata.location.lat + ',' + ldata.location.lon + ');" type=button value="Near by collection centers">';
	directionToCCButton = '<input class="primary-btn" onclick="routeToNearestCC('+ ldata.location.lat + ',' + ldata.location.lon + ');" type=button value="Direction to nearest collection center">';
    }
    infoDetails = '<h3>' + ldata.name + '</h3>' +
	'<div id="address"> <b>Address : </b> ' + ldata.humanized_address + '</div><br>' +
	'<div id="details"> <b>Contact : </b>' + ldata.contact + '</div><br>' +
        '<a href="' + 'https://www.google.com/maps/search/?api=1&query=' + ldata.location.lat + ',' + ldata.location.lon + '" target="_blank">Open in Google Maps</a><br><br>' +
	nearCCButton + '<br><br>' + directionToCCButton;

    markerInfo = {location: {position: {lat: ldata.location.lat, lng: ldata.location.lon}, icon: shelterIcon}, info: infoDetails, id: ldata.id, facilityType: ldata.facility_type};
    if(ldata.facility_type == 'relief_material_collection'){
	markerInfo.location.icon = collectionCenterIcon;
    };

    marker = new google.maps.Marker(markerInfo.location);
    marker.set("id", markerInfo.id);
    infowindow = new google.maps.InfoWindow;
    marker.addListener('click', (function(marker, map, markerInfo) {
	return function(){
	    infowindow.setContent(markerInfo.info);
	    infowindow.open(map, marker);
	};
    })(marker, map, markerInfo));

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
    $.get(url, function(data){
	deleteMarkers();
	data.forEach(function(d){
	    addMarker(d);
	});
    });
}

function routeToNearestCC(lat, lng){
    url = '/relief_facilities/search?within=' + lat + ',' + lng;
    $.get(url, function(data){
	nearestCC = data[0];
	if(nearestCC){
	    routeURL = 'https://www.google.com/maps/dir/?api=1&origin=' + lat + ',' + lng + '&destination=' + nearestCC.location.lat + ',' + nearestCC.location.lon
	    var win = window.open(routeURL, '_blank');
	} else{
	    alert("No centers within 8 kms");
	}
    });
}

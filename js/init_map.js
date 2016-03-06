function SetHomePosition(map) {
    // location button
    var user_loc;
    var DEFAULT_ZOOM_LEVEL = 12;
    L.easyButton('fa-map-marker', function() {
        map.setView([user_loc.latitude, user_loc.longitude], DEFAULT_ZOOM_LEVEL)
    }).addTo(map);

    // Set the HOME location marker
    map.locate({setView: true, maxZoom: DEFAULT_ZOOM_LEVEL, watch: true})
        .on('locationfound', function(e) {
            user_loc = e;
            console.log("E:", e, e.type);
            L.marker([e.latitude, e.longitude],
                {icon: L.AwesomeMarkers.icon({icon: 'home', prefix: 'fa',markerColor: 'red', shadowSize: [0, 0]})})
                .bindPopup('Your are here :)').addTo(map);
            var service = new google.maps.places.PlacesService(googleMap);
            service.nearbySearch({
                location: new google.maps.LatLng(e.latitude, e.longitude),
                radius: 2000,
                type: ['cafe']
            }, callback);
        });
}

function initMap() {
    var googleMap = new google.maps.Map(document.getElementById("googleMap"),
                                        { mapTypeId:'ROADMAP', zoom: 14});
    var googleLayer = new L.Google('TERRAIN');
    var openmaps = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png');
    map = new L.Map("map", { zoom: 9});
    //map.addLayer(openmaps);
    map.addLayer(googleLayer);
    SetHomePosition(map);
}

function callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
        }
    }
}

function createMarker(place) {
    var lat = place.geometry.location.lat();
    var lng = place.geometry.location.lng();
    console.log(lat);
    console.log(lng);
    L.marker([lat,lng]).bindPopup('You are here').addTo(map);
}

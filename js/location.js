function initLocation(map) {
    // latlng are required, but don't care where this is initially -
    // not displayed until user manually updates their location.
    const locationMarker = new google.maps.Marker({
        position: { lat: 0, lng: 0 },
        icon: { // similar to google dot
            path: google.maps.SymbolPath.CIRCLE,
            fillColor: '#4285f4',
            fillOpacity: 1,
            strokeColor: '#fff',
            strokeOpacity: 1,
            strokeWeight: 2,
            scale: 6
        }
    })

    function setLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(updateMap, function () { }, { enableHighAccuracy: false })
        } else {
            alert("Geolocation is not supported by this browser.")
        }
    }

    function updateMap(position) {
        const currentLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
        map.setCenter(currentLocation)
        locationMarker.setMap(map)
        locationMarker.setPosition(currentLocation)
    }

    document.getElementById("updateLocation").onclick = setLocation
}
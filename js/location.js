function initLocation(map) {
    // latlng are required, but don't care where this is initially -
    // not displayed until user manually updates their location.
    const locationMarker = new google.maps.Marker({lat: 0, lng: 0})

    function setLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(updateMap)
        } else {
            alert("Geolocation is not supported by this browser.")
        }
    }

    function updateMap(position) {
        const mapLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
        map.setCenter(mapLocation)
        locationMarker.setMap(map)
        locationMarker.setPosition(mapLocation)
    }

    document.getElementById("updateLocation").onclick = setLocation
}
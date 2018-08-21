function initLocation(map) {
    const locationButton = document.getElementById("updateLocation")
    locationButton.onclick = handleLocationClick
    if (navigator.geolocation) {
        locationButton.disabled = false
    }

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
            scale: 6,
            labelOrigin: new google.maps.Point(0, 3)
        }
    })

    function handleLocationClick() {
        if (navigator.geolocation) {
            disableLocationUI()
            navigator.geolocation.getCurrentPosition(positionUpdateSuccess, positionUpdateError, { enableHighAccuracy: true })
        } else {
            alert("Geolocation is not supported by this browser.")
        }
    }

    function positionUpdateError() {
        alert("could not find location")
        reenableLocationUI()
    }

    function disableLocationUI() {
        locationButton.disabled = true
    }

    function reenableLocationUI() {
        locationButton.disabled = false
    }

    function positionUpdateSuccess(position) {
        updateMap(position)
        reenableLocationUI()
    }

    function updateMap(position) {
        const currentLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
        map.setCenter(currentLocation)
        locationMarker.setMap(map)
        locationMarker.setPosition(currentLocation)
        locationMarker.setLabel({
            color: '#4285f4',
            text: `within ${position.coords.accuracy.toString().split(".")[0]} meters`,
            fontWeight: 'bold',
            fontSize: '10px'
        })
        window.anthony = locationMarker
    }
}
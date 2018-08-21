function initLocation(map) {
    var locationTrackingId
    const locationCheckbox = document.getElementById("updateLocation")
    locationCheckbox.onclick = handleLocationClick
    if (navigator.geolocation) {
        locationCheckbox.disabled = false
    }

    const locationMarker = new google.maps.Marker({
        // latlng are required, but don't care where this is initially -
        // not displayed until user manually updates their location.
        position: { lat: 0, lng: 0 },
        visible: false,
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

    function handleLocationClick(event) {
        if (navigator.geolocation) {
            if (event.target.checked) {
                startLocationTracking()
            } else {
                stopLocationTracking()
            }
        } else {
            alert("Geolocation is not supported by this browser.")
        }
    }

    function startLocationTracking() {
        locationTrackingId = navigator.geolocation.watchPosition(
            onNewPosition, positionUpdateError, { enableHighAccuracy: true })
    }

    function stopLocationTracking() {
        navigator.geolocation.clearWatch(locationTrackingId)
        locationMarker.setVisible(false)
    }

    function positionUpdateError() {
        alert("could not find location")
    }

    function onNewPosition(position) {
        updateMap(position)
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
        locationMarker.setVisible(true)
        window.anthony = locationMarker
    }
}
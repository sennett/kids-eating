function initLocation(map) {
    var locationTrackingId = null
    var locationToggler = document.getElementById("showLocation")
    locationToggler.onclick = handleLocationClick

    var locationMarker = new google.maps.Marker({
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

    function handleLocationClick() {
        if (navigator.geolocation) {
            if (locationTrackingId === null) {
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
        removeClass(locationToggler, "location-track-icon--tracking-disabled")
        addClass(locationToggler, "location-track-icon--tracking-loading")
    }

    function stopLocationTracking() {
        navigator.geolocation.clearWatch(locationTrackingId)
        locationMarker.setVisible(false)
        locationTrackingId = null
        removeClass(locationToggler, "location-track-icon--tracking-loading")
        removeClass(locationToggler, "location-track-icon--tracking-enabled")
        addClass(locationToggler, "location-track-icon--tracking-disabled")
    }

    function positionUpdateError(positionError) {
        stopLocationTracking()
    }

    function onNewPosition(position) {
        removeClass(locationToggler, "location-track-icon--tracking-loading")
        addClass(locationToggler, "location-track-icon--tracking-enabled")
        updateMap(position)
    }

    function updateMap(position) {
        var currentLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
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
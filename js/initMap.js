var DEFAULT_ZOOM = 12
var DEFAULT_CENTRE = {
    lat: 41.3937221351275,
    lng: 2.158396155313767
}

var MAP_STYLES = [
    {
        "featureType": "poi.business",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    }
]

var centre = localStorage.getItem('mapCentreLat') ? {
    lat: Number(localStorage.getItem('mapCentreLat')),
    lng: Number(localStorage.getItem('mapCentreLng'))
} : DEFAULT_CENTRE

var zoom = localStorage.getItem('mapZoom') ? Number(localStorage.getItem('mapZoom')) : DEFAULT_ZOOM

function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: zoom,
        center: centre,
        styles: MAP_STYLES
    });

    map.addListener('center_changed', function () {
        var latLng = map.getCenter()
        localStorage.setItem('mapCentreLat', latLng.lat())
        localStorage.setItem('mapCentreLng', latLng.lng())
    })

    map.addListener('zoom_changed', function () {
        localStorage.setItem('mapZoom', map.getZoom())
    })

    return map
}
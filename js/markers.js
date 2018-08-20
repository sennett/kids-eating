function initMarkers (map, restaurants) {
    var infowindow = new google.maps.InfoWindow()

    var infowindowTemplate = _.template(document.getElementById("infoWindowTemplate").innerHTML)

    restaurants.forEach(function (restaurant) {
        var marker = new google.maps.Marker({
            position: restaurant,
            map: map
        })

        if (restaurant.blue) {
            marker.setIcon("https://maps.google.com/mapfiles/ms/icons/blue-dot.png")
        }

        marker.addListener('click', function () {
            infowindow.close()
            restaurant.mapsQueryParam = encodeURIComponent(restaurant.name + " " + restaurant.address)

            infowindow.setContent(infowindowTemplate(restaurant))
            infowindow.open(map, marker)
        })
    })
}
function initMarkers(map, restaurants) {
    var AMENITY_TO_EMOJI_MAP = {
        highchairs: '💺',
        playarea: '🎲',
        coffee: '☕',
        snacks: '🥐',
        alcohol: '🍷',
        meals: '🍽️',
        changing: '💩'
    }

    var infowindow = new google.maps.InfoWindow()

    var infowindowTemplate = _.template(document.getElementById("infoWindowTemplate").innerHTML)

    restaurants.forEach(function (restaurant) {
        var marker = new google.maps.Marker({
            position: restaurant,
            map: map
        })

        if (restaurant.blue) {
            marker.setIcon("https://maps.google.com/mapfiles/ms/icons/blue-dot.png")
        } else {
            marker.setIcon("https://maps.google.com/mapfiles/ms/icons/pink-dot.png")
        }

        marker.addListener('click', function () {
            infowindow.close()
            restaurant.mapsQueryParam = encodeURIComponent(restaurant.name + " " + restaurant.address)

            if (restaurant.amenities) {
                restaurant.emojis = mapAmenitiesToEmojis(restaurant.amenities)
            }

            infowindow.setContent(infowindowTemplate(restaurant))
            infowindow.open(map, marker)
        })

    })

    function mapAmenitiesToEmojis(amenities) {
        return _.chain(amenities)
            .mapValues(function (amenityScore, amenity) {
                return _.repeat(AMENITY_TO_EMOJI_MAP[amenity], amenityScore)
            }).reduce(function (result, value) {
                return result += value
            }).value()
    }
}
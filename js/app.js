function initApp() {
    var map = initMap()
    initMarkers(map, restaurants)
    initHelpScreen()
    initLocation(map)
}
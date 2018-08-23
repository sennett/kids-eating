function initApp() { // called by google maps script loading
    var map = initMap()
    initMarkers(map, restaurants)
    initHelpScreen()
    initLocation(map)
}
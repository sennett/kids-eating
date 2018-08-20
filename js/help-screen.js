function initHelpScreen () {
    document.getElementById('openHelpScreen').onclick = function () {
        const helpScreen = document.getElementById('helpScreen')
        helpScreen.className = _(helpScreen.className)
            .split(" ")
            .without("help-screen--closed")
            .concat("help-screen--open")
            .join(" ")
        
    }
}
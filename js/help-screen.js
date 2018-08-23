function initHelpScreen () {
    document.getElementById('openHelpScreen').onclick = function () {
        var helpScreen = document.getElementById('helpScreen')
        removeClass(helpScreen, "help-screen--closed")
        addClass(helpScreen, "help-screen--open")
    }
    
    document.getElementById('closeHelpScreen').onclick = function () {
        var helpScreen = document.getElementById('helpScreen')
        removeClass(helpScreen, "help-screen--open")
        addClass(helpScreen, "help-screen--closed")        
    }    
}
function removeClass(element, className) {
    element.className = _(element.className)
        .split(" ")
        .without(className)
        .join(" ")
}

function addClass(element, className) {
    element.className = _(element.className)
        .split(" ")
        .concat(className)
        .join(" ")
}
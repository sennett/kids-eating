function popupTypeform (tfUrl) {
    const embedInstance = typeformEmbed.makePopup(tfUrl, {
        autoClose: 3000, // not working
        hideHeaders: true, // neither of these work
        hideFooters: true, // neither of these work
        // autoclose not working :D
        onSubmit: function () {
            setTimeout(function () {
                embedInstance.close()
            }, 3000)
        }
    })
    embedInstance.open()
}
$.ajax('/admin/all').done( function (data) {
    console.log('Ajax Response: ' + JSON.stringify(data));
})
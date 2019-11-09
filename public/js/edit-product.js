//Handles all the js procedures connected with editing the product

$(document).submit( '#editProduct', function(e){
    e.preventDefault();

    let data = $('#editProduct').serialize();
    console.log(data);
    let link = "/admin/edit/" + document.getElementById("product_id").value;
    
    //Put request for the form
    $.post({
        type: "PUT",
        url: link,
        data: data,
        dataType: "JSON",
        success: function (response) {
            console.log("Successfully updated " + response);
        },
        error: function (response) {
            console.log("Failure: " + response);
        },

    });
})
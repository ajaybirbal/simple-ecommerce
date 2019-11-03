$.ajax('/admin/all').done( function (data) {

    let productTable = $('#productsTable');
    $('#loadingMessage').remove();
    if (data) {
        data.forEach(element => {
            productTable.append(`<tr><td>${element.title}</td>
                                     <td>${element.description}</td>
                                     <td>${element.price}</td>
                                     <td>${element.shipping.timeNeeded}</td>
                                     <td>${formatTime(element.shipping.price)}</td>
                                     <td>${element.quantity}</td>
                                     <td>${element.DateAdded}</td>
                                     <td>${element.tags}</td>
                                     <td><a href="admin/edit/${element._id}">Edit</a></td>
                                     <td><a href="admin/delete/${element._id}" id="deleteLink">Delete</a></td>
                                </tr>`);
        });
    } else {
        productTable.append(`No Products Found!`)
    }

    $('#deleteLink').click(() => {

        var url = $(this).attr('href');
        
        //remove the current item from the database also
        $.ajax(url).done( function(params) {
            $(this).parent().parent().remove();
        })
    });
    

    //Format Date time to a readable
    function formatTime(dateTime) {
        return dateTime;
    }
})


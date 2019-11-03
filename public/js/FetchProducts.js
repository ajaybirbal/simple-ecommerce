//Set the productTable
const productTable = $('#productsTable');


//Loads the table as soon as table starts
$(document).ready( function () {
    getAllProducts();
    
})

$(document).submit( '#newProductForm', function(e) {
    e.preventDefault();
    
    //Create data for submission to database
    let data = $('#newProductForm').serialize();
    console.log("Form submitted: " + data);

    $.post({
        url: '/admin/add',
        type: 'POST',
        data: data,
        dataType: 'json'
    }).done( response => {
        resetProductTable();
        console.log("Successfully added products to the database!")
    }).fail( function (response) {
        console.log('Error New Product: ' + response);
    })
})

//Gets all the products from the database
function getAllProducts(){
    $.ajax('/admin/all').done( function (data) {

        const productTable = $('#productsTable');
        if (productTable.css("visibility", "hidden")) {
            productTable.css("visibility", "visible");
        }
        productTable.css("visibility", "visible");
        $('#loadingMessage').remove();
        if (data) {
            data.forEach(element => {
                productTable.append(`<tr class="productRows"><td>${element.title}</td>
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
        console.log("Leaving get all products!");
    })
}

function resetProductTable(){
    $('.productRows').remove();
    console.log('Reset enabled!');
    productTable.css("visibility", "hidden");
    getAllProducts();
}



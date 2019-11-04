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

    $.post({
        url: '/admin/add',
        type: 'POST',
        data: data,
        dataType: 'json'
    }).done( response => {
        resetProductTable();
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
                                         <td><input type='button' data-deleteLink='admin/delete/${element._id}' id="deleteProduct" value="Delete"></td>
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

//When delete button is clicked
$('#deleteProduct').click( function (params) {
    const link = this.data("deleteLink");
    console.log(link);
})


$(document).on('click', '#deleteProduct', function (e) {
    const link = $(this).data('deletelink');
    ajaxDeleteRequest(link)
})


//Deletes the item from the database
function ajaxDeleteRequest(link){
    $.ajax({
        url: link,
        method: "DELETE"
    }).done(function (data) {
        resetProductTable();
    }).fail(function (err) {
        console.log("Ajax Delete Error: " + err);
    })


}


































// $('#newProductForm').on('submit', function (e) {

//     console.log("Form is being called!");
//     e.preventDefault();
//     $.ajax({
//         url: '/admin/add',
//         type: 'POST',
//     }).done( response => {
//         resetProductTable();
//         console.log("Admin add is being requested!")
//     })
// })

// $('#deleteLink').click(() => {

//     var url = $(this).attr('href');
    
//     //remove the current item from the database also
//     $.ajax(url).done( function(params) {
//         $(this).parent().parent().remove();
//     })
// });

    

    //Format Date time to a readable
    function formatTime(dateTime) {
        return dateTime;
    }












// //Reloads the table when new product is added to the table
// $('#addProductButton').click(async function (e) {
//     e.preventDefault();

//     const newProductForm = $('#newProductForm');
//     //Sends the data to the server
//     $.ajax({
//         url: '/admin/add',
//         type: 'POST',

//     })

//     //Gets all data from the table
//     productTable.css("visibility", "hidden");
//     getAllProducts();
// })
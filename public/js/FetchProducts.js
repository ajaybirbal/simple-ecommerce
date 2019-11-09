//Set the productTable
const productTable = $('#productsTable');

//Add new product variables
let popUp;
let blackOverlay;


//Loads the table as soon as table starts
$(document).ready( function () {
    getAllProducts();

    //Handle add new product     box
    popUp = document.getElementById("add-new-product");
    blackOverlay = document.getElementById("black-overlay");
    
    //Handle add new product     box
    document.getElementById("showAddProductBox").addEventListener('click', function (event) {
        showAddProductPopup();
    });
    
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
        hideAddNewpopup();
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
                                         <td>${element.price}</td>
                                         <td>${element.shipping.timeNeeded}</td>
                                         <td>${formatTime(element.shipping.price)}</td>
                                         <td>${element.quantity}</td>
                                         <td>${element.DateAdded}</td>
                                         <td><a href="admin/edit/${element._id}" class="link-button-admin table-button">Edit</a>
                                         <button data-deleteLink='admin/delete/${element._id}' id="deleteProduct" value="Delete">Delete</button></td>
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

//Format Date time to a readable
function formatTime(dateTime) {
    return dateTime;
}


let showAddProductPopup  = function(){

    let crossPopup = document.getElementById("cross-add-product");

    popUp.style.opacity = "1";
    blackOverlay.style.display = "block";

    crossPopup.addEventListener('click', event => {
        hideAddNewpopup();
    })

    //Add code if someone clicks on somewhere else closr
}

function hideAddNewpopup(){
    popUp.style.opacity = "0";
    blackOverlay.style.display = "none";
}
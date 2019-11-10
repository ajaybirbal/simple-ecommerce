//Set the productTable
const productTable = $('#productsTable');

//Add new product variables
let popUp;
let blackOverlay;


//Loads the table as soon as table starts
$(document).ready( function () {
    getAllProducts();

    let dropArea = document.getElementById('image-drop-area');
    console.log(dropArea);

    //Handle add new product     box
    popUp = document.getElementById("add-new-product");
    blackOverlay = document.getElementById("black-overlay");
    
    //Handle add new product     box
    document.getElementById("showAddProductBox").addEventListener('click', function (event) {
        showAddProductPopup();
    });

    //----------------Handle drag andd drop box-----------------------------------------------------
    //Add prevent default to each of the function
    ;['dragenter', 'dragover', 'dragleave','drop'].forEach( eventName => {
        dropArea.addEventListener(eventName, preventDefaults, false);
    })

    ;['dragenter', 'dragover'].forEach(eventName => {
        dropArea.addEventListener(eventName, highlight, false);
    })

    ;['dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, unhighlight, false);
    })

    dropArea.addEventListener('drop', handleDrop, false);

    //Processes the file upload process
    function handleDrop(e) {
        let xhr = new XMLHttpRequest(),
            data = new FormData();
    
        data.append('file_upload', e.dataTransfer.files[0]);

        xhr.open('POST', '/admin/upload/', true);
        xhr.send(data);
        xhr.onerror = function(e){
            console.log("File upload error: " + e);
        }

        //Run code on success
        
    }

    function highlight(e) {
        dropArea.classList.add('highlight');
    }

    function unhighlight(e) {
        dropArea.classList.remove('highlight');
    }

    function preventDefaults (e) {
        e.preventDefault()
        e.stopPropagation()
    }
    //-----------------------------End drag drop code---------------------------------------
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

    console.log(data);
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
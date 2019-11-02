$.ajax('/admin/all').done( function (data) {

    //data = JSON.stringify(data);
    let productTable = $('#productsTable');

    data.forEach(element => {
        productTable.append(`<tr><td>${element.title}</td>
                                 <td>${element.description}</td>
                                 <td>${element.price}</td>
                                 <td>${element.shipping.timeNeeded}</td>
                                 <td>${element.shipping.price}</td>
                                 <td>${element.quantity}</td>
                                 <td>${element.DateAdded}</td>
                                 <td>${element.DateAdded}</td>
                                 <td>${element.tags}</td>
                                 <td><a href="">Edit</a></td>
                                 <td><a href="">Delete</a></td>
                            </tr>`);
    });
})


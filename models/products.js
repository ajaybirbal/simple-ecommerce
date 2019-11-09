//Schema for user schema table


const mongoose = require('mongoose');

let productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique:true
    },
    description:{
        type:String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String
    },
    shipping: {
        timeNeeded: Number,
        price: {
            type: Number,
            require: true
        }
    },
    DateAdded: {
        type: Date,
        default: Date.now()
    },
    seller: {
        Id: {
            type: String
        }
    },
    quantity: {
        type: Number
    },
    tags: [String]
})

let Products = mongoose.model('Products', productSchema);


exports.Products = Products;

//Outputs all the product sold by the seller
exports.findAllProducts = async function(sellerId){
    try {
        return await Products.find( { 'seller.Id' : sellerId}); 
    } catch (error) {
        console.log(e);
    }
}

exports.deleteProduct = async function(id) {
    try {
        return await Products.deleteOne( {_id: id}, function (err) {
            if (err) return handleError(err);
        })
    } catch (error) {
        console.log(error);
    }
}

exports.findProduct = async function(id){
    try {
        return await Products.findOne( {_id: id}, function (err) {
            if (err) return handleError(err);
        } )
    } catch (error) {
        console.log(error);
    }
}

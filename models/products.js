//Schema for user schema table


const mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
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

let Products = mongoose.model('Products', userSchema);


exports.Products = Products;
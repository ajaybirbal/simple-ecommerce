//Responsible for adding new products to the Products database

const express =require('express');
const router = express.Router();

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ecommerce-site', {useNewUrlParser: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    //console.log('Connection to db Successful!');
});

const {Products} = require('./../../models/products');

const config = require('config');

const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());




router.post('/', async (req,res) => {

    console.log("Admin add is called");
    console.log("Prduct image: " + req.files.product_image);
    
    //Check whether req is made by ajax protocol
    if (req.xhr) {
        const data = JSON.parse(JSON.stringify(req.body))
        try {
            let product = new Products({
                title: req.body.title,
                description: req.body.description,
                price: req.body.price,
                shipping: {
                    timeNeeded: req.body.shippingTime,
                    price: req.body.shippingCharge
                },
                seller: {
                    Id: req.session.userId
                },
                quantity: req.body.quantity,
                tags: req.body.tags
            })
            product.save();
        } catch(err){
            console.log(`Database error: ${err} `);
            res.send(500).send(err);
        }

        //Send the success code
        //After that final code will be executed
        let response = {
            status: 200
        }
        res.end(JSON.stringify(response));

    } else {
        try {
            let product = new Products({
                title: req.body.title,
                description: req.body.description,
                price: req.body.price,
                shipping: {
                    timeNeeded: req.body.shippingTime,
                    price: req.body.shippingCharge
                },
                seller: {
                    Id: req.session.userId
                },
                quantity: req.body.quantity,
                tags: req.body.tags
            })
            product.save();
        } catch(err){
            console.log(`Database error: ${err} `);
            res.send(500).send(err);
        }
    }

})

router.get('/', (req,res) => {
    res.render('./../../views/404.pug');
})


module.exports = router;
var express = require('express');
var router = express.Router();
const config = require('config');

const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

let userId;

//Middleware to check existence of the session
const sessionValidator = require('./../controller/session-validation')
router.use(sessionValidator);

const {Products} = require('./../models/products');

const addNewProductRouter = require('./../controller/admin-controllers/add-new-product');
router.use('/add', addNewProductRouter );

router.get('/', async function (req,res) {

    
    userId = req.session.userId;

    res.render('./../views/admin/admin.pug', {user: userId});

    //Gets all the products being sold by the particular seller
    const allProducts = await findAllProducts(userId);
    console.log(allProducts);
})

async function findAllProducts(sellerId) {

    try {
        return await Products.find( { 'seller.Id' : sellerId}); 
    } catch (error) {
        console.log(e);
    }
}

module.exports = router;
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

const findAllProducts = require('./../models/products').findAllProducts;
const deleteProduct = require('./../models/products').deleteProduct;

const addNewProductRouter = require('./../controller/admin-controllers/add-new-product');
router.use('/add', addNewProductRouter );

router.get('/', async function (req,res) {
    userId = req.session.userId;
    res.render('./../views/admin/admin.pug', {user: userId});
})

//Log out function
//Destroys the whole session
router.get('/logout', (req,res) => {
    req.session.destroy( function (err) {
        if (err) {
            console.log("Error destroting session: " + err)
        }
        res.redirect('/');
    })
})


router.get('/all', async(req,res) => {
    
    const isAjaxRequest = req.xhr;
    
    if (isAjaxRequest) {
        try {
            const allProducts = await findAllProducts(userId);
            res.json(allProducts);
        } catch (error) {
            console.log(error);
        }
    } else {
        res.status(404).render('./../views/404.pug')
    }
})

router.delete('/delete/:id', async (req, res) => {
    
    try {
        await deleteProduct(req.params.id)
    } catch (error) {
        console.log(error);
    }

    let response = {
        status: 200
    }
    res.end(JSON.stringify(response));
})

module.exports = router;
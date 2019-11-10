var express = require('express');
var router = express.Router();
const config = require('config');

const fileUpload = require('express-fileupload');
router.use(fileUpload());

const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

let userId;

//Middleware to check existence of the session
const sessionValidator = require('./../controller/session-validation')
router.use(sessionValidator);

const { Products, findAllProducts,deleteProduct, findProduct }   = require('./../models/products');


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

router.get('/edit/:productId', async (req, res) => {
    try {
        const product = await findProduct(req.params.productId);
        res.render('./../views/admin/admin-edit.pug', {product: product});
    } catch (error) {
        console.log(error);
    }
})

router.put('/edit/:productId', async (req,res) => {
    if (req.xhr) {
        let data = JSON.parse(JSON.stringify(req.body));

        await Products.update(
            { _id: req.body.id},
            {
                title: req.body.title,
                description: req.body.description,
                price: req.body.price,
                shipping: {
                    timeNeeded: req.body.shippingTime,
                    price: req.body.shippingCharge
                },
                quantity: req.body.quantity,
                tags: req.body.tags
            }, function(){
                let response = {
                    status: 200
                }
                res.end(JSON.stringify(response));
            }
        )

    } else {    
        res.render('./../views/404.pug');
    }
})


//Responsible for handling the files upload
//Function worked after instaling - express-fileupload
//use ./ in directory for code to work
router.post('/upload/', (req, res) => {
    
        
    const image = req.files.file_upload;

    image.mv( './uploads/product/' + image.name, function(error){
        if (error) console.log(error);
    })

})

module.exports = router;
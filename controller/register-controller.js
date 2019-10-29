//Controls all the task connected with the registrations

const express =require('express');
const router = express.Router();

const bcrypt = require('bcrypt');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ecommerce-site', {useNewUrlParser: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    //console.log('Connection to db Successful!');
});

const { Users } = require('./../models/user');

const config = require('config');

const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.post('/', (req, res) => {

    //Perform validation here - Feature to be added later 
    //Return if validation fails
    
    //Save the data to the database
    let hashPassword = encryptPassword(req.body.password, (password, salt) => {

        try {
            let user = new Users({
                username: req.body.username,
                email: req.body.email,
                password: password,
                salt: salt
            })
            user.save();
    
        } catch(err){
            console.log(`Database error: ${err} `);
            res.send(500).send(err);
        }
    });

    //If new user was created then send the success message to the user on homepage


})


//Function to hash and encrypt password
function encryptPassword(password, callback) {
    bcrypt.genSalt(config.get('passwordSecurity.saltRounds'), function (err, salt) {
        bcrypt.hash(password, salt, function (err, hash) {            
            callback(hash, salt.toString());
        })
    })
}


module.exports = router;



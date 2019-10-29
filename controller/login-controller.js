//Controls all task connected with the login

const express =require('express');
const router = express.Router();

const config = require('config');

const bcrypt = require('bcrypt');

const mongoose = require('mongoose');
mongoose.connect(config.get('mongoose.address'), {useNewUrlParser: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Connection to db Successful!');
});

const { Users } = require('./../models/user');



const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.post('/', (req, res) => {

    //add a validation function here later

    Users.findOne({username: req.body.username}, (err, user) => {

        if (err) console.log("Database error: " + err);

        let passwordMatch = checkUser(req.body.password, user.password);

        if (passwordMatch) {
            console.log("Successfully logged in");
        } else {
            console.log("Login failed");
        }
        
    })




})

async function checkUser(password, dbPassword) {
    return await bcrypt.compare(password,dbPassword);
}

module.exports = router;
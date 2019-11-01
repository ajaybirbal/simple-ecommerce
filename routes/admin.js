var express = require('express');
var router = express.Router();
const config = require('config');


let userId;

router.get('/', function (req,res) {

    if (req.session.userId){
        //Assigns user id to be used in whole admin area
        userId = req.session.userId;

        console.log("Session test from admin " + userId)
        res.render('./../views/admin/admin.pug');

    } else {
        res.send("You need to login first!");
    }
})

module.exports = router;
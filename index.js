const express =require('express');
const app = express();

const config = require('config');

const pug = require('pug');
app.set('view engine', 'pug');


const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//Admin page router
const adminRouter = require('./routes/admin');
app.use('/admin', adminRouter);



//Home page
app.get('/', (req, res) => {
    res.render('index');

    console.log(config.get('passwordSecurity.saltRounds'));

})



//Handle the code when someone clicks on regsitration option
const registerController = require('./controller/register-controller');
app.use('/register', registerController);



app.listen(3000, function () {
    console.log('Server up and running');
})
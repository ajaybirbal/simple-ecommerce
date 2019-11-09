const express =require('express');
const app = express();

var path = require('path');

const config = require('config');

app.use(express.static('public'));

const session = require('express-session');

//Sass settings from here
// var sassMiddleware = require('node-sass-middleware');
// app.use(sassMiddleware({
//     /* Options */
//     src: path.join(__dirname, '/public/css/'),
//     dest: path.join(__dirname, 'public/css'),
//     debug: true,
//     outputStyle: 'compressed',
// }));

console.log('dirname: '+path.join(__dirname, '/public/css/style.scss'));

//Session storage in database
const  MongoDBStore = require('connect-mongodb-session')(session);
//Make a config file for mongodb location and the collection
const store = new MongoDBStore({
    uri: "mongodb://localhost/ecommerce-site",
    collection: "sessionInfo"
})
store.on('error', function(error) {
    console.log(error);
});

//Set session 
app.use(session({
    secret: config.get('secretKey.key'),
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
        maxAge: 6000000
    },
    store: store
}))

//Set view engine
const pug = require('pug');
app.set('view engine', 'pug');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Handle the code when someone clicks on regsitration option
const registerController = require('./controller/register-controller');
app.use('/register', registerController);

//Handle login button and then redirection to admin
const loginController = require('./controller/login-controller');
app.use('/login', loginController);

//Admin page router
const adminRouter = require('./routes/admin');
app.use('/admin', adminRouter);

//Home page
app.get('/', (req, res) => {
    res.render('index');
})

app.listen(3000, function () {
    console.log('Server up and running');
})
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const checkForSession = require('./middlewares/checkForSession');
const sc = require('./controllers/swag_controller');
const auth = require('./controllers/auth_controller');
const cart = require('./controllers/cartController');
const search = require('./controllers/searchController');
require('dotenv').config();

const app = express();

app.use(bodyParser.json());

app.use(session({
    secret: "process.env.SESSION_SECRET",
    saveUninitialized: false,
    resave: false,
}));

app.use(checkForSession);
app.use( express.static( `${__dirname}/build` ) );


//------------------------- Routes

app.get('/api/swag', sc.read);

app.post('/api/login', auth.login);
app.post('/api/register', auth.register);
app.post('/api/signout', auth.signout);
app.get('/api/user', auth.getUser);

app.post('/api/cart', cart.add);
app.post('/api/cart/checkout', cart.checkout);
app.delete('/api/cart', cart.delete);

app.get('/api/search', search.search);





app.listen(3000, () => console.log("Server running"));


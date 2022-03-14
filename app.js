require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
//const session = require('express-session');
//const jsonwebtoken = require('jsonwebtoken');
const bodyParser = require('body-parser');

const router = require('./Back/app/router');

const app = express();
app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(bodyParser.urlencoded({
    extended: false
}))

/*app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');

// response to preflight request
if (req.method === 'OPTIONS') {
    res.sendStatus(200);
} else {
    next();
}
});*/

const jwtSecret = process.env.SECRET;

// app.use(session({
//     secret: process.env.SECRET,
//     saveUninitialized: true,
//     resave: true
// }))

app.use(router);

app.listen(process.env.PORT || 3000, () => {
    console.log('Server running on :', process.env.PORT);
});
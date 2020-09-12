'use strict';
var http = require('http');
var port = /*process.env.PORT ||*/ 1337;
const express = require('express')
const bodyParser = require("body-parser");
const app = express()
const path = require('path');
const db = require('./models/database.js');
const mongoose = require('mongoose');

/*
http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World\n');
}).listen(port);
*/

//connecting to database
try {
  db.connect();
  } catch (e) {console.log(e);}

app.use(express.static(__dirname + '/public'));

// session
const session = require('express-session');

app.use(session({
  'secret': 'a',
  'resave': false,
  'saveUninitialized': false
}));

//Middlewares
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Main menu
const LogInController = require('./controllers/loginController.js');

//Start the app with login page
app.get("/" , LogInController.getLoginPage);

//Routes
const loginRoutes = require('./router/loginRoutes');
const mainRoutes = require('./router/mainRoutes');
const adminRoutes = require('./router/adminRoutes');
//Routes
app.use('/', mainRoutes);
app.use('/', loginRoutes);
app.use('/', adminRoutes);

// Handlebars
const hbs = require('hbs');
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');

app.listen(port, () => {
  console.log('App listening at : localhost:' + port)
})

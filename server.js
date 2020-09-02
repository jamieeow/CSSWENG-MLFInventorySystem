'use strict';
var http = require('http');
var port = process.env.PORT || 1337;
const express = require('express')
const bodyParser = require("body-parser");
const app = express()
const path = require('path');

/*
http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World\n');
}).listen(port);
*/

app.use(express.static(__dirname + '/public'));

//Middlewares
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Main menu
const MainController = require('./controllers/mainController');

//Start the app with login page
app.get("/" , MainController.getMain);

//Routes
const loginRoutes = require('./router/loginRoutes');
const mainRoutes = require('./router/mainRoutes');
//Routes
app.use('/', mainRoutes);
app.use('/login', loginRoutes);

// Handlebars
const hbs = require('hbs');
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');

app.listen(port, () => {
  console.log('App listening at : localhost:' + port)
})

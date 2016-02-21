var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var handler = require('./post-handler.js');

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());

app.post('/login', handler.login);
app.post('/user', handler.user);
app.post('/board', handler.board);

app.get('/', function (req, res) {
    res.sendFile(__dirname + 'index.html');
}).listen(3000);
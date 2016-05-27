var express = require('express');
var app = express();
var port = process.env.PORT || 8080;

//Serve Static Files
app.use('/', express.static(__dirname + '/build'));

//Run server
app.listen(port);
console.log('Magic happens on port ' + port);

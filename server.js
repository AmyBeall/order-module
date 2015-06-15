var express = require("express");
var app = express();
var path = require("path");
var morgan  = require('morgan');
 
// for image upload use multer
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, \
	22 Authorization');
	next();
});

// log all requests to the console
app.use(morgan('dev'));

app.use(express.static(__dirname + "/public"));

app.get('*', function(req,res){
	res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.listen(7000, function(){
	console.log("Listening on 7000");
});
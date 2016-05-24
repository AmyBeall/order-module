var express = require("express"),
	app = express(),
	path = require("path"),
	mongoose = require('mongoose'),
	morgan  = require('morgan'),
	bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, 22 Authorization');
	next();
});

mongoose.connect('mongodb://localhost/ikes_inventory');

app.use(morgan('dev'));

app.use(express.static(__dirname + "/public"));

var apiRoutes = require('./app/routes/api')(app,express);
app.use('/api', apiRoutes);

app.get('*', function(req,res){
	res.sendFile(path.join(__dirname + '/public/app/index.html'));
});

app.listen(5000);

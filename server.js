var express = require("express"),
	app = express(),
	path = require("path"),
	mongoose = require('mongoose'),
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

mongoose.connect('mongodb://localhost/Catering_System_inventory');

app.use(express.static(__dirname + "/public"));

var apiRoutes = require('./app/routes/api')(app,express);
app.use('/api', apiRoutes);
var sheetsRoutes = require('./app/routes/sheets')(app,express);
app.use('/sheets', sheetsRoutes);

app.get('*', function(req,res){
	res.sendFile(path.join(__dirname + '/public/app/index.html'));
});

app.listen(5000);

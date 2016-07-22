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

var uristring = process.env.MONGODB_URI;
mongoose.connect(uristring, function (err, res) {
      if (err) {
      console.log ('ERROR connecting to: ' + uristring + '. ' + err);
      } else {
      console.log ('Succeeded connected to: ' + uristring);
      }
    });

app.use(express.static(__dirname + "/public"));

var apiRoutes = require('./app/routes/api')(app,express);
app.use('/api', apiRoutes);

key = {
  client_email: process.env.GOOGLE_EMAIL,
  private_key: JSON.parse(process.env.PRIVATE_KEY)
}
var sheetsRoutes = require('./app/routes/sheets')(app, express, key);
app.use('/sheets', sheetsRoutes);

app.get('*', function(req,res){
  res.sendFile(path.join(__dirname + '/public/app/index.html'));
});
var server = app.listen(process.env.PORT || 8080, function () {
  var port = server.address().port;
  console.log("App now running on port", port);
});

var https = require('https');
var http = require('http');
var parseString = require('xml2js').parseString;

module.exports = function(app) {
	app.get('/gitJobs.json', function(req2, res2){
			//The url we want is: 'www.random.org/integers/?num=1&min=1&max=10&col=1&base=10&format=plain&rnd=new'
		var options = {
		  host: 'jobs.github.com',
		  port: 443,
		  path: '/positions.json?description=developer&location=sf&page=0',
		  method: 'GET'
		};

		var req = https.request(options, function(res) {
		  console.log(res.statusCode);

		  var data = '';
		  res.on('data', function(d) {
		  	data += d;
		  	// process.stdout.write(d);
		  });

		  res.on('end', function(){
		  	res2.send(data);
		  	res2.end();
		  });

		});

		req.on('error', function(e) {
		  console.error(e);
		});

		req.end();
	});
	app.get('/indeedJobs.json', function(req2, res2){
			//The url we want is: 'www.random.org/integers/?num=1&min=1&max=10&col=1&base=10&format=plain&rnd=new'
		var options = {
		  host: 'api.indeed.com',
		  path: '/ads/apisearch?publisher=9067697284373618&q=developer&l=94109&userip=74.61.150.47&useragent=Mozilla/%2F4.0%28Firefox%29&v=2',
		  method: 'GET'
		};

		var req = http.request(options, function(res) {
		  console.log(res.statusCode);

		  var data = '';
		  res.on('data', function(d) {
		  	data += d;
		  	// process.stdout.write(d);
		  });

		  res.on('end', function(){
	 		var xml = data;
			parseString(xml, function (err, result) {
	   			console.log(result);
	   			res2.send(result);
		  		res2.end();
			});
		  	
		  });

		});

		req.on('error', function(e) {
		  console.error(e);
		});

		req.end();
	});
}

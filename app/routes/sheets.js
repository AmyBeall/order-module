var google = require('googleapis');

module.exports = function(app, express){

	var apiRouter = express.Router();
	apiRouter.route('/order')
		
		.post(function(req,res){

			 authorize(addOrder);

			 function addOrder(sheets) {
			 	console.log(sheets);
			 	var spreadsheetId = '1unrdH4prm-LChI74S7aRvW5Rh1YUTspyiQDwyjUBBFw';
			 	var batchUpdateRequest = {requests: req.body};
			 	  	sheets.spreadsheets.batchUpdate({
			 	      spreadsheetId: spreadsheetId,
			 	      resource: batchUpdateRequest
			 	  	}, function(err, response) {
			 	        if(err) {
			 	          // Handle error
			 	          console.log(err);
			 	        }
			 	        res.json(response);
			 	    });
			 };	
		});

			
			
	return apiRouter;	
}
function authorize(callback, request) {
	var key = require('./client_secret.json');

	var jwtClient = new google.auth.JWT(process.env.GOOGLE_EMAIL, null, process.env.PRIVATE_KEY, ['https://www.googleapis.com/auth/spreadsheets'], null);

	jwtClient.authorize(function(err, tokens) {
	  if (err) {
	    console.log(err);
	    return;
	  }
	  var sheets = google.sheets({ version: 'v4', auth: jwtClient });

	  callback(sheets, request);
	});	

}
	// var jwtClient = new google.auth.JWT(key.client_email, null, key.private_key, ['https://www.googleapis.com/auth/spreadsheets'], null);

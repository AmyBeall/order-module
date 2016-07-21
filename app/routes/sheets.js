var google = require('googleapis');

module.exports = function(app, express){

	var apiRouter = express.Router();
	apiRouter.route('/order')
		
		.post(function(req,res){

			 authorize(addOrder);

			 function addOrder(sheets) {

			 	var spreadsheetId = '1unrdH4prm-LChI74S7aRvW5Rh1YUTspyiQDwyjUBBFw';

			 	getEmptyRow(sheets, function(emptyRow){

			 		var batchUpdateRequest = req.body;

			 		emptyRow+=1;

		 			sheets.spreadsheets.values.update({
		 			      spreadsheetId: spreadsheetId,
		 			      valueInputOption: "RAW",
		 			      range : "A"+emptyRow+":Z"+emptyRow,
		 			      resource: batchUpdateRequest
		 			  	}, function(err, response) {
		 			        if(err) {
		 			          // Handle error
		 			          console.log(err);
		 			        }
		 			        console.log(response);
		 			        res.json(response);
		 			    });
			 	})


			 	function getEmptyRow(sheets, callback){
			 		sheets.spreadsheets.get({
			 			spreadsheetId: spreadsheetId,
			 			includeGridData: true
			 			}, function(err, response) {
			 		        if(err) {
			 		          // Handle error
			 		          console.log(err);
			 		        }
			 		   
			 		        emptyRow = response.sheets[0].data[0].rowData.length;

			 			callback(emptyRow);
			 		})
			 	}
			 	
			}	
			 	
			 		
		});

			
			
	return apiRouter;	
}
function authorize(callback, request) {

	var key = JSON.parse(process.env.PRIVATE_KEY);
	var jwtClient = new google.auth.JWT(process.env.GOOGLE_EMAIL, null, key, ['https://www.googleapis.com/auth/spreadsheets'], null);

	jwtClient.authorize(function(err, tokens) {
	  if (err) {
	    console.log(err);
	    return;
	  }
	  var sheets = google.sheets({ version: 'v4', auth: jwtClient });

	  callback(sheets, request);
	});	

}
// var key = require('./client_secret.json');
// var jwtClient = new google.auth.JWT(key.client_email, null, key.private_key, ['https://www.googleapis.com/auth/spreadsheets'], null);
		

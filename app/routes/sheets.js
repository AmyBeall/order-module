var google = require('googleapis');
var spreadsheetId = '1unrdH4prm-LChI74S7aRvW5Rh1YUTspyiQDwyjUBBFw';

module.exports = function(app, express, key){

	var apiRouter = express.Router();
	apiRouter.route('/order')
		
		.post(function(req,res){

			 authorize(key, addOrder, req.body, function(sheetsRes){
			 	res.json(sheetsRes);
			 })			 		
		});
	
	return apiRouter;	
}
function authorize(key, callSheets, request, callback) {

	var jwtClient = new google.auth.JWT(key.client_email, null, 
		key.private_key, ['https://www.googleapis.com/auth/spreadsheets'], null);

	jwtClient.authorize(function(err, tokens) {
		
		if(err) console.log(err);

		var sheets = google.sheets({ version: 'v4', auth: jwtClient });

		callSheets(sheets, request, function(response){
			callback(response);
		});
	});	
}
function addOrder(sheets, request, callback) {

	getEmptyRow(sheets, function(emptyRow){

		sheets.spreadsheets.values.update({
		      
			spreadsheetId: spreadsheetId,
			valueInputOption: "RAW",
			range : "A"+emptyRow+":ZZ"+emptyRow,
			resource: request
		  	
	  	}, function(err, response) {

	        err ? callback(err) : callback(response);
	    });
	})		 	
}
function getEmptyRow(sheets, callback){
	
	sheets.spreadsheets.get({

		spreadsheetId: spreadsheetId,
		includeGridData: true

	}, function(err, response) {
        
        if(err) console.log(err);
   		
   		var row = response.sheets[0].data[0].rowData;
        
        row ? emptyRow = row.length + 1 : emptyRow = 1;

		callback(emptyRow);
	})
}		

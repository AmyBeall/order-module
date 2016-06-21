var fs = require('fs');
var readline = require('readline');
var google = require('googleapis');
var googleAuth = require('google-auth-library');

module.exports = function(app, express){

	var apiRouter = express.Router();
	apiRouter.route('/order')
		
		.post(function(req,res){
			
			var SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
			var TOKEN_DIR = '/app/routes/';
			var TOKEN_PATH = TOKEN_DIR + 'client_token.json';

			fs.readFile(__dirname + '/client_secret.json', function processClientSecrets(err, content) {
			  if (err) {
			    console.log('Error loading client secret file: ' + err);
			    return;
			  }
			  // Authorize a client with the loaded credentials, then call the
			  // Google Sheets API.
			  authorize(JSON.parse(content), addOrder);
			});

			function authorize(credentials, callback) {
			  var clientSecret = credentials.installed.client_secret;
			  var clientId = credentials.installed.client_id;
			  var redirectUrl = credentials.installed.redirect_uris[0];
			  var auth = new googleAuth();
			  var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

			  // Check if we have previously stored a token.
			  fs.readFile(TOKEN_PATH, function(err, token) {
			    if (err) {
			      getNewToken(oauth2Client, callback);
			    } else {
			      oauth2Client.credentials = JSON.parse(token);
			      callback(oauth2Client);
			    }
			  });
			}
			
			function addOrder(auth) {
				var spreadsheetId = '1unrdH4prm-LChI74S7aRvW5Rh1YUTspyiQDwyjUBBFw';
				var batchUpdateRequest = {requests: req.body};
				var sheets = google.sheets('v4');
				  	sheets.spreadsheets.batchUpdate({
				      auth: auth,
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
var fs = require('fs');
var readline = require('readline');
var google = require('googleapis');
var googleAuth = require('google-auth-library');

var SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

module.exports = function(app, express){

	var apiRouter = express.Router();
	apiRouter.route('/order')
		
		.post(function(req,res){
			
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
			  fs.readFile(__dirname + '/client_token.json', function(err, token) {
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
function getNewToken(oauth2Client, callback) {
  var authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES
  });
  console.log('Authorize this app by visiting this url: ', authUrl);
  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.question('Enter the code from that page here: ', function(code) {
    rl.close();
    oauth2Client.getToken(code, function(err, token) {
      if (err) {
        console.log('Error while trying to retrieve access token', err);
        return;
      }
      oauth2Client.credentials = token;
      storeToken(token);
      callback(oauth2Client);
    });
  });
}

/**
 * Store token to disk be used in later program executions.
 *
 * @param {Object} token The token to store to disk.
 */
function storeToken(token) {
  // try {
  //   fs.mkdirSync(TOKEN_DIR);
  // } catch (err) {
  //   if (err.code != 'EEXIST') {
  //     throw err;
  //   }
  // }
 //  process.env.GOOGLE_ACCESS_TOKEN = token["access_token"];
 //  process.env.GOOGLE_TOKEN_TYPE = token["token_type"];
 // process.env.GOOGLE_REFRESH_TOKEN = token["refresh_token"];
 // process.env.EXPIRY_DATE = token["expiry_date"];

  console.log(token);
}	
var fs = require('fs');
var readline = require('readline');
var google = require('googleapis');
var googleAuth = require('google-auth-library');

// If modifying these scopes, delete your previously saved credentials
// at ~/.credentials/sheets.googleapis.com-nodejs-quickstart.json
var SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
var TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
    process.env.USERPROFILE) + '/.credentials/';
var TOKEN_PATH = TOKEN_DIR + 'sheets.googleapis.com-nodejs-quickstart.json';

// Load client secrets from a local file.
fs.readFile('client_secret.json', function processClientSecrets(err, content) {
  if (err) {
    console.log('Error loading client secret file: ' + err);
    return;
  }
  // Authorize a client with the loaded credentials, then call the
  // Google Sheets API.
  authorize(JSON.parse(content), listMajors);
});

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 *
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
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

function listMajors(auth) {
  var spreadsheetId = '1unrdH4prm-LChI74S7aRvW5Rh1YUTspyiQDwyjUBBFw';
  var requests = [];
  // Change the name of sheet ID '0' (the default first sheet on every
  // spreadsheet)
  requests.push({
    updateSheetProperties: {
      properties: {sheetId: 0, title: 'New Sheet Name'},
      fields: 'title'
    }
  });
  // Insert the values 1, 2, 3 into the first row of the spreadsheet with a
  // different background color in each.
  requests.push({
    updateCells: {
      start: {sheetId: 0, rowIndex: 0, columnIndex: 0},
      rows: [{
        values: [{
          userEnteredValue: {numberValue: 1},
          userEnteredFormat: {backgroundColor: {red: 1}}
        }, {
          userEnteredValue: {numberValue: 2},
          userEnteredFormat: {backgroundColor: {blue: 1}}
        }, {
          userEnteredValue: {numberValue: 3},
          userEnteredFormat: {backgroundColor: {green: 1}}
        }]
      }],
      fields: 'userEnteredValue,userEnteredFormat.backgroundColor'
    }
  });
  // Write "=A1+1" into A2 and fill the formula across A2:C5 (so B2 is
  // "=B1+1", C2 is "=C1+1", A3 is "=A2+1", etc..)
  requests.push({
    repeatCell: {
      range: {
        sheetId: 0,
        startRowIndex: 1,
        endRowIndex: 6,
        startColumnIndex: 0,
        endColumnIndex: 3
      },
      cell: {userEnteredValue: {formulaValue: '=A1 + 1'}},
      fields: 'userEnteredValue'
    }
  });
 
  requests.push({
    copyPaste: {
      source: {
        sheetId: 0,
        startRowIndex: 0,
        endRowIndex: 1,
        startColumnIndex: 0,
        endColumnIndex: 3
      },
      destination: {
        sheetId: 0,
        startRowIndex: 1,
        endRowIndex: 6,
        startColumnIndex: 0,
        endColumnIndex: 3
      },
      pasteType: 'PASTE_FORMAT'
    }
  });

  var batchUpdateRequest = {requests: requests}
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
    });
  };
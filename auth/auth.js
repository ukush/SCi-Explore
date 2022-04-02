
// ------------------Imports -----------------//

const request = require("request")

//-- disables certificate verification to allow the OAuth2.0 request

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

// -- callback function 'res' will contain the data requested from the API call

function Authorization(data, res) {
    // -- Create buffer object, specifying utf8 as encoding
    let string = 'sci-toolset'+":"+'st'
    let bufferObj = Buffer.from(string, "utf8");
    
    // Encode the Buffer as a base64 string for the post request

    let base64String = bufferObj.toString("base64");

    // -- Options required for OAuth2.0 

    var options = {
        'method': 'POST',
        'url': 'https://hallam.sci-toolset.com/api/v1/token', // GetAccessToken url
        'headers': {
          'Authorization': `Basic ${base64String}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        form: {

          // -- Takes username and password from middleware

          'username': data.username,
          'password': data.password,
          'scope': 'read write',
          'client_id': 'sci-toolset',
          'client_secret': 'st',
          'grant_type': 'password'
        }
      };

    // -- Sends a request to the api and passing the previously defined options
    // -- Call back function response contains requested data

    request(options, function(error, response) {  
        if (error) {
          throw new Error(error);
        } 
        var data = JSON.parse(response.body)
        // -- res(data) = api data response-- //
        res(data)
    })
  }

  // ------------ Exports ----------------//
  module.exports = { Authorization }
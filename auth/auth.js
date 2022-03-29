
const request = require("request")

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

function Authorization(data, res) {
    // Create buffer object, specifying utf8 as encoding

    let string = 'sci-toolset'+":"+'st'
    let bufferObj = Buffer.from(string, "utf8");
    
    // Encode the Buffer as a base64 string
    let base64String = bufferObj.toString("base64");
    var options = {
        'method': 'POST',
        'url': 'https://hallam.sci-toolset.com/api/v1/token', // getAccessToken
        'headers': {
          'Authorization': `Basic ${base64String}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        form: {
          'username': data.username,
          'password': data.password,
          'scope': 'read write',
          'client_id': 'sci-toolset',
          'client_secret': 'st',
          'grant_type': 'password'
        }
      };
  
    request(options, function(error, response) {  
        if (error) {
          throw new Error(error);
        } 
        var data = JSON.parse(response.body)
        console.log(data)
        res(data)
    })
  }

  module.exports = { Authorization }
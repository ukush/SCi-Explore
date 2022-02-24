const express = require("express")
const router = express.Router()
const bodyparser = require("body-parser")
const request = require("request")
const res = require("express/lib/response")
const url = require('url'); 
const session = require("express-session")


let urlencodedparser = bodyparser.urlencoded( { extended: false })

router.get('/', (req, res) => {
  res.render('login', {layout: 'login-layout'})
})

function Authorization(data, res) {
  // Create buffer object, specifying utf8 as encoding
  let string = data.client_id+":"+data.client_secret
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
        'client_id': data.client_id,
        'client_secret': data.client_secret,
        'grant_type': 'password'
      }
    };

  request(options, function(error, response) {  
      if (error) {
        throw new Error(error);
      } 
      var data = JSON.parse(response.body)
      res(data)
  })
}

router.post('/', urlencodedparser, (request, response) => {
  Authorization(request.body, function(res) {
    if(res.access_token!=null){
      // create a session
      // set session username
      request.session.username = request.body.username
      // authenticate the session
      request.session.authenticated = true
      console.log('Is session authenticated: ' + request.session.authenticated);
      console.log('SessionID: ' + request.sessionID)
      console.log("Session Username: " + request.session.username);
      console.log("Cookie Expiry: " + request.session.cookie.maxAge);
      response.redirect(url.format({ pathname: "/index", query: res, format: 'json' }))
    } else {
      console.log(res)
      response.redirect(url.format({ pathname:"/login", query: res, format: 'json' }))
    }
  })
})

module.exports = router;
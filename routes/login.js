const express = require("express")

const router = express.Router()

const bodyparser = require("body-parser")
const request = require("request")
const res = require("express/lib/response")

let urlencodedparser = bodyparser.urlencoded( { extended: false })

router.get('/', (req, res) => {
  //router.set('view engine', 'ejs')
  res.render('login.ejs')
})

var Authorization = function(data) {
  // Create buffer object, specifying utf8 as encoding
  let string = data.client_id+":"+data.client_secret
  let bufferObj = Buffer.from(string, "utf8");

  // Encode the Buffer as a base64 string
  let base64String = bufferObj.toString("base64");
  var options = {
      'method': 'POST',
      'url': 'https://hallam.sci-toolset.com/api/v1/token',
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

  var req = request(options, function(error, response) {  
      if (error) {
          res.render('login.ejs')
          throw new Error(error);
      } 
      console.log("Response:");
      console.log(JSON.parse(response.body));
    });
};

router.post('/', urlencodedparser, (req, res) => {
  //router.set('view engine', 'ejs')
  Authorization(req.body)
  res.render('index.ejs')
  })


module.exports = router
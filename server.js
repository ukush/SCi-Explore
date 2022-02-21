// import the express library
const express = require('express')
// import path library
const path = require('path')
// import dotenv for global variables
const dotenv = require('dotenv')
//import cors library
const cors = require('cors')

const request = require("request")

const bodyparser = require("body-parser")

let urlencodedparser = bodyparser.urlencoded( { extended: false })
// save port to 
//const PORT = process.env.PORT || 3000

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

// set up a server by simply calling the express() method
const app = express()


// body parser
//app.use(express.json)

// enable cors
//app.use(cors())

/** set up a route
 * Get request
 * param1 - url path
 * param2 - function which takes 3 parameters --> request, response and next
 * Most of the time we dont need the next 
 */
app.get('/', (req, res) => {
    // send an ok status code response back
    //res.sendStatus(304)
 
    // still sends the status code but displays a custom message instead of default
    //res.status(200).send("Welcome!") 
    
    // more commonly, we would be sending back some json
    //res.status(200).json({message: "ok"})

    // maybe we want to send a file to the user to download (simply pass in the path to the file)
    //res.download('server.js')

    // Also commonly, the response will be to render a html - need to give the path
    // By default, the all views are ketp in 'views' folder

    // Need a view engine (ejs library) with npm -i ejs
    app.set('view engine', 'ejs')

    // Now instead of using .html exenstions for our views, we use .ejs
    // param1 is the page you want to render
    // param2 is optional and is any object you want to send to the view
    res.render('index', {text: 'To Sci Discover'})
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
            response.redirect('/login')
            throw new Error(error);
        } 
        console.log("Response:");
        console.log(JSON.parse(response.body));
      });
  };

app.get("/login", (req, res) => {
    app.set('view engine', 'ejs')
    res.render('login', {text: 'login page'})
})

app.post('/login', urlencodedparser, (req, res) => {
    app.set('view engine', 'ejs')
    Authorization(req.body)
    res.render('index', {text:'Login page testing'})
    })

// import the mission router
const missionRouter =  require('./routes/missions')
const req = require('express/lib/request')
//const loginrouter = require('./routes/login')

// link the routes from mission router
app.use('/missions', missionRouter)

//app.use('/login', loginrouter)


// run server on port 3000
app.listen(3000)
//app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
/*
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
            response.redirect('/login')
            throw new Error(error);
        } 
        console.log("Response:");
        console.log(JSON.parse(response.body));
      });
  };
  */
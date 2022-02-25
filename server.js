// ------------------------ IMPORT DEPENDENCIES -----------------------//

// import the express library
const express = require('express')
// import path library
const path = require('path')
// import dotenv for global variables
const dotenv = require('dotenv')
// import the layouts
const layouts = require("express-ejs-layouts")
//import the session api
const session = require('express-session')

const request = require("request")

// save port to 
//const PORT = process.env.PORT || 3000
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

// ------------------------ CREATE EXPRESS APP -----------------------//

// set up a server by simply calling the express() method
const app = express()

// ------------------------ SESSION MANAGEMENT -----------------------//

//const cookieExpiry = 74787 * 1000 // get milliseconds
/*app.use(session({
    secret: 'sci-toolset',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true, maxAge :  cookieExpiry}
}))*/


  // set the authentication details
    const username = 'hallam'
    const password = 'mypassword'
    const clientId = ''
    const secret = 'st'

    // a variable to save a session
    //var session;

// ------------------------ SERVER STATIC FILES -----------------------//

app.use(express.static('public'));

// ------------------------ SET UP VIEW ENGINE -----------------------//

// use the ejs layouts
app.use(layouts)
//set up ejs view engine
app.set('view engine', 'ejs')

// main route
app.get('/', (req, res) => {
    res.render('index')
})

// ------------------------ IMPORT ROUTES -----------------------//

const loginrouter = require('./routes/login')
app.use('/login', loginrouter)

const missionRouter =  require('./routes/missions')
app.use('/missions', missionRouter)

const indexrouter = require('./routes/index')
app.use('/index', indexrouter)


// ------------------------ RUN EXPRESS SERVER -----------------------//

// run server on port 3000
app.listen(3000)
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

const uuid = require('uuid')

const url = require('url')

const authMiddleware = require('./auth/authMiddleware')

// save port to 
const PORT = process.env.PORT || 3000
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

// ------------------------ CREATE EXPRESS APP -----------------------//

// set up a server by simply calling the express() method
const app = express()

// ------------------------ SESSION MANAGEMENT -----------------------//

const cookieExpiry = 74787 * 1000 // get milliseconds
    // Make every request need a session/cookie
app.use(session({
    secret: 'sci-toolset', // this should ideally be a randomly generated string (with sufficient entropy)
    resave: false, // option to resave 
    saveUninitialized: false, // doesn't save unless changed
    cookie: {maxAge: cookieExpiry }
}))

// ------------------------ SET UP VIEW ENGINE -----------------------//

// use the ejs layouts
app.use(layouts)
    //set up ejs view engine
app.set('view engine', 'ejs')

// main route
app.get('/', (req, res) => {
    console.log("SessionID: " + req.sessionID);
    console.log('Is session authenticated: ' + req.session.authenticated);
    if (!(req.session.authenticated)) {
        res.redirect(url.format({ pathname: "/login", query: res, format: 'json' }))
    } else {
        res.render('index')
    }
})

// ------------------------ IMPORT ROUTES -----------------------//

const loginrouter = require('./routes/login')
app.use('/login', loginrouter)

const missionRouter = require('./routes/missions')
app.use('/missions', authMiddleware, missionRouter)

const indexrouter = require('./routes/index')
app.use('/index', authMiddleware, indexrouter)



// ------------------------ SERVER STATIC FILES -----------------------//

// Allow the app to serve static files such as css
app.use(express.static('public'));


// ------------------------ RUN EXPRESS SERVER -----------------------//

// run server on port 3000
app.listen(PORT)
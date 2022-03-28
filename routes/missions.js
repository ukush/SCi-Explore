/**
 * All routes dealing with missions are kept in a single file
 * A router is basically a little mini application that runs along side the main app
 */

// import express
const express = require('express')
const url = require('url'); 
const API = require("./API_calls.js")
const token = require("./login.js")

// set up a router
// the router works exactly the same as the app, it has http functions like get, post etc
// use the router in the same way we use the app in the server.js
const router = express.Router()

router.get('/', (req, res) => {
    console.log("SessionID: " + req.sessionID);
    console.log('Is session authenticated: ' + req.session.authenticated);
    if (!(req.session.authenticated)) {
        res.redirect(url.format({ pathname:"/login", query: res, format: 'json' }))
    }
    else {
        console.log(API.data_get(token.access_token))
        let data = new Promise(API.data_get(access_token))
        data.then(res.render('missions.ejs', { data: data }))
    }
    
})

router.get('/create', (req, res) => {
    console.log("SessionID: " + req.sessionID);
    console.log('Is session authenticated: ' + req.session.authenticated);
    if (!(req.session.authenticated)) {
        res.redirect(url.format({ pathname:"/login", query: res, format: 'json' }))
    }
    else {
        res.render('createmission')
    }   
    
})


// export this router so we can use it in the server.js file
module.exports = router
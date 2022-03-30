/**
 * All routes dealing with similar pages are kept in a single file
 * A router is basically a little mini application that runs along side the main app
 */

// import express
const express = require('express')
const bodyparser = require("body-parser")
const API = require("./API_calls.js");
const res = require('express/lib/response');

let Metadata;

let urlencodedparser = bodyparser.urlencoded({ extended: false })

// set up a router
// the router works exactly the same as the app, it has http functions like get, post etc
// use the router in the same way we use the app in the server.js
const router = express.Router()

router.get('/', urlencodedparser, (request, response) => {
    access_token = request.session.access_token
    let rawdata = API.data_get(access_token)
    rawdata.then(
        function(rawdata) {
            let parseddata = JSON.stringify(rawdata)
            response.render('index.ejs', { data: parseddata })
            console.log(parseddata)
        },
        function(error) {
            console.log(error)
        }
    )
})

// export this router so we can use it in the server.js file
module.exports = router
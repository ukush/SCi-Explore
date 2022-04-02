/**
 * All routes dealing with missions are kept in a single file
 * A router is basically a little mini application that runs along side the main app
 */

// import express
const express = require('express')
const url = require('url');
const bodyparser = require("body-parser")
const API = require("./API_calls.js")
const token = require("./login.js")
const { Poly, Mission, Scenedata } = require("./API_calls")

let urlencodedparser = bodyparser.urlencoded({ extended: false })

// set up a router
// the router works exactly the same as the app, it has http functions like get, post etc
// use the router in the same way we use the app in the server.js
const router = express.Router()

//
// GET -- executes when localhost:3000/x is accessed
//
router.get('/', (req, res) => {
    let access = req.session.access_token
    let data = API.data_get(access)
    data.then(
        function(data) {
            res.render('missions', { data: data })
        }
    )
})

router.get('/create', (req, res) => {
    let access = req.session.access_token
    let data = API.data_get(access)
    data.then(
        function(data) {
            res.render('createmission', { data: data })
        }
    )

})


// export this router so we can use it in the server.js file
module.exports = router;
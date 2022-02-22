/**
 * All routes dealing with missions are kept in a single file
 * A router is basically a little mini application that runs along side the main app
 */

// import express
const express = require('express')
const request = require('request')
const bodyparser = require("body-parser")

let urlencodedparser = bodyparser.urlencoded( { extended: false })

// set up a router
// the router works exactly the same as the app, it has http functions like get, post etc
// use the router in the same way we use the app in the server.js
const router = express.Router()

function apiGet(path, access_token, res) {
    var options = {
        'method': 'GET',
        'url': `https://hallam.sci-toolset.com/discover/api/v1/missionfeed/missions${path}`,
        'headers': {
          'Authorization': `Bearer ${access_token}`,
        }
    }
    request(options, function(error, response) {
        if (error) throw new Error(error);
        var data = JSON.parse(response.body)
        res(data)
    })
}

router.get('/', urlencodedparser,(req, res) => {
    let userResponse = req.query
    let access_token = userResponse.access_token
    let token_type = userResponse.token_type
    let expires_in = userResponse.expires_in
    let missionscenedata = null;
    apiGet("/search", access_token, function(res) {
        //console.log(res)
        missionscenedata = res.results
        console.log(missionscenedata)
    })
    /*
    missionscenedata.array.forEach(element => {
        var mission_ID = element[0]
        var scene_ID = element[1]
        console.log(`\nmID:${mission_ID}, sID:${scene_ID}\n`)
        //apiGet(`/${mission_ID}/scene/${scene_ID}/frames`, access_token, function(res) {
            // stuff here
        //})
    });
    */
    res.render('index.ejs')
})



// export this router so we can use it in the server.js file
module.exports = router
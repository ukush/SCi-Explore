/**
 * All routes dealing with missions are kept in a single file
 * A router is basically a little mini application that runs along side the main app
 */

// import express
const express = require('express')
const request = require('request')
const bodyparser = require("body-parser")
const url = require('url')

let urlencodedparser = bodyparser.urlencoded( { extended: false })

let metadata;
let mission_footprints;

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

router.get('/', urlencodedparser,(request, response) => {

    console.log("SessionID: " + request.sessionID);
    console.log('Is session authenticated: ' + request.session.authenticated);
    if (!(request.session.authenticated)) {
        response.redirect(url.format({ pathname:"/login", query: res, format: 'json' }))
    }
    else {
        let userResponse = request.query
        let access_token = userResponse.access_token
        let token_type = userResponse.token_type
        let expires_in = userResponse.expires_in
        //this function collects all the mission and scene ID's and stores them locally
        apiGet("/search", access_token, function(res) {
            //console.log(res)
            var missionscenedata = res.results
            //console.log(missionscenedata)
            missionscenedata.forEach(element => {
                var mission_ID = element.missionId
                var scene_ID = element.sceneId
                //this function returns the coordinates for the Leaflet api and stores them inside the 
                //mission_footprints array to be accessed once all data is loaded
                apiGet(`/${mission_ID}/footprint`, access_token, function(res) {
                    mission_footprints = res
                    //console.log(mission_footprints)
                })
                //this function returns all metadata relevent to the scene and mission ID
                apiGet(`/${mission_ID}/scene/${scene_ID}/frames`, access_token, function(res) {
                    metadata = res
                    console.log(metadata)
            })
            })
        })
        response.render('index')
    }
})



// export this router so we can use it in the server.js file
module.exports = router
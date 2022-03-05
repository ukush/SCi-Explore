/**
 * All routes dealing with similar pages are kept in a single file
 * A router is basically a little mini application that runs along side the main app
 */

// import express
const express = require('express')
const request = require('request')
const bodyparser = require("body-parser")
const url = require('url')

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
function runsearch(access_token, callback1, callback2, callback3, render) {
    apiGet("/search", access_token, function(res) {
        callback1(res)
        var array = res.results
        array.forEach(element => {
            var mission_ID = element.missionId
            var scene_ID = element.sceneId
            //this function returns the coordinates for the Leaflet api and stores them inside the 
            //mission_footprints array to be accessed once all data is loaded
            apiGet(`/${mission_ID}/footprint`, access_token, function(res) {
                callback2(res)
                apiGet(`/${mission_ID}/scene/${scene_ID}/frames`, access_token, function(res) {
                    callback3(res)
                    render()
                    })
            })
        })
    })
}

router.get('/', urlencodedparser,(request, res) => {
    let access_token = request.query.access_token
    let data = Promise.all([
        new Promise(resolve =>
            apiGet("/search", access_token, function(res) {
                resolve(res)
            })),
        new Promise(resolve =>
            apiGet("/search", access_token, function(res) {
                var array = res.results
                array.forEach(element => {
                    var mission_ID = element.missionId
                    //this function returns the coordinates for the Leaflet api and stores them inside the 
                    //mission_footprints array to be accessed once all data is loaded
                    apiGet(`/${mission_ID}/footprint`, access_token, function(res) {
                        resolve(res)
                    })
                })
            })),
        new Promise(resolve =>
            apiGet("/search", access_token, function(res) {
                var array = res.results
                array.forEach(element => {
                    var mission_ID = element.missionId
                    var scene_ID = element.sceneId
                    //this function returns the coordinates for the Leaflet api and stores them inside the 
                    //mission_footprints array to be accessed once all data is loaded
                    apiGet(`/${mission_ID}/scene/${scene_ID}/frames`, access_token, function(res) {
                        resolve(res) 
                    })
                })
            }))
    ])
    data.then(
        function(data){
            res.render('index', { data: data })
        },
        function(error){
            console.log(error)
        }
    )
})



// export this router so we can use it in the server.js file
module.exports = router
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

function apiGet(path, access_token, response) {
    var options = {
        'method': 'GET',
        'url': `https://hallam.sci-toolset.com/discover/api/v1/missionfeed/missions${path}`,
        'headers': {
          'Authorization': `Bearer ${access_token}`,
        }
    }
    request(options, function(error, res) {
        if (error) throw new Error(error);
        var data = JSON.parse(res.body)
        response(data)
    })
}

//when user detailed have been validated coorectly and deemed valid this URL get is called
//This collects all the data from the API



router.get('/', urlencodedparser,(request, response) => {
    let access_token = request.query.access_token
    let rawdata = Promise.all([
        new Promise(resolve =>
            //this apiGet call collects all mission Id's and scene Id's from the api
            //these are required to collect all associated meta data futher down the program
            apiGet("/search", access_token, function(callback) {
                let array = callback.results
                let struct_array = [{}];
                for (let i=0;i<array.length;i++) {
                    let missionId = array[i].missionId
                    let sceneId = array[i].sceneId
                    let object = { missionId: missionId, sceneId: sceneId }
                    for (let j=0;j<struct_array.length;j++) {
                        if (object.missionId != struct_array[j].missionId) {
                            struct_array.push(object)
                            console.log(struct_array)
                            resolve(struct_array)
                        } else if (object.missionId == struct_array[j].missionId && struct_array[j].sceneId ) {
                            break
                        }
                    }
                }
            })),
        new Promise(resolve =>
            apiGet("/search", access_token, function(callback) {
                var array = callback.results
                array.forEach(element => {
                    var mission_ID = element.missionId
                    //this apiGet call returns the coordinates for the Leaflet api and stores them inside the 
                    //data array to be accessed once all data is loaded
                    apiGet(`/${mission_ID}/footprint`, access_token, function(callback) {
                        resolve(callback)
                    })
                })
            })),
        new Promise(resolve =>
            apiGet("/search", access_token, function(callback) {
                var array = callback.results
                array.forEach(element => {
                    var mission_ID = element.missionId
                    var scene_ID = element.sceneId
                    //this apiGet call collects all the meta data relevent to the inputted mission->scene
                    apiGet(`/${mission_ID}/scene/${scene_ID}/frames`, access_token, function(callback) {
                        resolve(callback) 
                    })
                })
            }))
    ])
    rawdata.then(
        function(rawdata){
            response.render('index.ejs', { data: rawdata })
        },
        function(error){
            console.log(error)
        }
    )
})



// export this router so we can use it in the server.js file
module.exports = router
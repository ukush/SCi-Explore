// import express
const express = require('express')
const request = require('request')
const bodyparser = require("body-parser")
const url = require('url')

let urlencodedparser = bodyparser.urlencoded( { extended: false })

// set up a router
// the router works exactly the same as the app, it has http functions like get, post etc
// use the router in the same way we use the app in the server.js

class Mission {
    constructor(mId, sId) {
        this.mId = mId
        this.sId = sId
    }
    getIds() {
        return this
    }

}
class Poly {
    constructor(type, coordinates) {
        this.type = type
        this.coordinates = coordinates
    }
    getCoordinates() {
        return this.coordinates
    }
}
class Scenedata {
    constructor(id, name, ATOT, scenes) {
        this.id = id
        this.name = name
        this.ATOT = ATOT
        this.scenes = scenes
    }
}

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
        //console.log(res)
        var data = JSON.parse(res.body)
        response(data)
    })
}

//when user detailed have been validated coorectly and deemed valid this URL get is called
//This collects all the data from the API
function data_get(access_token) {
    return Promise.all([
        new Promise(resolve =>
            //this apiGet call collects all mission Id's and scene Id's from the api
            //these are required to collect all associated meta data futher down the program
            apiGet("/search", access_token, function(callback) {
                let array = callback.results
                let temp
                let struct_array = [];
                for (let i=0;i<array.length;i++) {
                    let missionId = array[i].missionId
                    let sceneId = array[i].sceneId
                    temp = new Mission(missionId, sceneId)
                    struct_array.push(new Mission(missionId, sceneId))
                    resolve(struct_array)
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
                        let type = callback.type
                        let coord = callback.coordinates
                        resolve(new Poly(type, coord))
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
                        resolve(new Scenedata(callback.id, callback.name, callback.aircraftTakeOffTime, callback.scenes)) 
                    })
                })
            }))
    ])
}

module.exports = { data_get, apiGet }
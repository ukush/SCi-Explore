// import express
const express = require('express')
const request = require('request')
const bodyparser = require("body-parser")
const url = require('url')
const { raw } = require('body-parser')

let urlencodedparser = bodyparser.urlencoded( { extended: false })

// set up a router
// the router works exactly the same as the app, it has http functions like get, post etc
// use the router in the same way we use the app in the server.js

class Mission {
    constructor(mId, sId) {
        this.mId = mId
        this.sId = sId
    }
    getmID() {
        return this.mId
    }
    getsID() {
        return this.sId
    }
}
class Poly {
    constructor(type, coordinates) {
        this.type = type
        this.coordinates = coordinates 
    }
    getcoordinates() {
        return this.coordinates
    }
    gettype() {
        return this.type
    }
}
class Scenedata {
    constructor(id, name, ATOT, scenes) {
        this.id = id
        this.name = name
        this.ATOT = ATOT
        this.scenes = scenes
    }
    getid() {
        return this.id
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

function JSONsplit(rawdata) {
    let missions = []
    let polys = []
    let metadata = []
    for (let i=0;i<rawdata[0].length;i++){
        missions.push(rawdata[0][i][0])
        polys.push(rawdata[0][i][1])
        metadata.push(rawdata[0][i][2])
    }
    console.log(metadata)
    return splitdata
}

//when user detailed have been validated coorectly and deemed valid this URL get is called
//This collects all the data from the API
function data_get(access_token) {
    return new Promise(resolve => 
        apiGet("/search", access_token, function(callback) {
            let array = callback.results
                let struct_array = [];
                for (let i=0;i<array.length;i++) {
                    let missionId = array[i].missionId
                    let sceneId = array[i].sceneId
                    struct_array[i] = [new Mission(missionId, sceneId)]
                    apiGet(`/${missionId}/footprint`, access_token, function(callback) {
                        struct_array[i].push(new Poly(callback.type, callback.coordinates))
                        apiGet(`/${missionId}/scene/${sceneId}/frames`, access_token, function(callback) {
                            struct_array[i].push(new Scenedata(callback.id, callback.name, callback.aircraftTakeOffTime, callback.scenes))
                            apiGet(`/${missionId}/scene/${sceneId}/frames`, access_token, function() {
                                resolve([struct_array])
                            })
                        })
                    })
                }
            }))
}

module.exports = { data_get, apiGet, JSONsplit, Poly, Mission, Scenedata }
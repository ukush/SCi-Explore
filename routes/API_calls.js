// ------------ Imports -------------------//

const request = require('request')

//let urlencodedparser = bodyparser.urlencoded( { extended: false })
//
// class definition for data structuring
//
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
//
// --- Base function template for all api calls
//
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
//
// -- function to split and return the organised Mission objects into separate respectively defined arrays 
//
function JSONsplit(rawdata) {
    let missions = []
    let polys = []
    let metadata = []
    for (let i=0;i<rawdata[0].length;i++){
        missions.push(rawdata[0][i][0])
        polys.push(rawdata[0][i][1])
        metadata.push(rawdata[0][i][2])
    }
    return splitdata
}
//
//when user detailed have been validated coorectly and deemed valid this URL get is called
//This collects all the data availbale from the API
// *note - the api sends data in no specific order, data comes in at random
function data_get(access_token) {
    return new Promise(resolve => 
        apiGet("/search", access_token, function(callback) {
            //assigns api data to an array for iteration
            let array = callback.results
                let struct_array = [];
                for (let i=0;i<array.length;i++) {
                    let missionId = array[i].missionId
                    let sceneId = array[i].sceneId
                    // sets the recieved mission and scene id object from api and sets it to the index of 
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
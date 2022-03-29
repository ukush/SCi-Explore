
const { resolve } = require("url");
const AUTH = require("./auth.js")

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

module.exports = (request, response, next) => {
    try {
        username = request.query.username
        password = request.query.password
        let data = { username, password }
        AUTH.Authorization(data, function(res) {
            //console.log(request)
            if(!res.access_token) {
                console.log("error, no access token")
            } else {
                //res.cookie('access_token', res.access_token).send('cookie set');
                access = res.access_token;
                //console.log(response)
                next()
            }
        })
    } catch {
        res.status(401).json({
            error: new Error('Invalid request!')
        })
    }

}
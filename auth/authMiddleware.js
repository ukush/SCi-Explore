
const { resolve } = require("url");
const AUTH = require("./auth.js")
const session = require('express-session')

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

module.exports = (request, response, next) => {
    try {
        username = request.session.username
        password = request.session.password
        let data = { username, password }
        AUTH.Authorization(data, function(res) {
            if(!res.access_token) {
                response.redirect("/login")
            }  else {
                request.session.authenticated = true;
                request.session.access_token = res.access_token
                next()
            }
        })
    } catch {
        response.status(401).json({
            error: new Error('Invalid request!')
        })
    }

}
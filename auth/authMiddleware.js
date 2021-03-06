// Requires auth.js for ataining an access key

const AUTH = require("./auth.js")

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
//
//----------Middleware dor user details authorisation from the Sci-toolset API----------
//
module.exports = (request, response, next) => {
    try {
        username = request.session.username
        password = request.session.password
        let data = { username, password }
        //--------- passes user details from the session to the auth function
        AUTH.Authorization(data, function(res) {
            if(!res.access_token) {
                response.redirect("/login")
            }  else {
                // ------- sets session with the access token for api access
                request.session.authenticated = true;
                request.session.access_token = res.access_token
                next()
            }
        })
    } catch {
        //------ catches any 401 errors fom the api call
        response.status(401).json({
            error: new Error('Invalid request!')
        })
    }

}
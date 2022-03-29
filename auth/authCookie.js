const cookieParser = require("cookie-parser");
const res = require("express/lib/response");


module.exports = (request, response, next) => {
    try {
        console.log(request.query)
        const cookies = request.query
        console.log(cookies)
        if (('username' && 'password') in cookies) {
            console.log("User exists!\n");
            response.cookie('userdetails', cookies)
            //response.status(200).send({ msg: "authenticated!"})
            next()
        } else {
            response.status(403).send({ msg: "Not authenticated, not user and pass"})
            console.log(user)
        }
        response.status(403).send({ msg: "Not authenticated"})
    } catch {
        response.status(401).json({
            error: 'Invalid request!'
        })
    }
}
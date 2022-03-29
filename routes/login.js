const express = require("express")
const router = express.Router()
const bodyparser = require("body-parser")
const request = require("request")
const res = require("express/lib/response")
const url = require('url');
const session = require("express-session")

const API = require("./API_calls.js")

let access_token;
let urlencodedparser = bodyparser.urlencoded({ extended: false })

router.get('/', (req, res) => {
    res.render('login', { layout: 'login-layout' })
})

router.post('/', urlencodedparser, (request, response) => {
    response.redirect(url.format({ pathname: "/index", query: request.body, format: 'json' }))
})

module.exports = router;
const express = require("express")
const router = express.Router()
const bodyparser = require("body-parser")
const url = require('url');



let urlencodedparser = bodyparser.urlencoded({ extended: false })
//
// GET -- executes when localhost:3000/x is accessed
//
router.get('/', (req, res) => {
    res.render('login', { layout: 'login-layout' })
})

router.post('/', urlencodedparser, (request, response) => {
  request.session.username = request.body.username
  request.session.password = request.body.password
  response.redirect(url.format({ pathname: "/index", format: 'json' }))
})
// exports router for server to access
module.exports = router;
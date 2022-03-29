const express = require("express")
const router = express.Router()
const bodyparser = require("body-parser")
const url = require('url');



let urlencodedparser = bodyparser.urlencoded({ extended: false })

router.get('/', (req, res) => {
    res.render('login', { layout: 'login-layout' })
})

router.post('/', urlencodedparser, (request, response) => {
  //response.status(200).json({ msg: "logged in"})
  //response.redirect(url.format({ pathname: "/index", format: 'json' }))
  //console.log(response.body)
  request.session.username = request.body.username
  request.session.password = request.body.password
  response.redirect(url.format({ pathname: "/index", format: 'json' }))
})

module.exports = router;
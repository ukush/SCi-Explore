const express = require("express")
const router = express.Router()


router.get('/', (req, res) => {
    req.session.destroy
    console.log(req.sessionID);
    res.render('logout')
  })


  module.exports = router;
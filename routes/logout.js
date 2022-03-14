const express = require("express")
const router = express.Router()


router.get('/', (req, res) => {
    console.log(req.sessionID)
    req.session.destroy(function(err) {
      res.render('logout')
  });
  })


  module.exports = router;
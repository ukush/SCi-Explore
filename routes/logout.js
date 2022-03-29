const express = require("express")
const router = express.Router()


router.get('/', (req, res) => {
    console.log(req.sessionID)
    req.session.destroy(function(err) {
      res.redirect('/');
  });
  })


  module.exports = router;
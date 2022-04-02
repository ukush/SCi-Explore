const express = require("express")
const router = express.Router()

//
// GET -- executes when localhost:3000/x is accessed
//
router.get('/', (req, res) => {
    // removes the users details from the session (includes access_token)
    req.session.destroy(function() {
      res.render('logout')
  });
  })

// exports router for server to access
  module.exports = router;
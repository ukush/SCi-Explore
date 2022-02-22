/**
 * All routes dealing with missions are kept in a single file
 * A router is basically a little mini application that runs along side the main app
 */

// import express
const express = require('express')

// set up a router
// the router works exactly the same as the app, it has http functions like get, post etc
// use the router in the same way we use the app in the server.js
const router = express.Router()

router.get('/', (req, res) => {
    res.render('index.ejs')
})


// export this router so we can use it in the server.js file
module.exports = router
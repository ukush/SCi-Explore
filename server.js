// import the express library
const express = require('express')
// import path library
const path = require('path')
// import dotenv for global variables
const dotenv = require('dotenv')
// import the layouts
const layouts = require("express-ejs-layouts")

// save port to 
//const PORT = process.env.PORT || 3000

// set up a server by simply calling the express() method
const app = express()

// serve static files
app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/stylesheets/css'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use('/images', express.static(__dirname + 'public/images'))

// use the ejs layouts
app.use(layouts)
//set up ejs view engine
app.set('view engine', 'ejs')

// main route
app.get('/', (req, res) => {
    res.render('index')
})

// import the mission router
const missionRouter =  require('./routes/missions')

// link the routes from mission router
app.use('/missions', missionRouter)

// run server on port 3000
app.listen(3000)
//app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
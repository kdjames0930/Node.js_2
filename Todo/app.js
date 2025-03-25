// https://earth-ing.tistory.com/entry/2-Nodejs-MongoDB-%EB%A1%9C-TODO-%EB%A7%8C%EB%93%A4%EA%B8%B0-%EB%9D%BC%EC%9A%B0%ED%84%B0-%EC%84%A4%EC%A0%95-%EB%A6%AC%ED%8C%A9%ED%86%A0%EB%A7%81?category=974767
// Import Modules
const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const bodyParser = require('body-parser')


// Make express servers
const app = express() // 3000: Todo

// Server setting - View, Static Files, Body Parser
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname + '/views'))

app.use('/public', express.static(__dirname + '/public'))

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// Router setting
const router = require('./routes/index')
app.use(router)

// Connect to DB
mongoose.connect("mongodb://localhost:27017/node", {useNewUrlParser: true, useUnifiedTopology: true}, function(err){
    if(err){
        console.error("mongoDB Connection Error", err)
    }

    console.log("mongoDB connected")

    app.listen(3000, function(){
        console.log("Server listening on port 3000")
    })
})
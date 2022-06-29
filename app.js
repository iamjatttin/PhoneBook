var express = require("express") 
var app=express();
var cookiesparser =require("cookie-parser")
var session = require("express-session")
var cors = require('cors') 



app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}));

//for session work middleware
app.use(cookiesparser())
app.use(session({secret: "this is secret"}))
//static
app.use(express.static("public"))
//views
app.set('view engine', 'pug');
app.set('views','./views');
//both index.js and things.js should be in same directory

//router
var router = require('./route');
app.use(router);
  app.listen(5000, () => {
    console.log(`App listening at http://localhost:5000`)
  })
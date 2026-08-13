const express = require('express')
const app = express()
const port = 8080
app.use(express.static("front"))
app.listen(port,function(){
    console.log("yes it worky :) at http://localhost:"+port)
})
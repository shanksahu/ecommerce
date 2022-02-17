var express = require('express')
var app = express()
const cors = require("cors")
const router = require("./Router/router")
var bodyParser = require('body-parser');
require("./Mongoose.Connection/mongooseConnection")
var port = process.env.PORT || '4000'



app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


var corsOptions = {
    origin: "*"
  };
  
  app.use(cors(corsOptions));


// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*") 
//     res.header("Access-Control-Allow-Headers", "*")
//     if (req.method === 'OPTIONS') {
//         res.header("Access-Control-Allow-Methods", "*")
//     }
   
//     next()
// })

app.use("/", router)

app.listen(port, err => {
    if (err)
        throw err
    console.log('Server listening on port', port)
})


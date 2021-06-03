'use strict'
const express = require('express')
const serverless = require('serverless-http')
const app = express()
const bodyParser = require('body-parser')
const router = express.Router()
const cors = require('cors')
require("dotenv").config();

app.use(cors())


app.use(bodyParser.json())
app.use('/.netlify/functions/server', router) // path must route to lambda
app.use('/', router)

// router.get('/', (req, res) => {
//   res.writeHead(200, { 'Content-Type': 'text/html' })
//   res.write('<h1>Up and running</h1>')
//   res.end()
// })


// router.post('/doSomething', async (req, res) => {
//   try {
//     res.status(200).send({ data: 'success' })
//   } catch (err) {
//     console.log(err)
//     res.status(400).send({ error: 'bad request' })
//   }
// })

// ----------------------------------------------------
// allow cross-origin requests
const ImageKit = require('imagekit');

var ap = express()

const imagekit = new ImageKit({
  publicKey : process.env.PUBLICKEY,
  privateKey : process.env.PRIVATEKEY,
  urlEndpoint : process.env.URLENDPOINT
});


ap.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", 
      "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  
  router.get('/auth', function (req, res) {
    var result = imagekit.getAuthenticationParameters();
    res.send(result);
  });



// -------------------------------------------

module.exports = app
module.exports.handler = serverless(app)

'use strict'

const app = require('./express/server')
require("dotenv").config();



app.listen(process.env.PORT || 3000 ,()=>console.log('Server started at : 3000'))

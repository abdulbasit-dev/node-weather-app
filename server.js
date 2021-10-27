const express = require('express');
const cors = require('cors')
const rateLimit = require('express-rate-limit')
require('dotenv').config()
const colors = require('colors')
const routes = require('./routes');
const { middleware } = require('apicache');


const PORT = process.env.PORT || 5000
const app = express();

app.use(cors());

// rate limiting middleware
const limiter = rateLimit({
    windowMs:60*1000*10, // 10 min
    max:100
}); 
app.use(limiter);
app.set("trus proxy",1);

// set static folder
app.use(express.static('public'));

app.use('/api',routes)

app.listen(PORT,()=>console.log(`server run on port ${PORT}`.bgCyan.black))
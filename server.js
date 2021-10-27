const express = require('express');
const cors = require('cors')
require('dotenv').config()
const colors = require('colors')
const routes = require('./routes')


const PORT = process.env.PORT || 5000
const app = express();

app.use(cors());

app.use('/api',routes)

app.listen(PORT,()=>console.log(`server run on port ${PORT}`.bgCyan.black))
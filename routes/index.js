const express = require('express');
const router = express.Router();
const apicache = require('apicache');
const needle = require('needle');


// init cache
const cashe = apicache.middleware;

// env vars 
const API_BASE_URL = process.env.API_BASE_URL;
const API_KEY_NAME = process.env.API_KEY_NAME;
const API_KEY_VALUE = process.env.API_KEY_VALUE;


router.get('/',cashe('1 minutes'), async (req, res) => {
    const city = req.query.city;

    try {
        const apiRes = await needle('get', `${API_BASE_URL}?q=${city}&${API_KEY_NAME}=${API_KEY_VALUE}`);
        const data = await apiRes.body;

        return res.status(200).json(data);

    } catch (error) {
        return res.status(500).json(error);
    }
});

module.exports = router;

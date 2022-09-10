const express = require('express');
const router = express.Router();
const needle = require('needle');
// const env=require("dotenv").config();

//Env variable 
const API_BASE_URL = process.env.API_BASE_URL ;
const API_KEY_NAME = process.env.API_KEY_NAME;
const API_KEY_VALUE = process.env.API_KEY_VALUE;
const country = "country";
const countryvalue = "in";
const cat = "category";
const catvalue = "sports";
const pageSize = "pageSize";
const pageSizeValue = 6;
const url = require('url')
router.get('/', async (req,res)=>{
    try {
        const params = new URLSearchParams({
            [country]:countryvalue,
            [cat]:catvalue,
            [pageSize]:pageSizeValue,
            [API_KEY_NAME]:API_KEY_VALUE
        });
        // const params = new URLSearchParams({
        //     [API_KEY_NAME]:API_KEY_VALUE,
        //     ...url.parse(req.url,true).query
        // });
        // const apiRes = await needle('get',`${API_BASE_URL}?${params}`)


        const url_ = `${API_BASE_URL}?${params}`;
        console.log(url_);
        const apiRes = await needle('get',url_)
        const data = apiRes.body
        if(process.env.NODE_ENV !=='production'){
            console.log(`REQUEST: ${url}`);
        }
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json(error);
    }
  
})

module.exports = router;
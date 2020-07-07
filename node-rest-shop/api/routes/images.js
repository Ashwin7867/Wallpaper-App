const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Image = require('../models/image');

const checkAuth = require('../middleware/check-auth');

router.get("/",checkAuth, (req,res,next) => {
    Image.find()
    .exec()
    .then(docs => {
        const pageCount = Math.ceil(docs.length/10);
        let page = parseInt(req.query.p);
        if(!page){page = 1;}
        if(page > pageCount){
            page = pageCount
        }
        return res.status(200).json({
            "page" : page,
            "pageCount" : pageCount,
            "docs" : docs.slice(page*10 -10, page*10)
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            message : "Error fetching images"
        })
    })
})

module.exports = router;


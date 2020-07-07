const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');

const User = require('../models/user');

const checkAuth = require('../middleware/check-auth');
const storage = multer.diskStorage({
    destination : function(req,file , cb){
        cb(null , './uploads/');
    },
    filename : function(req, file,cb){
        cb(null , new Date().toISOString() + file.originalname)
    }
})

const fileFilter = (req,file,cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg'){
        cb(null, true)
    }else{
        cb(null , false)
    }
}
const upload = multer({ storage : storage , 
    limits : {
        fileSize : 1024*1024*5
    },
    fileFilter : fileFilter
    });

router.post('/signup', upload.single('profileImage'), (req,res,next) => {
    console.log(req.file);
    User.find({email : req.body.email})
    .exec()
    .then(user => {
        console.log(user)
        if(user.length >= 1){
            res.status(409).json({
                message : "User already exists"
            })
        }else{
            bcrypt.hash(req.body.password , 10 , (err, hash) => {
            if(err){
                res.status(500).json({
                error: err
                })
            }else{
                const user = new User({
                    _id : new mongoose.Types.ObjectId(),
                    first_name : req.body.first_name,
                    last_name : req.body.last_name,
                    phone : req.body.phone,
                    email : req.body.email,
                    password : hash
    ///                profileImage : req.file.path
                })
                user.save()
                .then(result => {
                res.status(201).json({
                    message : "User Created",
                    result : result
                    })
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({
                        error : err
                    })
                }) 
            }
        })
    }
})
})

router.post('/login', (req,res,next) => {
    User.find({email : req.body.email})
    .exec()
    .then((user) => {
        if(user.length <1){
            return res.status(401).json({
                message : "Auth failed"
            })
        }
        bcrypt.compare(req.body.password, user[0].password, (err , result) =>{
            if(err){
                return res.status(401).json({
                    message : 'Auth failed'
                })
            }
            if(result){
                const token = jwt.sign({
                    email : user[0].email,
                    userId : user[0].userId
                },
                "secret",
                {
                    expiresIn : '1h'
                })    
                return res.status(200).json({
                    message : "Auth successful",
                    token : token
                })
            }
        })
    })
    .catch(err => console.log(err))
})

router.delete('/:userId', checkAuth, (req,res,next) => {
    User.remove({ userId : req.params.userId})
    .exec()
    .then(result => {
        res.status(200).json({
            message : "User successfully deleted",
            result : result
        })
    })
    .catch(error => {
        console.log(error);
    })

})

module.exports = router;

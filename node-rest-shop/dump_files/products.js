const express = require('express');
const mongoose= require('mongoose');
const router = express.Router();

const multer = require('multer');

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

const Product = require('../models/product');

router.get('/', (req, res, next) => {
    Product.find()
    .select('_id name price productImage')
    .exec()
    .then(docs => {
        const response = docs.map((doc) => {
            return {
                _id : doc._id,
                name : doc.name,
                price : doc.price,
                productImage : doc.productImage,
                request : {
                    type : "GET",
                    url : "https://localhost:3000/products/"+ doc.id
                }
            }
        })
        res.status(200).json({
            count : docs.length,
            products : response
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error : err
        })
    })
})    

router.post('/', upload.single('productImage'),checkAuth, (req , res , next) => {
    console.log(req.file);
    const product = new Product({
        _id : new mongoose.Types.ObjectId(),
        name : req.body.name,
        price : req.body.price,
        productImage : req.file.path
    })
    product.save()
    .then(result => {
        console.log(result);
        res.status(201).json({
            message : "Handling Post requests to /products",
            createdProduct : product
        })
    })
    .catch(err => console.log(err)); 
})

router.get('/:productId', (req,res,next) => {
    const id = req.params.productId;
    Product.findById(id)
    .exec()
    .then(doc => {
        console.log(doc);
        res.status(200).json(doc)
    })
    .catch(err => console.log(err))
    })

router.patch('/:productId', checkAuth, (req,res ,next) => {
    const id = req.params.productId;
    const updateOps = {};
    for (const ops of req.body){
        updateOps[ops.propName] = ops.value
    }
    Product.update({ _id : id}, { $set : updateOps})
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json(result)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error : err
        })
    })
})

router.delete('/:productId',checkAuth,  (req,res,next) => {
    const id = req.params.productId;
    Product.remove({_id : id})
    .exec()
    .then(result => {
        res.status(200).json(result)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error : err
        })
    })
})
module.exports = router;
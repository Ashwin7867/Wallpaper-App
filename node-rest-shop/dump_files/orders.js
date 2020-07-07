const express = require('express');
const router = express.Router();

const mongoose= require('mongoose');


const Order = require('../models/order');
const Product = require('../models/order');

router.get('/', (req,res,next) => {
    Order.find()
    .select('product quantity _id')
    .populate('product','_id name price')
    .exec()
    .then(docs => {
        const response = docs.map(doc => {
            return {
                _id : doc._id,
                product : doc.product,
                quantity : doc.quantity,
                request : {
                    type : 'GET',
                    url : "http://localhost:3000/orders/"+ doc._id
                }
            }
        })
        res.status(200).json({
            count : docs.length,
            order : response
        })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
})

router.post('/', (req, res,next) => {
    const id = req.body.productId;
    Product.findById(id)
    .then(product => {
            if(!product){
                return res.status(404).json({
                    message : "Product Not Found"
                })
            }
            const order = new Order({
                _id : mongoose.Types.ObjectId(),
                quantity : req.body.quantity,
                product : req.body.productId
            })
            return order.save()
        })
    .then(result => {
        console.log(result);
        res.status(201).json({
            message : "Order has been created",
            createdOrder : result
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error : err
        })
    })
})

router.get('/:orderId', (req,res,next) => {
    const id = req.params.orderId;
    Order.findById(id)
    .exec()
    .then(order => {
        res.status(200).json({
            order : order,
        })
    })
})

router.delete("/:orderId", (req,res,next) => {
    Order.remove({ _id : req.params.orderId})
    .exec()
    .then(result => {
        res.status(200).json({
            message : "Order Successfully deleted",

        })
    })
})

module.exports = router;
const mongoose = require('mongoose');
const Product = require('../models/product');

exports.getAll = (req, res, next) => {
    /*
    res.status(200).json({
        message: 'Handling GET request to /products'
    });*/
    Product.find()
    .select('name price _id') //select only this attributes of the object
    .exec()
    .then(docs => {
        const response = {
            count: docs.length,
            products: docs.map(doc =>{
                return {
                    name: doc.name,
                    price: doc.price,
                    _id: doc._id,
                    request:{
                        type:'GET',
                        url: 'http:localhost:3000/products/'+ doc._id
                    }
                }
            })
        };
        console.log(docs);
        res.status(200).json(response);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}; 

exports.create = (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });
    product
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: "Created product successfully",
                createdProduct: {
                    name: result.name,
                    price: result.price,
                    _id: result._id,
                    request: {
                        type:'GET',
                        url: "http:localhost:3000/products/"+result._id
                    }
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error:err
            });
        });
/*
    res.status(201).json({
        message: 'Handling POST request to /products',
        createdProduct: product
    });*/
};

exports.get = (req,res,next) =>{
    const id = req.params.productId; //the last .var its because is the name of var in method
    /*
    if (id === 'special'){
        res.status(200).json({
            message: 'You discovered the special ID',
            id: id
        });
    } else{
        res.status(200).json({
            message: 'You passed an ID'
        });
    }*/
    Product.findById(id)
    .select('name price _id')
    .exec()
    .then( doc =>{
        console.log("from DB: ", doc);
        if (doc){
            res.status(200).json({
                product: doc,
                request: {
                    type: 'GET',
                    description: 'Get all product',
                    url: 'http://localhost:3000/products'
                }
            })
        }
        else {
            res.status(404)
            .json({message: 'No valid entry found for provided ID'});
        }
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({error:err});
    });
};

exports.update = (req,res,next) =>{
    /*
    res.status(200).json({
        message: 'Updated product'
    });*/
    const id = req.params.productId;
    const updateOps = {};
    for (const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    Product.update({ _id: id}, {$set: updateOps})
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json({
            message: 'Product update',
            request: {
                type: 'GET',
                url: 'http://localhost:3000/products/'+id
            }
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });


};

exports.delete = (req,res,next) =>{
    /*
    res.status(200).json({
        message: 'Deleted product '
    }); */
    const id = req.params.productId;
    Product.remove({ _id: id})
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'Product deleted',
            request:{
                type: 'POST',
                url:'http://localhost:3000/products',
                bodyInfo: {
                    name: "String",
                    price: "Number"
                }
            }
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
};


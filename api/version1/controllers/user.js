const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');


exports.get = (req,res,next) => {
    User.findById(req.params.userId)
    .populate('topics', 'name _id')
    .exec()
    .then(user  => {
        if (! user ){
            return res.status(404).json({
                message: 'User not found'
            })
        }
        res.status(200).json({
            userName: user.userName,
            topics: user.topics
        });
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
};

exports.topTen = (req,res,next) => {
    User.findById(req.params.userId)
    //.populate('topics', 'name _id resources')
    .populate('topics')
    //.populate('topics', 'name _id')
    .exec()
    .then(userInfo  => {
        if (! userInfo ){
            return res.status(404).json({
                message: 'User not found'
            })
        }
        const response ={
            userName: userInfo.userName,
            //topics: userInfo.topics
            //topics: userInfo.topics.length
            /*topics: userInfo.topics.map(topic => {
                return {
                    _id: topic._id,
                    name: topic.name,
                    resources: topic.resources.length
                }
            }) */
            topics: userInfo.topics.sort().slice(0,9).map(topic => {
                return {
                    _id: topic._id,
                    name: topic.name,
                    //resources: topic.resources.length
                    resources: topic.resources
                }
            })
        }
        res.status(200).json({response});
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
};

exports.signup = (req,res, next) =>{

    User.find({userName:req.body.userName})
    .exec()
    .then(user => {
        if (user.length >= 1) {
            return res.status(409).json({
                message: 'User name already exists'
            });
        } else{
            bcrypt.hash(req.body.password, 10,(err,hash) =>{
                if (err){
                    return res.status(500).json({
                        error: err
                    });
                } else{
                    const user = new User ({
                    _id: new mongoose.Types.ObjectId(),
                    userName: req.body.userName,
                    password: hash
                    });
                    user.save()
                    .then(result => {
                        console.log(result);
                        res.status(201).json({
                            message: 'User created'
                        });
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({
                            error: err
                        });
                    });
                }
            });
        }
    })
};


exports.login = (req,res,next) =>{
    User.find({userName: req.body.userName}) //could use findOne()
    .exec()
    .then(user => {
        if (user.length < 1){
            return res.status(401).json({
                message: 'Auth failed '
            });
        }
        bcrypt.compare(
            req.body.password,
            user[0].password,
            (err, result ) => {
                if (err) {
                    return res.status(401).json({
                        message: "Auth failed "
                    });
                }
                if (result) {

                    const token = jwt.sign(
                        {
                            userName : user[0].userName,
                            userId: user[0]._id
                        },
                        process.env.JWT_KEY, 
                        {
                            expiresIn: "1h"
                        }
                    );

                    return res.status(200).json({
                        message: 'Auth successful ',
                        token: token
                    });
                }
                res.status(401).json({
                    message: 'Auth failed '
                })
            })
          
    })
    .catch( err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });

};


exports.delete = (req,res,next) => {
    User.remove({ _id: req.params.userId})
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'User deleted'
        });
    })
    .catch( err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
};
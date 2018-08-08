const mongoose = require('mongoose');

const Resource = require('../models/resource');
const Topic = require('../models/topic');


exports.create = (req,res,next) => {
    const _id = mongoose.Types.ObjectId()
    Topic.findOneAndUpdate({_id: req.params.topicId}, {$push: {resources: _id}})
    .then(topic => {
        if (! topic){
            return res.status(404).json({
                message: 'Topic not found'
            });
        }
        const resource = new Resource ({
            _id: _id,
            name: req.body.name,
            description: req.body.description,
            url: req.body.url
        });
        return resource.save()
    })
    .then(result => {
        console.log(result);
        res.status(201).json({
        message: 'Resource stored',
            createdResource: {
                _id: result._id,
                name: result.name,
                description: result.description,
                url: result.url
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

exports.get = (req,res,next) => {
    Resource.findById(req.params.resourceId)
    .exec()
    .then(resource => {
        if (! resource){
            return res.status(404).json({
                message: 'Resource not found'
            })
        }
        res. status(201).json({
            _id: resource._id,
            name: resource.name,
            description: resource.description,
            url: resource.url
        });
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
};

exports.update = (req,res,next) => {
    const id = req.params.resourceId;
    const updateOps = {};

    for (const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    Resource.update({ _id: id}, {$set: updateOps})
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json({
            message: 'Resource updated'
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
};

exports.delete = (req,res,next) => {
    Resource.remove({
        _id: req.params.resourceId
    })
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'Resource deleted'
        });
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
};
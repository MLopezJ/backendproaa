const mongoose = require('mongoose');

const Topic = require('../models/topic');
const User = require('../models/user');

exports.getAll = (req,res,next) => {
    Topic.find()
    .select('id name resources')
    .populate('resources','name')
    .exec()
    .then(docs => {
        const response = {
            count: docs.length,
            topics: docs.map(doc => {
                return {
                    _id: doc._id,
                    name: doc.name,
                    resources: doc.resources
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

exports.create = (req,res,next) => {
    const _id = mongoose.Types.ObjectId()
    User.findOneAndUpdate({_id: req.params.userId}, {$push:{topics: _id}})
    .then(user => {
        if (! user){
            return res.status(404).json({
                message: 'user not found'
            });
        }
        const topic = new Topic ({
            _id: _id,
            name: req.body.name,
            resources: []
        });
        return topic.save()
    })

    .then(result => {
        console.log(result);
        res.status(201).json({
            message: 'Topic stored',
            createdTopic: {
                _id: result._id,
                name: result.name,
                resources: result.resources
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
    Topic.findById(req.params.topicId)
    .populate('resources')
    .exec()
    .then(topic => {
        if (!topic) {
            return res.status(404).json({
                message: 'Topic not found'
            })
        }
        res.status(200).json({
            name: topic.name,
            resources: topic.resources
        });
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });

};

exports.update = (req,res,next) => {
    const id = req.params.topicId;
    const updateOps = {};
    
    for (const ops of req.body){
        updateOps["name"] = ops.name;
    }

    Topic.update({ _id: id}, {$set: updateOps})
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json({
            message: 'Topic updated'
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
    Topic.remove({
        _id: req.params.topicId
    })
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'Topic deleted'
        });
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
};

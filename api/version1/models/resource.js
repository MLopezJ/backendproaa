const mongoose = require('mongoose');

const resourceSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    name : {type: String, required: true},
    description : {type: String, required: true},
    url : {type: String, required: true}
});

module.exports = mongoose.model('Resource', resourceSchema);
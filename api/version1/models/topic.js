const mongoose = require('mongoose');
const topicSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    name : {type:String, required: true},
    resources : [{type: mongoose.Schema.Types.ObjectId, ref:'Resource'}]
});

module.exports = mongoose.model('Topic', topicSchema);
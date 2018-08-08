const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userName: { type:String, require:true},
    password: {type:String, reuqire:true},
    topics : [{type: mongoose.Schema.Types.ObjectId, ref:'Topic'}]
});

module.exports = mongoose.model('User', userSchema);
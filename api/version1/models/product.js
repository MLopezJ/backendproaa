const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type:String, required:true},
    price: {type:Number, required:true} //cahnged the object for the typical Number for more detail configuration. --> before: type: Number -- now: {type:Number, required:true}
});

module.exports = mongoose.model('Product', productSchema);
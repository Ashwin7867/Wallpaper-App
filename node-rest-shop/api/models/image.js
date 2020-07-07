const mongoose = require('mongoose');

const imageSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    id : {type :String , required : true},
    author : {type : String, required : true},
    width : {type : Number , required : true},
    height : {type : Number, required : true},
    url : {type: String, required : true},
    download_url : {type: String, required : true}
})

module.exports = mongoose.model('Image', imageSchema);
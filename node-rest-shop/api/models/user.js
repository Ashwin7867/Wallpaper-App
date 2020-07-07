const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    first_name : {type : String, required : true},
    last_name : {type : String , required : true},
    phone : {type : String , required : true},
    profileImage : {type : String },
    email : {
        type : String, 
        required : true,
        unique : true,
        match : /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password : {type : String ,required : true}
})

module.exports = mongoose.model('User', userSchema);
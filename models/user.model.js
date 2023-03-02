const mongoose = require('mongoose');

const Schema= new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    // expire:{
    //     type: Date,
    //     required:true
    // },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true

    }
    //
})
const User= mongoose.model('User', Schema)

module.exports = User;

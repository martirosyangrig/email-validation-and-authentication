const mongoose = require("mongoose");

const Schema = mongoose.Schema

const userSchema = new Schema({

    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    emailToken: {
        type: String
    },
    veryfied: {
        type: Boolean,
        required: false
    }

});

module.exports = mongoose.model('User', userSchema)
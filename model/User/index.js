
var mongoose = require('mongoose');
var Config = require("../../config");

var UserSchema = new mongoose.Schema(
    {
        id: mongoose.Schema.ObjectId,

        name: String,

        email: {
            type: String,
            default: null
        },

        password: String,

        role: {
            type: Number,
            default: Config.roles.USER
        },

        creationDate: {
            type: Date,
            default: Date.now
        },

        mobile: {
            type: Number,
            default: null
        },

        gender: {
            type: String,
            default: Config.gender.OTHER
        }
    }
);

var User = mongoose.model('User', UserSchema);

module.exports = User;

var mongoose = require('mongoose');
var Config = require("../../config");

var UserSchema = new mongoose.Schema(
    {
        id: mongoose.Schema.ObjectId,

        name: {
            type: String,
            required: true
        },

        email: {
            type: String,
            unique: true,
            required: true
        },

        password: {
            type: String,
            required: true
        },

        role: {
            type: Number,
            default: Config.roles.USER
        },

        creationDate: {
            type: Date,
            default: Date.now
        },

        gender: {
            type: String,
            default: Config.gender.OTHER
        }
    }
);

var User = mongoose.model('User', UserSchema);

module.exports = User;
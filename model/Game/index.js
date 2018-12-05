

const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema(
    {
        id: mongoose.Schema.ObjectId,

        game: String,

        score: {
            type: Number,
            default: 0
        },

        finished: {
            type: mongoose.Schema.Types.Boolean,
            default: false
        },

        creationDate: {
            type: Date,
            default: Date.now
        },

        createdBy: {
            type: mongoose.Schema.ObjectId,
            ref: 'User'
        }
    }
);

const Game = mongoose.model('Game', GameSchema);

module.exports = Game;
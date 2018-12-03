
const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema(
    {
        id: mongoose.Schema.ObjectId,

        item: {
            type: mongoose.Schema.ObjectId,
            ref: 'Course',
            required: true
        },

        creationDate: {
            type: Date,
            default: Date.now
        },

        createdBy: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: true
        },

        removed: {
            type: mongoose.Schema.Types.Boolean,
            default: false
        },
    }
);

const Cart = mongoose.model('Cart', CartSchema);

module.exports = Cart;
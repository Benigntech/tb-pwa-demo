

const express = require('express');
const router = express.Router();
const VerifyToken = require('../auth/VerifyToken');
const GetAuthUser = require('../auth/GetAuthUser');
const Permit = require('../auth/Permit');
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

const {roles} = require("../../config");

const Cart = require("../../model/Cart");

router.get('/', VerifyToken, GetAuthUser, function(request, response, next) {

    Cart
        .find({removed: false, createdBy: request.userId })
        .populate("item")
        .populate("createdBy")
        .exec( function (error, cartItems) {
            if (error) return response.status(500).send("There was a problem adding the information to the database.");
            response.render('cart/index', {
                request,
                cartItems
            });
        });
});

router.get('/viewall', VerifyToken, GetAuthUser, Permit(roles.ADMIN), function(request, response, next) {
    Cart
        .find({})
        .populate("createdBy")
        .exec( function (error, courses) {
            if (error) return response.status(500).send("There was a problem adding the information to the database.");
            response.render('cart/viewall', {
                request,
                courses
            });
        });
});

router.post('/add', VerifyToken, GetAuthUser, Permit(roles.ADMIN), function(request, res) {

    const {courseId} = request.body;

    console.log(courseId);

    if (!courseId) return res.status(400).send('Invalid input');

    Cart.findOne({ removed: false, item: courseId, createdBy: request.userId }, function (err, cartItem) {

        if (err) return res.status(500).send('Error on the server.');

        if (cartItem) return res.status(401).send({status: "error", message: 'already in cart' });

        Cart
            .create({ item: courseId, createdBy: request.userId }, function (err, cartItem) {
                if (err) return res.status(500).send("There was a problem adding the information to the database.");

                return res.status(200).send({item: cartItem, message: "Added Successfully"});
            });
    });
});

router.delete("/:id", function (request, response) {
    Cart.findByIdAndUpdate(request.params.id, {removed: true}, {new: true}, function (err, cart) {
        if (err) return response.status(500).send("There was a problem updating the cart.");
        response.status(200).send({status:"success", message: "removed successfully"});
    });
});

module.exports = router;
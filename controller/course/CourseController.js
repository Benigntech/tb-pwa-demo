
const express = require('express');
const router = express.Router();
const VerifyToken = require('../auth/VerifyToken');
const GetAuthUser = require('../auth/GetAuthUser');
const Permit = require('../auth/Permit');
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

const {roles} = require("../../config");

const Course = require("../../model/Course");
const Cart = require("../../model/Cart");

router.get('/', VerifyToken, GetAuthUser, function(request, response, next) {

    const allowEdit = request.user.role === roles.ADMIN;

    Course
        .find({deleted: false})
        .populate("User")
        .exec( function (error, coursesList) {
            if (error) return response.status(500).send("There was a problem adding the information to the database.");

            Cart
                .find({removed: false, createdBy: request.userId })
                // .populate("item")
                // .populate("createdBy")
                .exec( function (error, cartItems) {
                    // if (error) return response.status(500).send("There was a problem adding the information to the database.");
                    const courses = [];

                    // console.log({cartItems,coursesList });

                    coursesList.map( eachCourse => {

                        let isAvailable = false;

                        cartItems.map( eachItem => {
                            // console.log(eachCourse._id ,( eachItem.item,eachCourse._id + "" ) === ( eachItem.item + "" ))
                            if( ( eachItem.item,eachCourse._id + "" ) === ( eachItem.item + "" ) ) isAvailable = true;
                        });

                        if( !isAvailable) courses.push(eachCourse);
                    });

                    response.render('course/index', {
                        request,
                        allowEdit,
                        courses
                    });
                });
        });
});

router.get('/viewall', VerifyToken, GetAuthUser, Permit(roles.ADMIN), function(request, response, next) {
    Course
        .find({})
        .populate("createdBy")
        .exec( function (error, courses) {
            if (error) return response.status(500).send("There was a problem adding the information to the database.");
            response.render('course/viewall', {
                request,
                courses
            });
        });
});

router.post('/add', VerifyToken, GetAuthUser, Permit(roles.ADMIN), function(req, res) {

    const {name, description, price} = req.body;

    if (!name || !description || !price ) return res.status(400).send('Invalid input');

    Course.findOne({ name }, function (err, course) {

        if (err) return res.status(500).send('Error on the server.');

        if (course) return res.status(401).send('course already exist');

        Course.create({ name, description, price, createdBy: req.userId }, function (err, course) {

            if (err) return res.status(500).send("There was a problem registering the user`.");

            return res.redirect('./viewall');
        });
    });
});

module.exports = router;

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var User = require('../../model/User');
var VerifyToken = require('./VerifyToken');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../../config');


router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

const { secret } = config.auth;

router.get('/', VerifyToken, function(req, res, next) {

    const {userId} =  req;

    if (userId) return res.redirect('../');

    res.render('login_register', { title: 'LectureNotes Training' });
});

router.post('/login', function(req, res) {

    const {email, password} = req.body;

    User.findOne({ email })
        .exec(function (err, user) {

            if (err) return res.redirect('../error/500?error=' + encodeURI("Error on the server") );
            if (!user) return res.redirect('../error/404?error=' + encodeURI("No user found.") );

            // check if the password is valid
            var passwordIsValid = bcrypt.compareSync(password, user.password);

            if (!passwordIsValid) return res.redirect('../error/401?error=' + encodeURI("invalid password.") );

            // if user is found and password is valid
            // create a token
            var token = jwt.sign({ id: user._id }, secret, {
                expiresIn: 86400 // expires in 24 hours
            });

            res.cookie('token', token, { maxAge: 1000 * 60 * 60 * 60, httpOnly: true });

            // return the information including token as JSON
            return res.redirect('../');
        });
});

router.get('/logout', function(req, res) {
    res.cookie('token', null, { maxAge: 0, httpOnly: true });
    return res.redirect('/');
});

router.post('/register', function(req, res) {

    const { name, email, password } = req.body;
    // console.log({ name, email, password });

    if (!name || !email || !password ) return res.status(400).send('Invalid input');

    // if (password !== confirmPassword) return res.status(400).send('Password mismatch');

    User.findOne({ email }, function (err, user) {

        if (err) return res.status(500).send('Error on the server.');

        if (user) return res.status(401).send('Email id already registered');

        var hashedPassword = bcrypt.hashSync(req.body.password, 8);

        var userData = {
            name,
            email,
            password: hashedPassword,
        };

        User.create( userData, function (err, user) {

            if (err) return res.status(500).send("There was a problem registering the user`.");

            // if user is registered without errors
            // create a token
            var token = jwt.sign({id: user._id}, secret, {
                expiresIn: 86400 // expires in 24 hours
            });

            res.cookie('token', token, { maxAge: 1000 * 60 * 60 * 60, httpOnly: true });

            // return the information including token as JSON
            return res.redirect('../');
        });
    });
});

// router.get('/verify', VerifyToken, function(req, res, next) {
//
//   User.findById(req.userId, { password: 0 }, function (err, user) {
//     if (err) return res.status(500).send("There was a problem finding the user.");
//     if (!user) return res.status(404).send("No user found.");
//     res.status(200).send(user);
//   });
//
// });

module.exports = router;

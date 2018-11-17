var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('../../config'); // get our config file

function VerifyToken(req, res, next) {

    const cookies = req.cookies;

    const {token} = cookies;

    if (!token) return next();

    // if (!token) return res.status(403).send({auth: false, message: 'No token provided.'});

    // if (!token) return res.redirect('../auth');

    // verifies secret and checks exp
    jwt.verify(token, config.auth.secret, function (err, decoded) {

        if (err) return res.status(500).send({auth: false, message: 'Failed to authenticate token.'});

        // if everything is good, save to request for use in other routes
        req.userId = decoded.id;

        next();

    });

}

module.exports = VerifyToken;
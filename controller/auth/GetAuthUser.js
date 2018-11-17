
const User = require('../../model/User');

function GetAuthUser(req, res, next) {

    if (!req.userId) return res.redirect('../auth');

    User.findById(req.userId, function (err, user) {

        if (err) return res.status(500).send("There was a problem finding the household.");

        if (!user) return res.status(404).send("No user found.");

        req.user = user;

        next();
    });
}

module.exports = GetAuthUser;

var express = require('express');
var router = express.Router();
var VerifyToken = require('../auth/VerifyToken');
var GetAuthUser = require('../auth/GetAuthUser');
var Game = require("../../model/Game");

router.get('/', VerifyToken, GetAuthUser, function(request, res, next) {
    res.render('game/index', { request, title: 'LectureNotes Training' });
});

// router.get('/snake', VerifyToken, GetAuthUser, function(request, res, next) {
//     res.render('game/snake', { request, title: 'LectureNotes JS Training' });
// });

router.get('/:name/start', VerifyToken, GetAuthUser, function (request, response) {

    const name = request.params.name;

    Game.findOne({game: name, finished: false, createdBy: request.userId })
        .exec( function (error, game) {
            if (error) return response.status(500).send("There was a problem updating the user.");

            if(game){
                response.render(`game/snake`, { request, game });
            } else {
                Game.create({game: name, createdBy: request.userId}, function (error, game) {
                    if (error) return response.status(500).send("There was a problem updating the user.");
                    response.render(`game/snake`, { request, game });
                });
            }
        });
});

router.put('/:name/update', VerifyToken, function (req, res) {

    const {score, gameId} = req.body;

    Game.findByIdAndUpdate(gameId, {score}, {new: true}, function (err, game) {
        if (err) return res.status(500).send("There was a problem updating the user.");
        res.status(200).send(game);
    });
});

router.put('/:name/finish', VerifyToken, function (req, res) {

    const {score, gameId} = req.body;

    Game.findByIdAndUpdate(gameId, {score, finished: true}, {new: true}, function (err, game) {
        if (err) return res.status(500).send("There was a problem updating the user.");
        res.status(200).send(game);
    });
});

router.get('/:name/score', VerifyToken, function (req, res) {

    Game
        .find()
        .sort({"score": "descending"})
        .populate("createdBy")
        .exec(function (err, games) {
            if (err) return res.status(500).send("There was a problem updating the user.");
            res.render(`game/score`, { request: req, games });
        });
});



module.exports = router;

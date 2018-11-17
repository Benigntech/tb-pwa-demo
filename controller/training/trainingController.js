
var express = require('express');
var router = express.Router();
var VerifyToken = require('../auth/VerifyToken');
var GetAuthUser = require('../auth/GetAuthUser');

router.get('/', VerifyToken, GetAuthUser, function(request, res, next) {
    res.render('index', { request, title: 'LectureNotes Training' });
});

router.get('/js', VerifyToken, GetAuthUser, function(request, res, next) {
    res.render('js', { request, title: 'LectureNotes JS Training' });
});

router.get('/php', VerifyToken, GetAuthUser, function(request, res, next) {
    res.render('php', { request, title: 'LectureNotes JS Training' });
});

module.exports = router;

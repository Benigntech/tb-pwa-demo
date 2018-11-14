var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'LectureNotes Training' });
});

/* GET home page. */
router.get('/js', function(req, res, next) {
  res.render('js', { title: 'LectureNotes JS Training' });
});

/* GET home page. */
router.get('/php', function(req, res, next) {
  res.render('php', { title: 'LectureNotes JS Training' });
});

module.exports = router;

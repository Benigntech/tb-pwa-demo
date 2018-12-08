
var express = require('express');
var router = express.Router();

var app = express();

/* GET home page. */
router.get('/', function(req, res) {
  res.redirect('/game');
});

module.exports = router;
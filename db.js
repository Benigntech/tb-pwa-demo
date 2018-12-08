var mongoose = require('mongoose');
var config = require("./config");

mongoose.Promise = global.Promise;

mongoose.connect( config.db.server + config.db.name, {useNewUrlParser: true});
mongoose.set('useCreateIndex', true);
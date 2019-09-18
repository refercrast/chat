const mongoose = require('mongoose');

mongoose.set('debug', true);
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/chat',{ useNewUrlParser: true,  useUnifiedTopology: true });

module.exports.Channel = require('./channel');
module.exports.Message = require('./message');
var dbUrl = 'mongodb://localhost/quizzes';

var mongoose = require('mongoose');

var User = require("./user");
var Quiz = require("./quiz");

mongoose.model('User', User);
mongoose.model('Quiz', Quiz);

var connection = mongoose.connect(dbUrl);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.info('connected to database'); 
	
});

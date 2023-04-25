//programa con mongoose
//WINDOWS ONLY, to show the dates
const util = require('util');
util.inspect.styles.date = 'bold';

var mongoose = require('mongoose');
var models = require('./models/models');
var User = mongoose.model('User');
var Quiz = mongoose.model('Quiz');

process.argv.forEach(function (val, index, array) {
  console.log(index + ': ' + val);
});

if(process.argv.length!==3){
  console.log("Uso: > node index.js emailusuario@dominio.com");
  process.exit();
}


let username = process.argv[2];
console.log(username);
print_user(username);


async function print_user(name) {
  try {
    const user = await User.findOne({username:name});
    console.log("Usuario: " + user._id + ", fecha creación: " + user.created);
    const quiz = await Quiz.find({"autor.id": "" + user._id});
    //console.log("QUIZ: ", quiz);
    quiz.forEach((item, index)=>{
      console.log(item.pregunta);
    });
  } catch (err) {
    console.log(err.stack);
  }
  mongoose.disconnect();
}

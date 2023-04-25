//WINDOWS ONLY, to show the dates
const util = require('util');
util.inspect.styles.date = 'bold';

const MongoClient = require('mongodb').MongoClient;

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
  const url = 'mongodb://localhost:27017/';
  const dbName = 'quizzes';
  const client = new MongoClient(url, { useNewUrlParser: true });
  try {
    // Use connect method to connect to the Server
    await client.connect();
    const db = client.db(dbName);
    const userscol = db.collection('users');
    const user = await userscol.findOne({username:name});
    console.log("Usuario: " + user._id + ", fecha creación: " + user.created);
    const quizzescol = db.collection('quizzes');
    const quiz = await quizzescol.find({"autor.id": "" + user._id}).toArray();
    //console.log("QUIZ: ", quiz);
    quiz.forEach((item, index)=>{
      console.log(item.pregunta);
    });
  } catch (err) {
    console.log(err.stack);
  }
  client.close();
}

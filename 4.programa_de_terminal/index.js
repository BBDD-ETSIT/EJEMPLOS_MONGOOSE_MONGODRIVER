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
    const col = db.collection('users');
    const cur = await col.find({username:name});
    console.log("CUR: ", cur);
    while(await cur.hasNext()) {
     const doc = await cur.next();
     console.dir(doc);
     console.log(doc.username);
     console.log("FECHA: ", new Date(doc.created));

   }
  } catch (err) {
    console.log(err.stack);
  }
  client.close();
}

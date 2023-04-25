//este ejemplo no es un modulo, es un script que se ejecuta directamente
//por ello no tiene extensión .mjs y no se importa con import sino con require
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';

(async function() {
  const client = new MongoClient(url);
  try {
    await client.connect();
    console.log("Connected correctly to server");
    const db = client.db('test');
    // Insert a single document
    let insertResult = await db.collection('names').insertOne({nombre: "Alvaro"});
    console.log('Inserted documents =>', insertResult);
    // Insert multiple documents
    insertResult = await db.collection('names').insertMany([{nombre:"Jose"}, {nombre: "María", edad: 34}]);
    console.log('Inserted documents =>', insertResult);

  } catch (err) {
    console.log(err.stack);
  } finally {
    client.close();
  }
})();

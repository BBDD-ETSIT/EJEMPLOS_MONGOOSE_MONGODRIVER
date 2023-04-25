import { MongoClient } from 'mongodb';

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

const dbName = "test";

async function main() {
  // Conectamos a MongoDB con el método connect()
  await client.connect();
  console.log('Conectado a MongoDB');
  const db = client.db(dbName);
  const collection = db.collection('names');

  // Aquí podemos hacer las operaciones CRUD
  //ver https://www.npmjs.com/package/mongodb

  return 'done.';
}


try {
  await main();
} catch (e) {
  console.error(e);
} finally {
  await client.close();
}


console.log("Fin del programa");

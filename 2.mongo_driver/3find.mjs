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
  const insertResult = await collection.insertMany([{ nombre: "Federico", edad: 48 }, { nombre: "John", edad: 35 }, { nombre: "Jovi", edad: 39 }]);
  console.log('Inserted documents =>', insertResult);

  const findResult = await collection.findOne({ nombre: "Federico", edad: 48 });
  console.log('Found documents =>', findResult);
  
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
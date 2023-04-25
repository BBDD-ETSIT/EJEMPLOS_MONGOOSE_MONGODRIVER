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
  const insertResult = await collection.insertMany([{ nombre: "Domingo", edad: 48 }, { nombre: "Pepi", edad: 19 }]);
  console.log('Inserted documents =>', insertResult);

  const updateResult = await collection.updateOne({ nombre: "Domingo", edad: 48 }, { $set: { edad: 49 } });
  console.log('Updated documents =>', updateResult);
  
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

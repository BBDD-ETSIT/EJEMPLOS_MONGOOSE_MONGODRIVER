import mongoose from 'mongoose';

//FUNCIÓN PARA CONECTAMOS A MONGODB CON MONGOOSE
async function conectar() {
    try {
      await mongoose.connect('mongodb://127.0.0.1:27017/test');
      console.log('Conectado a MongoDB');
    } catch (error) {
      console.log('Error conectando a MongoDB, el error es: ', error);  
      console.log('Lee bien la traza de error, seguramente sea porque MongoDB no esta arrancado y escuchando en el puerto 27017.')
    }
  
    mongoose.connection.on('error', err => {
      console.log('Error en la conexión con MongoDB, el error es: ', error);
    });
    return;
  }


const gameSchema = new mongoose.Schema({
  title: String,
  publisher: String,
  tags: [String],
  date: {
      type: Date,
      default: Date.now
  },
  onSale: Boolean,
  price: Number
});

const Game = mongoose.model('Game', gameSchema);

//ver más queries en https://mongoosejs.com/docs/queries.html
async function getGames() {
  try{
    //query con un or, proyectando solo los campos que nos interesan y ordenando por precio
    const games = await Game.find({ $or: [{ publisher: 'Nintendo' }, { onSale: true }] }, { publisher: 1, title: 1, onSale: 1 }, { sort: { price: 1 } });

    return games;
  }catch(err) {
    console.log(err);
    throw err;
  }
}

//Nota con respecto a usar .exec(): There are two difference between using await with exec() or without it. As a functionality point of view, there is no difference between using await with exec() or without it. Just when you call a query without exec() or callback, it returns a thenable which is something like promise but it's not a promise.(You can find the difference here). But when you use exec() to run a query, you get exactly a promise as response.


await conectar();

let mygames = await getGames();
console.log(mygames);

await mongoose.connection.close();
console.log('Desconectado de MongoDB');

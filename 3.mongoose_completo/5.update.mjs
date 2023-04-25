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
async function updateGamePrice(name, newPrice) {
  try{
    //cuidado esta primera opción que no funciona, devuelve un array de juegos, no tendria entonces método save, sino que tendría que acceder a la posición 0 del array
    //const game = await Game.find({ title: name });
    const game = await Game.findOne({ title: name });
    
    if (!game) {
      console.log('No se ha encontrado el juego');
      return
    } else {
      console.log('Juego encontrado');
      game.price = newPrice;
      const result = await game.save();
      console.log(result);
    }    
  }catch(err) {
    console.log(err);
  }
}

async function updateGamePrice2(name, newPrice) {
  try{
    const res = await Game.updateOne({ title: name }, { price: newPrice });
    console.log(res);
  }catch(err) {
    console.log(err);
  }
}

async function updateGamePrice3(name, newPrice) {
  try{
    const res = await Game.findOneAndUpdate({ title: name }, { price: newPrice }, { new: true });
    console.log(res);
  }catch(err) {
    console.log(err);
  }
}

await conectar();

console.log('Actualizando el precio de un juego');
console.log('updateGamePrice');
await updateGamePrice('Puzzle Bobble', 19.11);
console.log('updateGamePrice2');
await updateGamePrice2('Puzzle Bobble', 29.55);
console.log('updateGamePrice3');
await updateGamePrice3('Puzzle Bobble', 39.99);

await mongoose.connection.close();
console.log('Desconectado de MongoDB');
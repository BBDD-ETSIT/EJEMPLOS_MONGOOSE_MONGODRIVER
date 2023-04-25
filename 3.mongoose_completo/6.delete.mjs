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
async function deleteGame(name) {
  try{
    const result = await Game.deleteOne({ title: name });
    console.log(result);
  }catch(err) {
    console.log(err);
  }
}


await conectar();

await deleteGame("Super Mario Bros.");

await mongoose.connection.close();
console.log('Desconectado de MongoDB');
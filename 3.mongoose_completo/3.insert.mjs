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

async function saveGame() {
  try{
    //esta es una opción, crear un objeto Game y luego llamar a save
    //otra opción seria como en el ejemplo de insertMany, pasarle un array con un solo objeto literal a Game.insertMany
    const game = new Game({
        title: "The Legend of Zelda: Breath of the Wild",
        publisher: "Nintendo",
        tags: ["adventure", "action"],
        onSale: false,
        price: 59.99,
    });

    const result = await game.save();
    console.log(result);
  }catch(err) {
    console.log(err);
  }
}

async function saveMultipleGames() {
  try{
    const games = [
      {
        title: "Puzzle Bobble",
        publisher: "Taito",
        tags: ["arcade", "puzzle"],
        onSale: true,
        price: 9.99,
      },
      {
        title: "Super Mario Bros.",
        publisher: "Nintendo",
        tags: ["arcade", "platformer"],
        onSale: false,
        price: 19.99,
      },
      {
        title: "Uncharted 4: A Thief's End",
        publisher: "Sony",
        tags: ["action", "adventure"],
        onSale: true,
        price: 29.99,
      }];
      let result= await Game.insertMany(games);
      console.log(result);
    }catch(err) {
      console.log(err);
    }
}



await conectar();
await saveGame();
await saveMultipleGames();

await mongoose.connection.close();
console.log('Desconectado de MongoDB');



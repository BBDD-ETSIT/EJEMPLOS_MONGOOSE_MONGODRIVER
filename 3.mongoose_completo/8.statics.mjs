import mongoose from 'mongoose';
let Schema = mongoose.Schema;

//ver https://mongoosejs.com/docs/api/schema.html#Schema.prototype.static()

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

gameSchema.static({
  findByTitle: function (title) {
    return this.find({ title: title });
  },
  findByPrice: function (price) {
    return this.find({ price: price });
  }
});

const Game = mongoose.model('Game', gameSchema);

await conectar();



let zelda = await Game.findByTitle('The Legend of Zelda: Breath of the Wild');
console.log(zelda);
let juegoscaros = await Game.findByPrice(await Game.findByPrice(59.99));
console.log(juegoscaros);

await mongoose.connection.close();
console.log('Desconectado de MongoDB');

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


await conectar();


await mongoose.connection.close();
console.log('Desconectado de MongoDB');

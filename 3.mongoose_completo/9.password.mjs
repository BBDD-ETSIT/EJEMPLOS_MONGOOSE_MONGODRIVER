import mongoose from 'mongoose';
import crypto from 'crypto';

let Schema = mongoose.Schema;

//ver https://mongoosejs.com/docs/tutorials/virtuals.html
//In Mongoose, a virtual is a property that is not stored in MongoDB. Virtuals are typically used for computed properties on documents.

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

var personSchema = new Schema({
  name: {
    first: String,
    last: String
  },
  hashed_password: String
});

personSchema.virtual('password').set(function(password) {
    this._password = password;
    this.hashed_password = crypto.createHmac('sha1', "mysecretkey").update(password).digest('hex');
  }).get(function() {
    return "NO_SE_PUEDE_MOSTRAR"
  });



personSchema.methods = {
  verifyPassword: function (plainText) {
    console.log("verificando password", plainText);
    console.log("this.hashed_password", this.hashed_password);
    return crypto.createHmac('sha1', "mysecretkey").update(plainText).digest('hex') === this.hashed_password;
  }
}

var Person = mongoose.model('Person', personSchema);

// create a document
var axel = new Person({ name: { first: 'Axel', last: 'Rose'}, password: '1234' });
await conectar();
await axel.save();


var axel2 = await Person.findOne({ 'name.first': 'Axel' });

console.log("Resultado del find de la BBDD: ", axel2.name.first + ' ' + axel2.name.last + ' ' + axel2.password); // Axel Rose NO_SE_PUEDE_MOSTRAR

let escorrecto = axel2.verifyPassword('1234'); // true

console.log("Resultado2: ", escorrecto); // TRUE
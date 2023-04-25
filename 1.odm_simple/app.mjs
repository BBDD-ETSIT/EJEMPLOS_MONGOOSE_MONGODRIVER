// app.js
import mongoose from 'mongoose';

//creamos el esquema (schema)
const HospitalSchema = new mongoose.Schema({
  name: String,
  address: String,
  phone: String,
  email: String,
  web: String,
  max_patients: Number,
  public: Boolean,
  specialities: [String],
  location: {
    lat: Number,
    lon: Number
  } 
});

//definimos el modelo (model)
const Hospital = mongoose.model('Hospital', HospitalSchema);


//creamos un documento (document)
var newDoc = new Hospital({
  "name" : "Hospital Gregorio Marañon",
  "address" : "Calle de Gregorio Marañon, 30, 28007 Madrid",
  "phone" : "91 123 45 67",
  "email" : "contacto@gregorioejemplo.com",
  "web" : "www.gregorioejemplo.com",
  "max_patients" : 963,
  "public": true,
  "specialities" : [ "Cardiología", "Neurología", "Traumatología" ],
  "location" : {
    "lat" : 37.123,
    "lon" : -3.703
  }  
});

//creamos varios documentos (documents)
var multiDoc = [
  {
    "name" : "Hospital HM Madrid",
    "address" : "Calle de Bruselas, 12, 28020 Alcobendas",
    "phone" : "91 345 23 12",
    "email" : "dudas@doceoctubreejemplo.com",
    "web" : "www.doceoctubreejemplo.com",
    "max_patients" : 1012,
    "public": false,
    "specialities" : [ "Dermatología", "Traumatología","Alergología", "Medicina General" ],
    "location" : {
      "lat" : 40.478,
      "lon" : -2.607
    }
  },
  {
    "name" : "Hospital Universitario La Paz",
    "address" : "Calle de La Paz, 34, 28009 Madrid",
    "phone" : "91 343 33 45 21",
    "email" : "contacto@lapaz.es",
    "web" : "www.lapaz.es",
    "max_patients" : 2312,
    "public": true,
    "specialities" : [ "Oncología", "Digestivo", "Geriatría", "Hematología" ],
    "location" : {
      "lat" : 42.567,
      "lon" : -1.309
    }
  }
];


//FUNCIÓN PARA CONECTAMOS A MONGODB CON MONGOOSE
async function conectar() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/hospitals_test');
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

//Funciones de insertar
async function insert (newDoc) {
   let result= await newDoc.save();
   console.log(result);
   return result;
}

async function insertarMulti(multiDoc) {
   let result= await Hospital.insertMany(multiDoc);
   console.log(result);
   return result;
}

//Funciones de Buscar
async function buscarTodos() {
   let result= await Hospital.find();
   console.log(result);
   return result;
}

async function buscarPorTelefono(telefono) {
   let result= await Hospital.find({phone: telefono});
   console.log(result);
   return result;
}

async function actualizar() {	    
  //De la documentación oficial: https://mongoosejs.com/docs/api/query.html#Query.prototype.findOneAndUpdate()
  //[options.new=false] «Boolean» By default, findOneAndUpdate() returns the document as it was before update was applied. 
  //If you set new: true, findOneAndUpdate() will instead give you the object after update was applied.
  let result= await Hospital.findOneAndUpdate({name: "Hospital HM Madrid"}, {name: "Hospital HM Alcobendas"}, {new: true});
  console.log("Actualizado con el valor:", result);
  return result;
}

async function eliminarUno() {
  //podría aceptar parámetros de filtro y se lo pasaríamos al deleteOne
  let result = await Hospital.deleteOne({name: "Hospital Universitario La Paz"});
  console.log(result);
  return result;
}

async function eliminarVarios() {
  //podría aceptar parámetros de filtro y se lo pasaríamos al deleteMany
  let result = await Hospital.deleteMany({ public: true });
  // returns 0 if no docs matched the filter, number of docs deleted otherwise
  console.log(result);
  return result;
}

async function eliminarTodos() {
  let result = await Hospital.deleteMany({});
  console.log(result);
  return result;
}

await conectar();
//let resultado = await insert(newDoc);
//let resultado = await insertarMulti(multiDoc);
//let resultado = await buscarTodos();
//let resultado = await buscarPorTelefono("91 123 45 67");
//let resultado = await actualizar();
//let resultado = await eliminarUno();
//let resultado = await eliminarVarios();
let resultado = await eliminarTodos();

//console.log("Resultado que devuelve la función llamada (es el mismo que imprimimos en la propia función): ", resultado);
await mongoose.connection.close();
console.log('Desconectado de MongoDB');
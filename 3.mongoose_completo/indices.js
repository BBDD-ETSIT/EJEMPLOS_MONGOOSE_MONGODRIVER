//este fichero no está pensado para ser ejecutado, es un ejemplo de cómo crear índices

//los índices se pueden poner al definir el esquema o después de definirlo
var personSchema = new Schema({
  name: String,
  age: Number,
  pin: { type: Number, index: true } // field level
});

personSchema.index({ name: 1, age: -1 }); // schema level

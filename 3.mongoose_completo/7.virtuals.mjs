import mongoose from 'mongoose';
let Schema = mongoose.Schema;

//ver https://mongoosejs.com/docs/tutorials/virtuals.html
//In Mongoose, a virtual is a property that is not stored in MongoDB. Virtuals are typically used for computed properties on documents.

var personSchema = new Schema({
  name: {
    first: String,
    last: String
  }
});

personSchema.virtual('fullName').get(function () {
  return this.name.first + ' ' + this.name.last;
});

// create our model
var Person = mongoose.model('Person', personSchema);

// create a document
var axel = new Person({
  name: { first: 'Axel', last: 'Rose' }
});

console.log("Resultado1: ", axel.name.first + ' ' + axel.name.last); // Axel Rose

console.log("Resultado2: ", axel.fullName); // Axel Rose

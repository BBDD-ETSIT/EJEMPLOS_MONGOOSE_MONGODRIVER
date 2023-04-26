var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Quiz = new Schema ({
  pregunta: {
    required: true,
    type: String,
    trim: true
  },
  respuesta: {
  	required: true,
    type: String,
    trim: true
  },
  comments: [{
    texto: {
      type: String,
      trim: true,
      max:2000
    },
    publicado: {
      type: Boolean,
    	default: false
    },
    autor: {
      id: String,
      username: String
    }
  }],
  autor: {
    id: String,
    username: String
  },
  created: {
    type: Date,
    default: Date.now,
    required: true
  },
  updated:  {
    type: Date,
    default: Date.now,
    required: true
  }
});

module.exports = Quiz;
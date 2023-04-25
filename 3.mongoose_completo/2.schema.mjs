import mongoose from 'mongoose';
let Schema = mongoose.Schema;

let blogSchema = new Schema({
  title:  String,
  author: String,
  body:   String,
  comments: [{ body: String, date: Date }],
  date: { type: Date, default: Date.now },
  hidden: Boolean,
  meta: {
    votes: Number,
    favs:  Number
  }
});

//ver https://mongoosejs.com/docs/guide.html para más información sobre los tipos de datos

let Blog = mongoose.model('Blog', blogSchema);
